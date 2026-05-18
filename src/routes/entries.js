import express from "express";

import entriesController from "../controllers/entries";
import entriesValidation from "../validations/entries";
import validate from "../services/validate";
import trackingAuth from "../middleware/trackingAuth";

const router = express.Router();

router.use(trackingAuth);

router.get("/export.csv", entriesController.exportCsv);

router.post(
  "/sync/oura",
  validate(entriesValidation.syncOura),
  entriesController.syncOura
);

router.get("/", validate(entriesValidation.list), entriesController.list);

router.put("/", validate(entriesValidation.upsert), entriesController.upsert);

export default router;
