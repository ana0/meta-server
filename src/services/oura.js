import OuraToken from "../models/ouraToken";

const BASE_URL = "https://api.ouraring.com/v2/usercollection";
const AUTHORIZE_URL = "https://cloud.ouraring.com/oauth/authorize";
const TOKEN_URL = "https://api.ouraring.com/oauth/token";
const SCOPE = "daily";
const EXPIRY_BUFFER_MS = 60 * 1000;

class OuraError extends Error {}
// Thrown when there is no stored authorization yet — the user must run the
// one-time Connect flow. Distinct from OuraError so the UI can prompt to connect
// rather than show a generic upstream failure.
class OuraNotConnectedError extends OuraError {}

function getConfig() {
  const clientId = process.env.TRACKING_OURA_CLIENT_ID;
  const clientSecret = process.env.TRACKING_OURA_CLIENT_SECRET;
  const redirectUri = process.env.TRACKING_OURA_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new OuraError(
      "Oura OAuth is not configured (set TRACKING_OURA_CLIENT_ID, TRACKING_OURA_CLIENT_SECRET, TRACKING_OURA_REDIRECT_URI)"
    );
  }
  return { clientId, clientSecret, redirectUri };
}

// Build the URL we send the browser to so the owner can authorize the app.
export function buildAuthorizeUrl(state) {
  const { clientId, redirectUri } = getConfig();
  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", SCOPE);
  url.searchParams.set("state", state);
  return url.toString();
}

async function postToken(params) {
  const { clientId, clientSecret } = getConfig();
  const body = new URLSearchParams({
    ...params,
    client_id: clientId,
    client_secret: clientSecret,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new OuraError(
      `Oura token endpoint ${res.status}: ${text.slice(0, 200)}`
    );
  }
  return res.json();
}

// Persist a token response. Oura may rotate the refresh token, so we keep
// whatever it returns and fall back to the existing one if it omits it.
async function persistToken(tokenResponse, existing) {
  const expiresAt = new Date(
    Date.now() + (tokenResponse.expires_in ?? 86400) * 1000
  );
  const fields = {
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token ?? existing?.refreshToken,
    expiresAt,
    scope: tokenResponse.scope ?? existing?.scope ?? SCOPE,
  };
  if (existing) {
    existing.set(fields);
    await existing.save();
    return existing;
  }
  return OuraToken.create(fields);
}

// One-time: trade the authorization code for tokens and store them.
export async function exchangeCodeForToken(code) {
  const { redirectUri } = getConfig();
  const tokenResponse = await postToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  const existing = await OuraToken.findOne({ order: [["id", "ASC"]] });
  await persistToken(tokenResponse, existing);
}

export async function isConnected() {
  const row = await OuraToken.findOne();
  return !!row;
}

async function refresh(row) {
  if (!row.refreshToken)
    throw new OuraNotConnectedError("Oura is not connected");
  let tokenResponse;
  try {
    tokenResponse = await postToken({
      grant_type: "refresh_token",
      refresh_token: row.refreshToken,
    });
  } catch (err) {
    throw new OuraError(
      `Oura authorization expired or was revoked — reconnect (${err.message})`
    );
  }
  return persistToken(tokenResponse, row);
}

async function getValidAccessToken({ force = false } = {}) {
  const row = await OuraToken.findOne({ order: [["id", "ASC"]] });
  if (!row) throw new OuraNotConnectedError("Oura is not connected");
  const stillValid =
    row.expiresAt &&
    new Date(row.expiresAt).getTime() - Date.now() > EXPIRY_BUFFER_MS;
  if (!force && stillValid) return row.accessToken;
  const refreshed = await refresh(row);
  return refreshed.accessToken;
}

async function ouraFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }

  let token = await getValidAccessToken();
  let res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  // Access-token lifetime varies; if it was rejected, force a refresh and retry once.
  if (res.status === 401) {
    token = await getValidAccessToken({ force: true });
    res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new OuraError(`Oura ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function fetchDailyReadiness(startDate, endDate) {
  const data = await ouraFetch("/daily_readiness", {
    start_date: startDate,
    end_date: endDate,
  });
  return data.data ?? [];
}

export { OuraError, OuraNotConnectedError };
