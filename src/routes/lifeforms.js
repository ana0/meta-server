import express from "express";

import lifeformsController from "../controllers/lifeforms";
import lifeformsValidation from "../validations/lifeforms";
import validate from "../services/validate";

const router = express.Router();

router.get("/count", lifeformsController.count);

router.post(
  "/mint",
  validate(lifeformsValidation.mint),
  lifeformsController.mint
);

router.get("/:id", lifeformsController.get);

export default router;
