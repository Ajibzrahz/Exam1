import e from "express";
import { createPost, getPost } from "../controllers/post_controller.js";
import authenticateUser from "../middleware/auth_middleware.js";

const postRouter = e.Router();

postRouter.post("/post", authenticateUser, createPost)
postRouter.get("/post", getPost)


export default postRouter
