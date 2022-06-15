import express from "express";

import wildcardsController from "../controllers/wildcards";
import wildcardsValidation from "../validations/wildcards";
import validate from "../services/validate";

const router = express.Router();

router.put(
  "/mintcodes",
  validate(wildcardsValidation.create),
  wildcardsController.create
);

router.get("/:id", wildcardsController.get);

export default router;
