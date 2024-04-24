import express from "express";

import memoryformsController from "../controllers/memoryforms";

const router = express.Router();

router.get("/:address", memoryformsController.get);

export default router;
