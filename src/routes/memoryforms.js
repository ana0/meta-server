import express from "express";

import memoryformsController from "../controllers/memoryforms";
import memoryformsValidation from "../validations/memoryforms";
import validate from "../services/validate";

const router = express.Router();

router.get("/", validate(memoryformsValidation.get), memoryformsController.get);

router.put("/", validate(memoryformsValidation.mint), memoryformsController.create);

export default router;
