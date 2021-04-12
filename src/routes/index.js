import express from "express";
import httpStatus from "http-status";

import buyersRouter from "./buyers";
import { respondWithSuccess } from "../helpers/respond";
import APIError from "../helpers/errors";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.use("/buyers", buyersRouter);

router.use(() => {
  throw new APIError(httpStatus.NOT_FOUND);
});

export default router;
