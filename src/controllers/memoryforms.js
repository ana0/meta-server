import httpStatus from "http-status";
import web3 from "web3";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Memoryform from "../models/memoryform";
import {
  MemoryformHasManyMemoryformLifeform,
  MemoryformLifeformBelongsToLifeform,
 } from "../database/associations";
 //import { getSeed } from "../services/contracts/lifeforms";
 import { generateSVG } from "../services/procGen";

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
    try {
      const seed = await web3.utils.soliditySha3(address, createdCount, killedCount, distributions)
      const svg = generateSVG(seed);
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
          memoryformlifeforms,
          svg
        },
        httpStatus.OK,
        false
      );
    } catch (error) {
      console.log(error);
      return respondWithError(res, { message: "Unspecifed Err" }, httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  console.log(memoryform)
  return respondWithError(res, { message: "No carer data" }, httpStatus.NOT_FOUND);
};




export default {
  get,
};
