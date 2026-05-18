const BASE_URL = "https://api.ouraring.com/v2/usercollection";

class OuraError extends Error {}

async function ouraFetch(path, params = {}) {
  const token = process.env.TRACKING_OURA_TOKEN;
  if (!token) throw new OuraError("TRACKING_OURA_TOKEN is not set");

  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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

export { OuraError };
