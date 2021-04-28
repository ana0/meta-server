import { Joi, Segments } from "celebrate";

const defaultValidation = {
  email: Joi.string().email().required(),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
