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
import { me } from './utils/me.js';
import { protect } from './middlewares/auth';



dotenv.config()
connectDB()

const app=express()
app.use(cookieParser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use(cors({
    origin:"*"
}))

app.post("/login",login)
app.post("/register", register)
app.post("/create",createResume)
app.get("/getAll",getResumes)
app.get("/get/:id", getResumeById)
app.get("/get/user/:id",getOneUserResume)
app.get("/getUsers",getUsers)
app.post("/update",updateResume)

app.get("/me",protect,me)


app.listen(process.env.port,()=>{
    console.log(`server started http://localhost:${process.env.port}`)
})

