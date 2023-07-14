import cleanup from "./cleanup";
import checkOnProspectives from "./checkOnProspectives";
import gravedig from "./gravedig";
import spawnGravediggers from "./spawnGravediggers";
import mintMirrors from "./mintMirrors";

export const allTasks = [
  cleanup,
  checkOnProspectives,
  gravedig,
  spawnGravediggers,
  mintMirrors,
];

export default {
  cleanup,
  checkOnProspectives,
  gravedig,
  spawnGravediggers,
  mintMirrors,
};
