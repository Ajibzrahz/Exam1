import express from "express"
import { createUser, getUser, Userlogin } from "../controllers/user_controller.js"

const UserRouter = express.Router()

UserRouter.post("/user", createUser)
UserRouter.post("/user-login", Userlogin)
UserRouter.get("/user", getUser)

export default UserRouter