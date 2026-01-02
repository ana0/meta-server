import express from "express";

import lickworksController from "../controllers/lickworks";

const router = express.Router();

router.get("/:id", lickworksController.get);

export default router;
