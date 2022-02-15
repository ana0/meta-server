import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import Lifeform from "../models/lifeform";
import submitJob from "./submitJob";
import gravedig from "./gravedig";

const spawn = new Queue("Spawn gravediggers nightly", redisUrl, {
  settings: redisLongRunningOptions,
});

processor(spawn).process(async () => {
  const lifeforms = await Lifeform.findAll();
  lifeforms.map((form) => {
    submitJob(gravedig, `${form.tokenId}-${form.name}`, {
      tokenId: form.tokenId,
    });
  });
});

export default spawn;
