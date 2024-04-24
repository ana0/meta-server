import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Memoryform from "../models/memoryform";

const get = async (req, res) => {
  const memoryform = await Memoryform.findOne({
    where: { address: req.params.address },
  });
  if (memoryform) {
    return respondWithSuccess(
      res,
      memoryform,
      httpStatus.OK,
      false
    );
  }
  return respondWithError(res, httpStatus.NOT_FOUND);
};

export default {
  get,
};
