import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { login } from './controllers/auth/login.js';
import { register } from './controllers/auth/register.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';




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

app.listen(3000,()=>{
    console.log('server started')
})

