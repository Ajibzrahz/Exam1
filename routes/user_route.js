import express from "express"
import { createUser, getUsers, updateUsers, deleteUsers, Userlogin } from "../controllers/user_controller.js"

const UserRouter = express.Router()

UserRouter.get("/user", getUsers)
UserRouter.post("/user", createUser)
UserRouter.put("/user/:id", updateUsers)
UserRouter.delete("/user", deleteUsers)
UserRouter.post("/user-login", Userlogin)

export default UserRouter