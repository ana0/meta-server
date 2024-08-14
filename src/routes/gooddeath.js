import express from "express";

import gooddeathController from "../controllers/gooddeath";

const router = express.Router();

router.get("/:id", gooddeathController.get);

router.put("/", gooddeathController.create);

export default router;
