import crypto from "crypto";
import httpStatus from "http-status";

import Entry from "../models/entry";
import {
  buildAuthorizeUrl,
  exchangeCodeForToken,
  fetchDailyReadiness,
  isConnected,
  OuraError,
  OuraNotConnectedError,
} from "../services/oura";
import { setInRedis, getFromRedis, expireFromRedis } from "../services/redis";
import { respondWithSuccess, respondWithError } from "../helpers/respond";

const OURA_STATE_PREFIX = "oura_oauth_state_";
const OURA_STATE_TTL = 600; // seconds

const FIELDS = [
  "date",
  "energy",
  "mood",
  "cognition",
  "libido",
  "sleep",
  "note",
  "cycleDay",
  "isPeriodStart",
  "lhResult",
  "temperatureDeviation",
  "loggedAt",
];

const pickFields = (body) =>
  FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

const dayDiff = (later, earlier) => {
  const a = new Date(`${later}T00:00:00Z`).getTime();
  const b = new Date(`${earlier}T00:00:00Z`).getTime();
  return Math.round((a - b) / 86400000);
};

const annotateCycleDay = (entries) => {
  const periodStarts = entries
    .filter((e) => e.isPeriodStart)
    .map((e) => e.date)
    .sort();
  return entries.map((e) => {
    const json = e.toJSON();
    let computed = null;
    for (let i = periodStarts.length - 1; i >= 0; i -= 1) {
      if (periodStarts[i] <= json.date) {
        computed = dayDiff(json.date, periodStarts[i]) + 1;
        break;
      }
    }
    json.computedCycleDay = computed;
    return json;
  });
};

const upsert = async (req, res) => {
  try {
    const payload = pickFields(req.body);
    const [entry, created] = await Entry.upsert(payload, { returning: true });
    const all = await Entry.findAll({ order: [["date", "ASC"]] });
    const annotated = annotateCycleDay(all);
    const fresh = annotated.find((e) => e.id === entry.id);
    return respondWithSuccess(
      res,
      fresh,
      created ? httpStatus.CREATED : httpStatus.OK
    );
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const list = async (req, res) => {
  try {
    const all = await Entry.findAll({ order: [["date", "ASC"]] });
    const annotated = annotateCycleDay(all);
    const from = req.query.from;
    const to = req.query.to;
    const filtered = annotated.filter((e) => {
      if (from && e.date < from) return false;
      if (to && e.date > to) return false;
      return true;
    });
    filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
    return respondWithSuccess(res, filtered);
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const exportCsv = async (req, res) => {
  try {
    const all = await Entry.findAll({ order: [["date", "ASC"]] });
    const annotated = annotateCycleDay(all);
    const header = [
      "date",
      "cycleDay",
      "computedCycleDay",
      "isPeriodStart",
      "energy",
      "mood",
      "cognition",
      "libido",
      "sleep",
      "lhResult",
      "temperatureDeviation",
      "loggedAt",
      "note",
    ];
    const lines = [header.join(",")];
    for (const e of annotated) {
      lines.push(header.map((k) => csvEscape(e[k])).join(","));
    }
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="entries.csv"');
    return res.status(httpStatus.OK).send(`${lines.join("\n")}\n`);
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const isoDate = (d) => d.toISOString().slice(0, 10);

const syncOura = async (req, res) => {
  try {
    const to = req.query.to ? new Date(req.query.to) : new Date();
    const from = req.query.from
      ? new Date(req.query.from)
      : new Date(to.getTime() - 30 * 86400000);

    const readings = await fetchDailyReadiness(isoDate(from), isoDate(to));

    let updated = 0;
    let skipped = 0;
    for (const r of readings) {
      const date = r.day;
      const temp = r.temperature_deviation;
      if (date == null || temp == null) {
        skipped += 1;
        continue;
      }
      const existing = await Entry.findOne({ where: { date } });
      if (existing) {
        existing.temperatureDeviation = temp;
        await existing.save();
      } else {
        await Entry.create({ date, temperatureDeviation: temp });
      }
      updated += 1;
    }
    return respondWithSuccess(res, {
      updated,
      skipped,
      from: isoDate(from),
      to: isoDate(to),
    });
  } catch (err) {
    console.log(err);
    if (err instanceof OuraNotConnectedError) {
      return respondWithError(
        res,
        { message: "Oura is not connected — click Connect Oura first." },
        httpStatus.BAD_REQUEST
      );
    }
    if (err instanceof OuraError) {
      return respondWithError(
        res,
        { message: err.message },
        httpStatus.BAD_GATEWAY
      );
    }
    return respondWithError(res, { message: err.message });
  }
};

const ouraStatus = async (req, res) => {
  try {
    return respondWithSuccess(res, { connected: await isConnected() });
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

// Returns the Oura authorize URL for the browser to navigate to. A random state
// nonce is stashed in Redis and verified on the callback to prevent CSRF.
const ouraAuthorizeUrl = async (req, res) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");
    await setInRedis(`${OURA_STATE_PREFIX}${state}`, "1", "EX", OURA_STATE_TTL);
    return respondWithSuccess(res, { url: buildAuthorizeUrl(state) });
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const frontendRedirect = (status) => {
  const origin = (process.env.TRACKING_ORIGIN || "").replace(/\/+$/, "");
  return origin ? `${origin}/?oura=${status}` : null;
};

// Public endpoint Oura redirects the browser to after authorization. It carries
// no app password, so it is guarded by the state nonce instead of trackingAuth.
const ouraCallback = async (req, res) => {
  try {
    const { code, state, error } = req.query;
    if (error) throw new Error(String(error));
    if (!code || !state) throw new Error("Missing code or state");
    const key = `${OURA_STATE_PREFIX}${state}`;
    const found = await getFromRedis(key);
    if (!found) throw new Error("Invalid or expired state");
    await expireFromRedis(key);
    await exchangeCodeForToken(String(code));
    const target = frontendRedirect("connected");
    if (target) return res.redirect(target);
    return res
      .status(httpStatus.OK)
      .send(
        "<h1>Oura connected</h1><p>You can close this tab and return to the app.</p>"
      );
  } catch (err) {
    console.log(err);
    const target = frontendRedirect("error");
    if (target) return res.redirect(target);
    return res
      .status(httpStatus.BAD_GATEWAY)
      .send(`<h1>Oura connection failed</h1><p>${err.message}</p>`);
  }
};

export default {
  upsert,
  list,
  exportCsv,
  syncOura,
  ouraStatus,
  ouraAuthorizeUrl,
  ouraCallback,
};
