import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import { getOwner } from "../services/contracts/lifeforms";
import Lifeform from "../models/lifeform";

const checkOnProspectives = new Queue("Check on prospectives", redisUrl, {
  settings: redisLongRunningOptions,
});

processor(checkOnProspectives).process(async ({ data }) => {
  const form = await Lifeform.findById(data.tokenId);
  const owner = await getOwner(data.tokenId);

});

export default checkOnProspectives;
