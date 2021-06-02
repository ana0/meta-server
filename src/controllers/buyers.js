import httpStatus from "http-status";

import db from "../database";
import web3, { controller } from "../services/web3";
import { timestamp } from "../services/math";
import { incrementInRedis } from "../services/redis";
import { nonceName } from "../services/nonce";
import { getMessageHash } from "../services/contracts/off";
import { respondWithSuccess, respondWithError } from "../helpers/respond";

const saveBuyer = ({ email, address, tokenId }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO buyers(email, address, tokenId) VALUES (?, ?, ?)",
      [email, address, tokenId],
      function (err) {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
};

const generateAuth = async (user, tokenId, issuingTime, nonce) => {
  const msg = await getMessageHash(user, tokenId, issuingTime, nonce);
  return web3.eth.accounts.sign(msg, controller.privateKey).signature;
};

const create = (req, res) => {
  console.log("trying to create ...");
  db.get(
    `SELECT COUNT(*) FROM buyers WHERE email == (?)`,
    [req.body.email],
    async function (err, count) {
      if (err) {
        console.log(err);
        return respondWithError(res, { message: err.message });
      }
      if (count >= 5) {
        return respondWithError(
          res,
          { message: "Already purchased" },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      } else {
        await saveBuyer(req.body);
        const issuingTime = timestamp();
        const nonce = await incrementInRedis(nonceName);
        try {
          const auth = await generateAuth(
            req.body.address,
            req.body.tokenId,
            issuingTime,
            nonce
          );
          return respondWithSuccess(res, {
            auth,
            issuingTime,
            nonce,
          });
        } catch (err) {
          console.log(err);
          return respondWithError(res, { message: err.message });
        }
      }
    }
  );
};

export default {
  create,
};
