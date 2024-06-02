import express from "express";

import memoryformsController from "../controllers/memoryforms";

const router = express.Router();

router.get("/", memoryformsController.get);

//router.get("/svg", memoryformsController.getSVG);

export default router;
