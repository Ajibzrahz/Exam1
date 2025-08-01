import express from "express";
import { arrayFile, multipleFile, singleFile } from "../middleware/multer.js";
import {
  arrayUpload,
  multipleUpload,
  singleUpload,
} from "../controllers/file_upload.js";

const fileRoute = express.Router();

fileRoute.post("/file", singleFile, singleUpload);
fileRoute.post("/array", arrayFile, arrayUpload);
fileRoute.post("/multiple", multipleFile, multipleUpload);

export default fileRoute;
