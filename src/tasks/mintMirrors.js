import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import dispatch from "../services/dispatch";
import { mirrorControllerPrivKey } from "../config";
import { mirrorsContract } from "../services/contracts";
import MirrorCodes from "../models/mirrorcode";

const mintMirrors = new Queue("Mint mirrors", redisUrl, {
  settings: redisLongRunningOptions,
});

processor(mintMirrors).process(async ({ data }) => {
  const contract = mirrorsContract;
  const mir = await MirrorCodes.findOne({
    where: { mintcode: data.mintcode },
  });
  if (mir.minted !== true) {
    console.log(`Minting mirror to ${data.address}`);
    await dispatch(contract, "mint", [data.address], mirrorControllerPrivKey);
    console.log("Minted");
    await MirrorCodes.update(
      { where: { mintcode: data.mintcode } },
      { minted: true }
    );
  }
});

export default mintMirrors;
