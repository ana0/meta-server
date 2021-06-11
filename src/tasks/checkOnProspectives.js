import Queue from "bull";

import processor from "./processor";
import { redisUrl, redisLongRunningOptions } from "../services/redis";
import { getOwner } from "../services/contracts/off";
import Prospective from "../models/prospective";
import Buyer from "../models/buyer";
import Expired from "../models/expired";
import { dateToTimestamp, timestamp } from "../services/math";

const checkOnProspectives = new Queue("Check on prospectives", redisUrl, {
  settings: redisLongRunningOptions,
});

processor(checkOnProspectives).process(async ({ data }) => {
  const prospect = await Prospective.findOne({
    where: { address: data.address, tokenId: data.tokenId },
  });
  const owner = await getOwner(data.tokenId);
  if (owner === data.address) {
    await Buyer.create({
      tokenId: prospect.tokenId,
      address: prospect.address,
      email: prospect.email,
    });
    await Expired.create({
      tokenId: prospect.tokenId,
      address: prospect.address,
      email: prospect.email,
    });
    await Prospective.destroy({ where: { id: prospect.id } });
    return true;
  } else if (
    timestamp() - dateToTimestamp(prospect.createdAt.getTime()) >=
    1300
  ) {
    console.log("Expired");
    await Expired.create({
      tokenId: prospect.tokenId,
      address: prospect.address,
      email: prospect.email,
    });
    await Prospective.destroy({ where: { id: prospect.id } });
  } else {
    console.log("Has not resolved");
    throw new Error();
  }
});

export default checkOnProspectives;
