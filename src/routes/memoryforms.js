import express from "express";

import memoryformsController from "../controllers/memoryforms";

const router = express.Router();

router.get("/", memoryformsController.get);

router.put("/", memoryformsController.create);

export default router;
