import express from "express";

import logger from "../middleware/logger";
import uploadFilesMiddleware from "../middleware/uploadFiles";
import uploadsController from "../controllers/uploads";
import { getPath } from "../helpers/path";
import { respondWithSuccess } from "../helpers/respond";

export const FIELD_NAME = "file";

export const UPLOAD_FOLDER_NAME = "uploads";
export const UPLOAD_FOLDER_PATH = getPath(UPLOAD_FOLDER_NAME);

export const RECORDINGS_SUBFOLDER = "recordings";

const router = express.Router();

router.get("/", (req, res) => {
  respondWithSuccess(res);
});

router.post(
  "/recordings",
  logger,
  uploadFilesMiddleware([
    {
      name: FIELD_NAME,
      allowedFileTypes: ["mp3", "mpga", "wav", "webm", "weba"],
      maxFileSize: 10 * 1000 * 1000,
    },
  ]),
  uploadsController.uploadDocuments
);

export default router;
