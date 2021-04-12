import { Joi } from "celebrate";

export const idValidation = {
  id: Joi.number().integer().positive().required(),
};
