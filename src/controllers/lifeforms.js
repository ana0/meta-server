import httpStatus from "http-status";

import { respondWithSuccess, respondWithError } from "../helpers/respond";
import metadata1 from "../static/1.json";
import metadata2 from "../static/2.json";
import metadata3 from "../static/3.json";

const get = async (req, res) => {
  if (req.params.id === "1") {
    return respondWithSuccess(
      res,
      {
        ...metadata1,
      },
      httpStatus.OK,
      false
    );
  }
  if (req.params.id === "2") {
    return respondWithSuccess(
      res,
      {
        ...metadata2,
      },
      httpStatus.OK,
      false
    );
  }
  if (req.params.id === "3") {
    return respondWithSuccess(
      res,
      {
        ...metadata3,
      },
      httpStatus.OK,
      false
    );
  }
  return respondWithError(res, httpStatus.NOT_FOUND);
};

export default {
  get,
};
