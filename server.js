import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRouter from "./routes/user_route.js"
import kycRouter from "./routes/kyc_router.js"
import postRouter from "./routes/post_route.js"
dotenv.config()

const app = express()
const port = 3000

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully")
        app.listen(port, () => {
            console.log("App is listening in port:", port)
        })
    })
    .catch((err) => {
        console.log("Error:" + err)
    })

app.use(express.json());
app.use(cookieParser())
app.use(UserRouter)
app.use(kycRouter)
app.use(postRouter)