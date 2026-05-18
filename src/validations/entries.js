import { Joi, Segments } from "celebrate";

const LH_VALUES = ["negative", "low", "high", "peak"];

const score = Joi.number().integer().min(1).max(10).allow(null);

const upsertBody = {
  date: Joi.date().iso().required(),
  energy: score,
  mood: score,
  cognition: score,
  libido: score,
  sleep: score,
  note: Joi.string().allow("", null),
  cycleDay: Joi.number().integer().min(1).max(60).allow(null),
  isPeriodStart: Joi.boolean(),
  lhResult: Joi.string()
    .valid(...LH_VALUES)
    .allow(null),
  loggedAt: Joi.date().iso().allow(null),
};

const listQuery = {
  from: Joi.date().iso(),
  to: Joi.date().iso(),
};

const syncOuraQuery = {
  from: Joi.date().iso(),
  to: Joi.date().iso(),
};

export default {
  upsert: {
    [Segments.BODY]: upsertBody,
  },
  list: {
    [Segments.QUERY]: listQuery,
  },
  syncOura: {
    [Segments.QUERY]: syncOuraQuery,
  },
};
