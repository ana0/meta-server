import httpStatus from "http-status";
import web3 from "web3";
import { svg64 } from 'svg64';
import * as base64json from 'base64json';

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import { generateDeathSVG } from "../services/procGen";
import { ethereumWeb3, charonController } from "../services/web3";
import Lifeform from "../models/lifeform";
import { getMessageHash } from "../services/contracts/charon";
import { incrementInRedis } from "../services/redis";
import { deathformsNonceName } from "../services/nonce";
import {
  LifeformHasManyMemoryformLifeform
 } from "../database/associations";

const generateAuth = async (metadata, address, nonce) => {
  const msg = await getMessageHash(metadata, address, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, charonController.privateKey).signature;
};

const getJSON = async (svg, archetypes, tokenId, birth, msg) => {
  let traits = []
  const deltatime = Date.now() - Number(birth);
  const days = Math.floor(deltatime / 86400000);
  const hours = Math.floor((deltatime - days * 86400000) / 3600000);
  const parsedBirth = new Date(Number(birth));
  const now = Date.now()
  //const seconds = Math.floor(deltatime - ageDays * 86400 - ageHours * 3600);
  archetypes.forEach(item => {
    traits.push(`{"trait_type":"Archetype","value":"${item}"}`)
  })
  let punctuation;
  msg = msg.trim();
  if (msg === '') {
    punctuation = '';
  } else {
    punctuation = msg.endsWith('.') || msg.endsWith('?') || msg.endsWith('!') ? '' : '.';
    traits.push(`{"trait_type":"Message","value":"${msg}${punctuation}"}`)
  }
  const json = `{"status":"ok","name":" Deathform #${tokenId}",` +
  `"description":"This is the resting place of Lifeform #${tokenId}, which was born on` +
  ` ${parsedBirth.toDateString()} and crossed the bridge ` +
  ` on ${new Date(now).toDateString()} at the age of ${days} days, and ${hours} hours. ` +
  `Rest in Peace, Lifeform #${tokenId}.",` +
  `"image":"${svg64(svg)}",` 
  +`"attributes":[${traits.join()}]}`
  return json;
}

const packageSVG = async (tokenId) => {
  const seed = await web3.utils.soliditySha3(tokenId)
  const svg = generateDeathSVG(seed, tokenId);
  return svg;
}

const generateMetadata = async (msg, lifeform, svg) => {
  const json = await getJSON(svg, lifeform.archetypes, lifeform.tokenId, lifeform.birth, msg);
  return `data:application/json;base64,${base64json.stringify(JSON.parse(json), null, 0)}`;
};

const get = async (req, res) => {
  try {
    const lifeform = await Lifeform.findOne({
      where: { tokenId: req.params.id },
      include: [{
        association: LifeformHasManyMemoryformLifeform,
        include: 'memoryform'
      }],
    });
    if (lifeform) {
      let svg = await packageSVG(parseInt(req.params.id));
      if (req.query.svg) {
        res.writeHead(200, {
          'Content-Type': 'image/svg+xml',
          'Content-Length': svg.length
        });
        return res.end(svg);
      }
      const {
        name,
        description,
        tokenId,
        image,
        birth,
        death,
        ageAtDeath,
        totalCaretakers,
        totalTransfers,
        minTransfers,
        archetypes,
        memoryformlifeforms
      } = lifeform;
      return respondWithSuccess(
        res,
        {
          name,
          description,
          tokenId,
          image,
          birth,
          death,
          ageAtDeath,
          totalCaretakers,
          totalTransfers,
          minTransfers,
          archetypes,
          memoryformlifeforms,
          svg
        },
        httpStatus.OK,
        false
      );
    }
    return respondWithError(res, { message: "No such lifeform" }, httpStatus.NOT_FOUND);
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: "Unidentified err" }, httpStatus.INTERNAL_SERVER_ERROR);
  };
}

const create = async (req, res) => {
  try {
    const lifeform = await Lifeform.findOne({
      where: { tokenId: req.body.tokenId },
    });
    if (!lifeform) {
      return respondWithError(res, { message: "Unauthorized" }, httpStatus.UNAUTHORIZED);
    }
    const svg = await packageSVG(lifeform.tokenId);
    const metadata = await generateMetadata(req.body.msg, lifeform, svg);
    const nonce = await incrementInRedis(deathformsNonceName);
    console.log(nonce);
    const auth = await generateAuth(
      metadata,
      req.body.address,
      nonce
    );
    lifeform.message = req.body.msg;
    await lifeform.save();
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
  create
};
