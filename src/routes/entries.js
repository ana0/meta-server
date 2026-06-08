import express from "express";

import entriesController from "../controllers/entries";
import entriesValidation from "../validations/entries";
import validate from "../services/validate";
import trackingAuth from "../middleware/trackingAuth";

const router = express.Router();

// Public: Oura redirects the browser here after authorization. The browser
// carries no app password, so this route is guarded by a state nonce inside the
// controller rather than by trackingAuth. Must be registered before the
// trackingAuth middleware below.
router.get("/oura/callback", entriesController.ouraCallback);

router.use(trackingAuth);

router.get("/export.csv", entriesController.exportCsv);

router.get("/oura/status", entriesController.ouraStatus);

router.get("/oura/authorize-url", entriesController.ouraAuthorizeUrl);

router.post(
  "/sync/oura",
  validate(entriesValidation.syncOura),
  entriesController.syncOura
);

router.get("/", validate(entriesValidation.list), entriesController.list);

router.put("/", validate(entriesValidation.upsert), entriesController.upsert);

export default router;
