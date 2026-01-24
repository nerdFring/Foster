import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { login } from './controllers/auth/login.js';
import { register } from './controllers/auth/register.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import { createResume } from './controllers/resume/create.js';
import { updateResume } from './controllers/resume/update.js';
import { getResumes } from './controllers/resume/getAll.js';
import { getResumeById } from './controllers/resume/getById.js';
import { getOneUserResume } from './controllers/resume/getOneUserResume.js';
import { getUsers } from './controllers/auth/getUsers.js';
import cookieParser from "cookie-parser";
import { logOut, me } from './utils/me.js';
import { protect } from './middlewares/auth.js';
import { verifyEmail } from './controllers/auth/verifyEmail.js';
import { resendEmail } from './controllers/auth/resendEmail.js';



dotenv.config()
connectDB()

const app=express()
app.use(cookieParser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use(cors({
    origin: "http://localhost:5173", 
  credentials: true,
}))

app.post("/login",login)
app.post("/register", register)
app.post("/create",protect,createResume)
app.get("/getAll",getResumes)
app.get("/get/:id",protect, getResumeById)
app.get("/get/user/:userId",getOneUserResume)
app.get("/getUsers",getUsers)
app.post("/update",updateResume)

app.get("/me",protect,me)
app.post("/logout",logOut)
app.get("/verify-email/:verifyToken",verifyEmail)
app.post("/resendW-email",resendEmail)

app.listen(process.env.port,()=>{
    console.log(`server started http://localhost:${process.env.port}`)
})

