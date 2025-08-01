import { Error } from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs/promises";

const singleUpload = async (req, res, next) => {
  const image = req.file;
  const payload = req.body;
  if (!image) {
    const err = new Error("please provide file");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await cloudinary.uploader.upload(image.path);
    const final = result.secure_url;
    await fs.unlink(image.path);
    console.log(result);

    return res.status(201).json({ upload: final, others: payload });
  } catch (error) {
    return next(error);
  }
};
const arrayUpload = async (req, res, next) => {
  const images = req.files;
  const payload = req.body;

  if (!images || images.length === 0) {
    const err = new Error("please provide at least one file");
    err.status = 400;
    next(err);
  }

  try {
    const uploadfile = [];

    for (const each of images) {
      const result = await cloudinary.uploader.upload(each.path, {});
      uploadfile.push(result.secure_url);
      await fs.unlink(each.path);
    }

    res.status(201).json({ uploads: uploadfile, others: payload });
  } catch (error) {
    return next(error);
  }
};
const multipleUpload = async (req, res, next) => {
  const { docs = [], video = [] } = req.files;
  const payload = req.body;
  if (docs.length === 0 || video.length === 0) {
    const err = new Error("please provide docs and video");
    err.status = 400;
    return next(err);
  }
  try {
    const uploads = { docs: [], video: [] };

    for (const single of docs) {
      const result = await cloudinary.uploader.upload(single.path, {});
      uploads.docs.push(result.secure_url);
      await fs.unlink(single.path);
    }
    for (const single of video) {
      const result = await cloudinary.uploader.upload(single.path, {
        resource_type: "video",
      });
      uploads.video.push(result.secure_url);
      await fs.unlink(single.path);
    }

    res.status(201).json({ uploaded: uploads, others: payload });
  } catch (error) {
    return next(error);
  }
};

export { singleUpload, arrayUpload, multipleUpload };
