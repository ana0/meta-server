import { Joi, Segments } from "celebrate";
import web3Validators from "./web3";

export default {
  mint: {
    [Segments.BODY]: {
      address: web3Validators.web3().address().required(),
      msg: Joi.string().required(),
      approve: Joi.boolean().required(),
    },
  },
  get: {
    [Segments.QUERY]: {
      address: web3Validators.web3().address().required(),
      svg: Joi.boolean(),
    },
  },
};
