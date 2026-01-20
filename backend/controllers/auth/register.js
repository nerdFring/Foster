import { User } from "../../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendTokenCookie } from "../../utils/cookie.js"

export const register=async(req,res)=>{
    const {name, email, password}=req.body
    try {
        const user=await User.findOne({email})
        if (user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPass= await bcrypt.hash(password,10)
        const newUser=new User({
            name,
            email,
            password:hashPass
        })
        const savedUesr=await newUser.save()
        const token=jwt.sign({id:savedUesr._id,email},process.env.secretKey,{expiresIn:"30d"})
        sendTokenCookie(res,token)
        return res.status(201).json({message:"user created successfully",user:savedUesr,token})
    } catch (error) {
        console.log("error creating user",error)
        return res.status(500).json({message:"error creating user"})
    }
}


