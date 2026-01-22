import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
 isVerified: {
    type: Boolean,
    default: false,
  },
   emailVerifyToken: String,
  emailVerifyExpire: Date,
createdAt:{
    type:Date,
    default:Date.now
}})


export const User=mongoose.model("User",userSchema)
