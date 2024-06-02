import httpStatus from "http-status";
import web3 from "web3";
import svg64, { encode } from 'svg64';
import base64json from 'base64json';

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
 import { memoryformsNonceName } from "../services/nonce";

const generateAuth = async (metadata, address, nonce) => {
  const msg = await getMessageHash(metadata, address, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, memoryformsController.privateKey).signature;
};

const getJSON = async (address, svg) => {
  return `{"status":"ok","name":"Memoryform: ${address}","description":"A memoryform created for ${address}.","image":"data:image/svg+xml;base64,${svg64(svg)}","attributes":[{"trait_type": "Transaction", "value": "0x27e154dd96491d1a5b449b0a8770195df261965b650fa84900d55cd95f7753f4"}]}`
}

const packageSVG = async (m, msg) => {
  const interactions = m.memoryformlifeforms.length - 1;
  const pluspatterns = m.carePatterns.filter((word) => {
    return word !== 'Creator' && word !== 'Killer' && word !== 'Forgetful'
  });
  console.log(pluspatterns)
  console.log(interactions+pluspatterns.length)
  const seed = await web3.utils.soliditySha3(m.address, m.createdCount, m.killedCount, m.distributions)
  const svg = generateSVG(seed, interactions+pluspatterns.length, msg);
  return svg;
}

const generateMetadata = async (address, msg, memoryform, svg) => {
  const json = await getJSON(address, svg);
  let encoded = `data:application/json;base64,${base64json.stringify(json, null, 2)}`;
  return {
    encoded,
  };
};

const getMemoryform = async (address) => {
  const memoryform = await Memoryform.findOne({
    where: { address },
    include: [{
      association: MemoryformHasManyMemoryformLifeform,
      include: [MemoryformLifeformBelongsToLifeform],
    }],
  });
  return memoryform;
}

const get = async (req, res) => {
  const memoryform = await getMemoryform(req.query.address);
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
    const svg = await packageSVG(memoryform);
    try {
      if (req.query.svg) {
        res.writeHead(200, {
          'Content-Type': 'image/svg+xml',
          'Content-Length': svg.length
        });
        return res.end(svg);
      }
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
  try {
    const memoryform = await getMemoryform(req.body.address);
    if (!memoryform) {
      return respondWithError(res, { message: "Unauthorized" }, httpStatus.UNAUTHORIZED);
    }
    const svg = await packageSVG(memoryform);
    const metadata = await generateMetadata(req.body.address, req.body.msg, memoryform, svg);
    const nonce = await incrementInRedis(memoryformsNonceName);
    const auth = await generateAuth(
      metadata,
      req.body.address,
      nonce
    );
    return respondWithSuccess(res, {
      auth,
      metadata,
      nonce,
    });
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
}




export default {
  get,
};
