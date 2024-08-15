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

const generateAuth = async (metadata, address, nonce) => {
  const msg = await getMessageHash(metadata, address, nonce);
  return ethereumWeb3.eth.accounts.sign(msg, charonController.privateKey).signature;
};

const getJSON = async (svg, archetypes, tokenId, birth, msg) => {
  let traits = []
  const deltatime = (Date.now()/1000) - birth;
  const days = Math.floor(deltatime / 86400);
  const hours = Math.floor((deltatime - days * 86400) / 3600);
  //const seconds = Math.floor(deltatime - ageDays * 86400 - ageHours * 3600);
  archetypes.forEach(item => {
    traits.push(`{"trait_type":"Archetype","value":"${item}"}`)
  })
  console.log(traits)
  return `{"status":"ok","name":" Deathform #${tokenId}","description":"This is the resting place of Lifeform #${tokenId}, which was born on ${Date.parse(birth)} and crossed the bridge on ${Date.now()} at the age of ${days} days, and ${hours} hours.","image":"${svg64(svg)}",`
  +`"attributes":[${traits.join()}]}`
}

const packageSVG = async (tokenId) => {
  const seed = await web3.utils.soliditySha3(tokenId)
  const svg = generateDeathSVG(seed, tokenId);
  return svg;
}

const generateMetadata = async (address, msg, lifeform, svg) => {
  const json = await getJSON(svg, lifeform.archetypes, lifeform.tokenId, lifeform.birth, msg);
  console.log(json)
  return `data:application/json;base64,${base64json.stringify(json, null, 2)}`;
};

const get = async (req, res) => {
  try {
    const lifeform = await Lifeform.findOne({
      where: { tokenId: req.params.id },
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
        archetypes
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
          svg
        },
        httpStatus.OK,
        false
      );
    }
    return respondWithError(res, { message: "No such lifeform" }, httpStatus.NOT_FOUND);
  } catch (err) {
    console.log(req.params.id);
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
    const svg = await packageSVG(lifeform);
    const metadata = await generateMetadata(req.body.address, req.body.msg, lifeform, svg);
    //console.log(metadata)
    const nonce = await incrementInRedis(deathformsNonceName);
    console.log(req.body.address)
    const auth = await generateAuth(
      metadata,
      req.body.address,
      nonce
    );
    //console.log(svg)
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
