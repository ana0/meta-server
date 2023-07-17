import { Joi, Segments } from "celebrate";

const defaultValidation = {
  mintcode: Joi.string().required(),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
