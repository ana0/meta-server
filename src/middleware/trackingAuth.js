import httpStatus from "http-status";

import { respondWithError } from "../helpers/respond";

const trackingAuth = (req, res, next) => {
  const expected = process.env.TRACKING_PASSWORD;
  const provided = req.header("x-auth-token");
  if (!expected || provided !== expected) {
    return respondWithError(
      res,
      { message: "Unauthorized" },
      httpStatus.UNAUTHORIZED
    );
  }
  return next();
};

export default trackingAuth;
