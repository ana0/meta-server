import { Joi, Segments } from "celebrate";
import web3Validators from "./web3";

const defaultValidation = {
  email: Joi.string().email().required(),
  address: web3Validators.web3().address().required(),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
};
