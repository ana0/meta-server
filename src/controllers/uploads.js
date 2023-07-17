import httpStatus from "http-status";
import mime from "mime";

import Recording from "../models/recording";
import { RECORDINGS_SUBFOLDER, FIELD_NAME } from "../routes/uploads";
import { copyToUploadsDir, toFileUrl } from "../helpers/uploads";
import { respondWithSuccess } from "../helpers/respond";

async function uploadDocuments(req, res, next) {
  try {
    const files = req.files[FIELD_NAME];

    console.log(req.body);

    // Move all files to /uploads folder to make them public
    for (let file of files) {
      await copyToUploadsDir(file.path, file.filename, RECORDINGS_SUBFOLDER);
    }

    // Convert image data to database model format
    const fileEntries = files.map((file) => {
      return {
        fileName: file.filename,
        fileType: mime.getExtension(file.mimetype),
        url: toFileUrl(file.path, RECORDINGS_SUBFOLDER),
        mirrorcodeId: parseInt(req.body.mintcodeId),
      };
    });

    const response = await Recording.bulkCreate(fileEntries);

    respondWithSuccess(
      res,
      response.map((res) => {
        return { ...res.dataValues };
      }),
      httpStatus.CREATED
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default {
  uploadDocuments,
};
