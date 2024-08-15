import httpStatus from "http-status";
import { ethers } from "ethers";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import Mirror from "../models/mirror";
import MirrorCode from "../models/mirrorcode";
import submitJob from "../tasks/submitJob";
import mintMirrors from "../tasks/mintMirrors";
import { checkMintcode } from "../services/contracts/mirrors";

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
      const valid = await checkMintcode(
        ethers.solidityPackedKeccak256(["string"], [mintcode.mintcode])
      );
      if (!valid) {
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
      mintcode.email = req.body.email;
      await mintcode.save();
      return respondWithSuccess(res, {
        account: mintcode.address,
        mintcodeId: mintcode.id,
      });
    }
  } catch (err) {
    console.log(err);
    return respondWithError(res, { message: err.message });
  }
};

const get = async (req, res) => {
  const mirror = await Mirror.findOne({
    where: { id: 2 },
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
  return respondWithError(res, { message: "Not found" }, httpStatus.NOT_FOUND);
};

export default {
  get,
  create,
};
