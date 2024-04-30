import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Memoryform from "../models/memoryform";

const get = async (req, res) => {
  console.log(req.params)
  const memoryform = await Memoryform.findOne({
    where: { address: req.params.address },
  });
  if (memoryform) {
    const {
      id,
      address,
      createdCount,
      killedCount,
      killedNotCreatedCount,
      distributions,
      uniqueDistributions,
      carePatterns
    } = memoryform;
    return respondWithSuccess(
      res,
      {
        id,
        address,
        createdCount,
        killedCount,
        killedNotCreatedCount,
        distributions,
        uniqueDistributions,
        carePatterns
      },
      httpStatus.OK,
      false
    );
  }
  console.log(memoryform)
  return respondWithError(res, { message: "No carer data" }, httpStatus.NOT_FOUND);
};

export default {
  get,
};
