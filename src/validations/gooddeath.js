import { Joi, Segments } from "celebrate";
import web3Validators from "./web3";

export default {
  mint: {
    [Segments.BODY]: {
      tokenId: Joi.number().integer().positive().required(),
      address: web3Validators.web3().address().required(),
      msg: Joi.string().allow(""),
    },
  },
  get: {
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
    [Segments.QUERY]: {
      svg: Joi.boolean(),
    },
  },
};
