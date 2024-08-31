import express from "express";

import gooddeathController from "../controllers/gooddeath";
import gooddeathValidation from "../validations/gooddeath";
import validate from "../services/validate";

const router = express.Router();

router.get("/:id", validate(gooddeathValidation.get), gooddeathController.get);

router.put("/", validate(gooddeathValidation.mint), gooddeathController.create);

export default router;
