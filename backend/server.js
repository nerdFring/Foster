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



dotenv.config()
connectDB()

const app=express()

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
app.get("/get",getResumes)
app.get("/get/:id", getResumeById)
app.get("/get/user/:id",getResumes)

app.post("/update",updateResume)
app.listen(process.env.port,()=>{
    console.log(`server started http://localhost:${process.env.port}`)
})

