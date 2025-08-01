import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user_route.js";
import kycRouter from "./routes/kyc_router.js";
import postRouter from "./routes/post_route.js";
import fileRoute from "./routes/file_upload_route.js";
import { isError } from "util";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log("App is listening in port:", port);
    });
  })
  .catch((err) => {
    console.log("Error:" + err);
  });

app.use(express.json());
app.use(
  express.text([
    "application/javascript",
    "application/xml",
    "text/plain",
    "text/html",
  ])
);
app.use(urlencoded());

app.use(cookieParser());
app.use(UserRouter);
app.use(kycRouter);
app.use(postRouter);
app.use(fileRoute)

app.use((err, req, res, next) => {
  console.log(err)
  return res
    .status(err.status || 501)
    .json({ message: err.message || "something happened" });
});
