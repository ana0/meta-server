import { Joi } from "celebrate";

import web3 from "../services/web3";

export default Joi.extend((joi) => {
  return {
    type: "web3",
    base: joi.string(),
    messages: {
      "web3.address": "is invalid Ethereum address",
      "web3.addressChecksum": "is invalid Ethereum address checksum",
      "web3.sha3": "is invalid SHA3 hash",
      "web3.signature": "is invalid Ethereum signature",
    },
    rules: {
      address: {
        validate(value, helpers) {
          if (!value || !web3.utils.isAddress(value)) {
            return helpers.error("web3.address");
          }

          return value;
        },
      },
      addressChecksum: {
        validate(value, helpers) {
          if (!value || !web3.utils.checkAddressChecksum(value)) {
            return helpers.error("web3.addressChecksum");
          }

          return value;
        },
      },
      sha3: {
        validate(value, helpers) {
          if (!value || !web3.utils.isHexStrict(value) || value.length !== 66) {
            return helpers.error("web3.sha3");
          }

          return value;
        },
      },
      signature: {
        validate(value, helpers) {
          if (
            !value ||
            !web3.utils.isHexStrict(value) ||
            value.length !== 132
          ) {
            return helpers.error("web3.signature");
          }

          return value;
        },
      },
    },
  };
});
