import httpStatus from "http-status";
import web3 from "web3";
import { svg64 } from 'svg64';
import * as base64json from 'base64json';

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Memoryform from "../models/memoryform";
import {
  MemoryformHasManyMemoryformLifeform,
  MemoryformLifeformBelongsToLifeform,
 } from "../database/associations";
 import { generateMemoriesSVG } from "../services/procGen";
 import { ethereumWeb3, memoryformsController } from "../services/web3";
 import { getMessageHash } from "../services/contracts/memoryforms";
 import { incrementInRedis } from "../services/redis";
 import { memoryformsNonceName } from "../services/nonce";

const generateAuth = async (metadata, address, nonce) => {
  const msg = await getMessageHash(metadata, address, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, memoryformsController.privateKey).signature;
};

const getJSON = async (address, svg, careP, mlifeforms) => {
  let traits = []
  careP.forEach(item => {
    if (item == 'Creator' || item == 'Killer') {
      traits.push(`{"value":"${item}"}`)
    } else {
      traits.push(`{"trait_type":"Care Pattern","value":"${item}"}`)
    }
  })
  for (let i = 0; i < mlifeforms.length; i++) {
    traits.push(`{"trait_type":"Cared For","value":"Lifeform #${mlifeforms[i].lifeform.tokenId}","type":"number"}`)
    
    mlifeforms[i].lifeform.archetypes.forEach(item => {
      if (!traits.includes(`{"trait_type":"Lifeform Archetype","value":"${item}"}`))
      traits.push(`{"trait_type":"Lifeform Archetype","value":"${item}"}`)
    })
  }
  return `{"status":"ok","name":"Memoryform:${address}","description":"A memoryform created for ${address}.","image":"${svg64(svg)}",`
  +`"attributes":[${traits.join()}]}`
}

const packageSVG = async (m, msg) => {
  let interactions = m.distributions;
  if (m.createdCount > m.killedCount) {
    interactions += 1;
  }
  const pluspatterns = m.carePatterns.filter((word) => {
    return word !== 'Killer' && word !== 'Forgetful'
  });
  const minuspatterns = m.carePatterns.filter((word) => {
    return word === 'Killer' || word === 'Forgetful'
  });
  const seed = await web3.utils.soliditySha3(m.address, m.createdCount, m.killedCount, m.distributions)
  const svg = generateMemoriesSVG(seed, interactions-minuspatterns.length+pluspatterns.length, msg);
  return svg;
}

const generateMetadata = async (address, memoryform, svg) => {
  const json = await getJSON(address, svg, memoryform.carePatterns, memoryform.memoryformlifeforms);
  return `data:application/json;base64,${base64json.stringify(JSON.parse(json), null, 0)}`;
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
      memoryformlifeforms,
      message
    } = memoryform;
    let svg = await packageSVG(memoryform, message);
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
  return respondWithError(res, { message: "No carer data" }, httpStatus.NOT_FOUND);
};

const create = async (req, res) => {
  try {
    const memoryform = await getMemoryform(req.body.address);
    if (!memoryform) {
      return respondWithError(res, { message: "Unauthorized" }, httpStatus.UNAUTHORIZED);
    }
    const svg = await packageSVG(memoryform, req.body.msg);
    const metadata = await generateMetadata(req.body.address, memoryform, svg);
    const nonce = await incrementInRedis(memoryformsNonceName);
    console.log(nonce)
    const auth = await generateAuth(
      metadata,
      req.body.address,
      nonce
    );
    memoryform.message = req.body.msg;
    memoryform.approveForExhibition = req.body.approve;
    await memoryform.save();
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
  create,
  get,
};
