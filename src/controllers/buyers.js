import httpStatus from "http-status";

import db from "../database";
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

const create = (req, res) => {
  db.get(
    `SELECT id, address FROM buyers WHERE email == (?)`,
    [req.body.email],
    async function (err, buyer) {
      if (err) return respondWithError(res, { message: err.message });
      if (buyer)
        return respondWithError(
          res,
          { message: err.message },
          httpStatus.UNPROCESSABLE_ENTITY
        );
      if (!buyer) {
        await saveBuyer(req.body);
        return respondWithSuccess(res);
      }
    }
  );
};

export default {
  create,
};
