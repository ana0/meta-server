import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Mirror from "../models/mirror";
import MirrorCode from "../models/mirrorcode";
import submitJob from "../tasks/submitJob";
import mintMirrors from "../tasks/mintMirrors";

const create = async (req, res) => {
  console.log("trying to create ...");

  try {
    const mintcode = await MirrorCode.findOne({
      where: { mintcode: req.body.mintcode },
    });
    if (!mintcode) {
      return respondWithError(
        res,
        { message: "Invalid mint phrase" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    } else {
      if (mintcode.minted) {
        return respondWithError(
          res,
          { message: "Already minted" },
          httpStatus.CONFLICT
        );
      }
      submitJob(mintMirrors, `${mintcode.mintcode}`, {
        mintcode: mintcode.mintcode,
        address: mintcode.address,
      });
      return respondWithSuccess(res, { minted: true });
    }
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const get = async (req, res) => {
  const mirror = await Mirror.findOne({
    where: { id: 1 },
  });
  if (mirror) {
    const { description, image } = mirror;
    return respondWithSuccess(
      res,
      {
        name: `Mirror #${req.params.id}`,
        description,
        tokenId: req.params.id,
        image,
      },
      httpStatus.OK,
      false
    );
  }
  return respondWithError(res, httpStatus.NOT_FOUND);
};

// const mint = async (req, res) => {
//   const tokenId = req.body.tokenId;
//   const seed = await getSeed(tokenId);
//   if (seed === ZERO_HASH) {
//     return respondWithError(res, httpStatus.NOT_FOUND);
//   }
//   const exists = await Lifeform.findOne({
//     where: { tokenId },
//   });
//   if (exists) {
//     return respondWithError(res, httpStatus.CONFLICT);
//   }
//   const lifeform = {
//     tokenId,
//     name: `Lifeform #${tokenId}`,
//     description: generateName(seed),
//     image: chooseImage(seed),
//   };
//   await Lifeform.create(lifeform);
//   return respondWithSuccess(
//     res,
//     {
//       seed,
//       ...lifeform,
//     },
//     httpStatus.OK,
//     false
//   );
// };

export default {
  get,
  create,
};
