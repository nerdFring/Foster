import express from 'express';
import mongoose from 'mongoose';
import nodemon from 'nodemon';
import cors from 'cors';

const app=express()


app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})


app.listen(3000,()=>{
    console.log('server started')
})