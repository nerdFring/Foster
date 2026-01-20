import { User } from "../../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendTokenCookie } from "../../utils/cookie.js"


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user){
            return res.status(400).json({message:"user not found"})
        }
        const comparePass=await bcrypt.compare(password,user.password)
        if(!comparePass){
            return res.status(400).json({message:"invalid credentials"})
        }
        const token = jwt.sign({id:user._id,email},process.env.secretKey,{expiresIn:"30d"})
        sendTokenCookie(res,token)
        return res.status(200).json({message:"login successful",token,user})
    } catch (error) {
        console.log('login err:',error)
        return res.status(500).json({message:"login error"})
    }
}

