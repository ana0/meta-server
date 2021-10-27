import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import { getSeed } from "../services/contracts/lifeforms";
import { generateName, chooseImage } from "../services/procGen";
import Lifeform from "../models/lifeform";
import metadata1 from "../static/1.json";
import metadata2 from "../static/2.json";
import metadata3 from "../static/3.json";

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
};

const count = async (req, res) => {
  const num = await Lifeform.count();
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
