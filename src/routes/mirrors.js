import express from "express";

import mirrorsController from "../controllers/mirrors";

const router = express.Router();

router.get("/:id", mirrorsController.get);

export default router;
