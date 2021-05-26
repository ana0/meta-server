import httpStatus from "http-status";

import db from "../database";
import web3 from "./services/web3";
import { controller } from "../config";
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

const generateAuth = (messageHash) => {
  return web3.eth.accounts.sign(messageHash, controller.privateKey).signature;
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

        return respondWithSuccess(res);
      }
    }
  );
};

export default {
  create,
};
