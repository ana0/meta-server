import { Joi, Segments } from "celebrate";

const defaultValidation = {
  mintcode: Joi.string().required(),
  email: Joi.string(),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
