import cleanup from "./cleanup";
import checkOnProspectives from "./checkOnProspectives";
import gravedig from "./gravedig";
import spawnGravediggers from "./spawnGravediggers";

export const allTasks = [
  cleanup,
  checkOnProspectives,
  gravedig,
  spawnGravediggers,
];

export default {
  cleanup,
  checkOnProspectives,
  gravedig,
  spawnGravediggers,
};
