import express from "express";

import lifeformsController from "../controllers/lifeforms";

const router = express.Router();

router.get("/:id", lifeformsController.get);

export default router;
