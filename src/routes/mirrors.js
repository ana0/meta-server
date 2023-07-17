import express from "express";

import mirrorsController from "../controllers/mirrors";
import mirrorsValidation from "../validations/mirrors";
import validate from "../services/validate";

const router = express.Router();

router.put(
  "/mintcodes",
  validate(mirrorsValidation.create),
  mirrorsController.create
);

router.get("/:id", mirrorsController.get);

export default router;
