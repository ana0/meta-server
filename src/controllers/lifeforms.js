import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import { getSeed } from "../services/contracts/lifeforms";
import { generateName, chooseImage } from "../services/procGen";
import Lifeform from "../models/lifeform";
import metadata1 from "../static/1.json";
import metadata2 from "../static/2.json";
import metadata3 from "../static/3.json";

const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';

const get = async (req, res) => {
  if (req.params.id === "1") {
    return respondWithSuccess(
      res,
      {
        ...metadata1,
      },
      httpStatus.OK,
      false
    );
  }
  if (req.params.id === "2") {
    return respondWithSuccess(
      res,
      {
        ...metadata2,
      },
      httpStatus.OK,
      false
    );
  }
  if (req.params.id === "3") {
    return respondWithSuccess(
      res,
      {
        ...metadata3,
      },
      httpStatus.OK,
      false
    );
  }
  try {
    const lifeform = await Lifeform.findOne({
      where: { tokenId: req.params.id },
    }); 
    if (lifeform) {
      const { name, description, tokenId, image } = lifeform;
      return respondWithSuccess(
        res,
        {
          name,
          description,
          tokenId,
          image,
        },
        httpStatus.OK,
        false
      );
    }
    return respondWithError(res, httpStatus.NOT_FOUND);
  } catch (err) {
    console.log(req.params.id);
    console.log(err);
    return respondWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const count = async (req, res) => {
  const num = await Lifeform.max("tokenId");
  return respondWithSuccess(
    res,
    {
      count: num,
    },
    httpStatus.OK,
    false
  );
};

const mint = async (req, res) => {
  const tokenId = req.body.tokenId;
  const seed = await getSeed(tokenId);
  if (seed === ZERO_HASH) {
    return respondWithError(res, httpStatus.NOT_FOUND);
  }
  const exists = await Lifeform.findOne({
    where: { tokenId },
  });
  if (exists) {
    return respondWithError(res, httpStatus.CONFLICT);
  }
  const lifeform = {
    tokenId,
    name: `Lifeform #${tokenId}`,
    description: generateName(seed),
    image: chooseImage(seed),
  };
  await Lifeform.create(lifeform);
  return respondWithSuccess(
    res,
    {
      seed,
      ...lifeform,
    },
    httpStatus.OK,
    false
  );
};

export default {
  get,
  count,
  mint,
};
