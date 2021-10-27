import { Joi, Segments } from "celebrate";

const defaultValidation = {
  tokenId: Joi.number().integer().positive().required(),
};

export default {
  mint: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
