import httpStatus from "http-status";

import web3, { controller } from "../services/web3";
import { timestamp } from "../services/math";
import { incrementInRedis } from "../services/redis";
import { nonceName } from "../services/nonce";
import { getMessageHash } from "../services/contracts/off";
import { respondWithSuccess, respondWithError } from "../helpers/respond";
import submitJob from "../tasks/submitJob";
import checkOnProspectives from "../tasks/checkOnProspectives";

import Prospective from "../models/prospective";
import Buyer from "../models/buyer";

const countProspectives = async (email) => {
  const prospectives = await Prospective.count({
    where: {
      email,
    },
  });
  const buyers = await Buyer.count({
    where: {
      email,
    },
  });
  return buyers + prospectives;
};

const saveProspective = async ({ email, address, tokenId, hash }) => {
  return Prospective.create({ email, address, tokenId, hash });
};

const generateAuth = async (user, tokenId, issuingTime, nonce) => {
  const msg = await getMessageHash(user, tokenId, issuingTime, nonce);
  return web3.eth.accounts.sign(msg, controller.privateKey).signature;
};

const create = async (req, res) => {
  console.log("trying to create ...");

  try {
    const count = await countProspectives(req.body.email);
    if (count >= 5) {
      return respondWithError(
        res,
        { message: "Purchase limit exceeded" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    } else {
      await saveProspective(req.body);
      const issuingTime = timestamp();
      const nonce = await incrementInRedis(nonceName);
      const auth = await generateAuth(
        req.body.address,
        req.body.tokenId,
        issuingTime,
        nonce
      );
      submitJob(
        checkOnProspectives,
        `${req.body.tokenId}+${req.body.address}`,
        {
          tokenId: req.body.tokenId,
          address: req.body.address,
        }
      );
      return respondWithSuccess(res, {
        auth,
        issuingTime,
        nonce,
      });
    }
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

export default {
  create,
};
