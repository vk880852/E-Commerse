import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ credentials: true }));
app.use(express.json())
app.use(express.urlencoded({
}))
app.use(express.static("public"));
app.use(cookieParser());

// Routes
// Define your routes here
import userRouter from './routes/user.routes.js'
app.use("/api/v1/",userRouter);


export {app};
