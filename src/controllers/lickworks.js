import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";

import metadata1 from "../static/lickme-1.json";
import metadata2 from "../static/lickme-2.json";
import metadata3 from "../static/lickme-3.json";
import metadata4 from "../static/lickme-4.json";
import metadata5 from "../static/lickme-5.json";
import metadata6 from "../static/lickme-6.json";
import metadata7 from "../static/lickme-7.json";
import metadata8 from "../static/lickme-8.json";
import metadata9 from "../static/lickme-9.json";
import metadata10 from "../static/lickme-10.json";

const metadataMap = {
  "1": metadata1,
  "2": metadata2,
  "3": metadata3,
  "4": metadata4,
  "5": metadata5,
  "6": metadata6,
  "7": metadata7,
  "8": metadata8,
  "9": metadata9,
  "10": metadata10,
};

const get = async (req, res) => {
  const id = req.params.id;
  const metadata = metadataMap[id];

  if (!metadata) {
    return respondWithError(
      res,
      { message: "No such lickwork" },
      httpStatus.NOT_FOUND
    );
  }

  return respondWithSuccess(
    res,
    { ...metadata },
    httpStatus.OK,
    false
  );
};

export default {
  get,
};
