import express from "express";

import buyersController from "../controllers/buyers";
import buyersValidation from "../validations/buyers";
import validate from "../services/validate";

const router = express.Router();

router.get("/count", buyersController.count);

router.put("/", validate(buyersValidation.create), buyersController.create);

export default router;
