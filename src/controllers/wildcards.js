import httpStatus from "http-status";

import { ethereumWeb3, wildcardsController } from "../services/web3";
import { incrementInRedis } from "../services/redis";
import { wildcardsNonceName } from "../services/nonce";
import { getMessageHash } from "../services/contracts/wildcards";
import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Wildcard from "../models/wildcard";
import Mintcode from "../models/mintcode";

const generateAuth = async (user, tokenId, nonce) => {
  const msg = await getMessageHash(user, tokenId, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, wildcardsController.privateKey)
    .signature;
};

const create = async (req, res) => {
  console.log("trying to create ...");

  try {
    const mintcode = await Mintcode.findOne({
      where: { mintcode: req.body.mintcode },
    });
    if (!mintcode) {
      return respondWithError(
        res,
        { message: "Invalid mint phrase" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    } else {
      const nonce = await incrementInRedis(wildcardsNonceName);
      const auth = await generateAuth(
        req.body.signature,
        mintcode.tokenId,
        nonce
      );
      return respondWithSuccess(res, {
        auth,
        tokenId: mintcode.tokenId,
        nonce,
      });
    }
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const get = async (req, res) => {
  const wildcard = await Wildcard.findOne({
    where: { tokenId: req.params.id },
  });
  if (wildcard) {
    const { name, description, tokenId, image } = wildcard;
    return respondWithSuccess(
      res,
      {
        name,
        description,
        tokenId,
        image,
      },
      httpStatus.OK,
      false
    );
  }
  return respondWithError(res, httpStatus.NOT_FOUND);
};

export default {
  create,
  get,
};
