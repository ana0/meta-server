import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import dispatch from "../services/dispatch";
import { mirrorsControllerPrivateKey } from "../config";
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
    await dispatch(
      contract,
      "mint",
      [data.address, data.mintcode],
      mirrorsControllerPrivateKey
    );
    console.log("Minted");
  }
});

export default mintMirrors;
