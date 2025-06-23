import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from './router/auth/auth.js'
import userRouter from './router/auth/user.js'
import commentRouter from './router/news/comment.js'
import newsRouter from './router/news/news.js'
import hourRouter from './router/office/hour.js'
import gradeRouter from './router/teacher/grade.js'
import homeworkRouter from './router/teacher/homework.js'

import { connectDb } from "./middleware/db.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(cookieParser())

const PORT = process.env.PORT || 5500;

connectDb()

app.use("/auth/", authRouter)
app.use("/user/", userRouter)
app.use("/comment/", commentRouter)
app.use("/news/", newsRouter)
app.use("/hour/", hourRouter)
app.use("/grade/", gradeRouter)
app.use("/homework/", homeworkRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 