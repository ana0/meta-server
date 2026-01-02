import express from "express";
import httpStatus from "http-status";

import buyersRouter from "./buyers";
import lifeformsRouter from "./lifeforms";
import wildcardsRouter from "./wildcards";
import mirrorsRouter from "./mirrors";
import uploadsRouter from "./uploads";
import memoryformsRouter from "./memoryforms";
import gooddeathRouter from "./gooddeath";
import lickworksRouter from "./lickworks";
import { respondWithSuccess } from "../helpers/respond";
import APIError from "../helpers/errors";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.use("/buyers", buyersRouter);

router.use("/wildcards", wildcardsRouter);

router.use("/lifeforms", lifeformsRouter);

router.use("/mirrors", mirrorsRouter);

router.use("/uploads", uploadsRouter);

router.use("/memoryforms", memoryformsRouter);

router.use("/gooddeath", gooddeathRouter);

router.use("/lickworks", lickworksRouter);

router.use(() => {
  throw new APIError(httpStatus.NOT_FOUND);
});

export default router;
