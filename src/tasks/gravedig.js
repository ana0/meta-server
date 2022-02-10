import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import { getLifeform } from "../services/contracts/lifeforms";
import dispatch from "../services/dispatch";
import Lifeform from "../models/lifeform";
import { gravediggerPrivKey } from "../config";
import { getLifeformsContract } from "../services/contracts";

const digGraves = new Queue("Dig graves", redisUrl, {
  settings: redisLongRunningOptions,
});

processor(digGraves).process(async ({ data }) => {
  const contract = getLifeformsContract();
  const contractForm = await getLifeform(data.tokenId);
  if (contractForm.tokenURI === "" || contractForm.tokenBirth === 0) {
    await dispatch(
      contract,
      "gravediggerCleanup",
      [data.tokenId],
      gravediggerPrivKey
    );
    await Lifeform.destroy({
      where: {
        tokenId: data.tokenId,
      },
    });
  }
});

export default digGraves;
