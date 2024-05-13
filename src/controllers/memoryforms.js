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
 import { ethereumWeb3, memoryformsController } from "../services/web3";
 import { getMessageHash } from "../services/contracts/memoryforms";
 import { incrementInRedis } from "../services/redis";


 const generateAuth = async (metadata, nonce) => {
  const msg = await getMessageHash(metadata, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, memoryformsController.privateKey).signature;
};

const get = async (req, res) => {
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
      const interactions = memoryformlifeforms.length - 1;
      const pluspatterns = carePatterns.filter((word) => word !== 'Creator' && word !== 'Killer' && word !== 'Forgetful');
      console.log(pluspatterns)
      console.log(address)
      console.log(interactions+pluspatterns.length)
      const seed = await web3.utils.soliditySha3(address, createdCount, killedCount, distributions)
      const svg = generateSVG(seed, interactions+pluspatterns.length);
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

const create = async (req, res) => {
  const nonce = await incrementInRedis(nonceName);
  const auth = await generateAuth(
    req.body.address,
    req.body.tokenId,
    issuingTime,
    nonce
  );
}




export default {
  get,
};
