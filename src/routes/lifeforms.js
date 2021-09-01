import express from "express";

import lifeformsController from "../controllers/lifeforms";

const router = express.Router();

router.get("/:id", lifeformsController.get);

router.get("/images/:name", lifeformsController.get);

export default router;
