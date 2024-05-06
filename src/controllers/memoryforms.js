import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Memoryform from "../models/memoryform";
import {
  MemoryformHasManyMemoryformLifeform,
  MemoryformLifeformBelongsToLifeform,
 } from "../database/associations";

const get = async (req, res) => {
  console.log(req.params)
  const memoryform = await Memoryform.findOne({
    where: { address: req.params.address },

    include: [{
      association: MemoryformHasManyMemoryformLifeform,
      include: [MemoryformLifeformBelongsToLifeform],
    }
    ],
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
      carePatterns,
      memoryformlifeforms
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
        carePatterns,
        memoryformlifeforms
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
