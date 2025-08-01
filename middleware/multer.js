import multer from "multer";

const upload = multer({ dest: "uploads/" });

const singleFile = upload.single("image");
const arrayFile = upload.array("images", 20);
const multipleFile = upload.fields([
  { name: "docs", maxCount: 20 },
  { name: "video", maxCount: 1 },
]);

export { singleFile, arrayFile, multipleFile };
