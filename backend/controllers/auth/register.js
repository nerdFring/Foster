import { User } from "../../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendTokenCookie } from "../../utils/cookie.js"
import { generateVerifyToken } from "../../utils/generateVerifyToken.js"
import { sendEmail } from "../../utils/sendEmail.js"

export const register=async(req,res)=>{
    const {name, email, password}=req.body
    try {
        const user=await User.findOne({email})
        if (user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPass= await bcrypt.hash(password,10)
                const {verifyToken,hashedToken}=generateVerifyToken()

        const newUser=new User({
            name,
            email,
            password:hashPass,
            emailVerifyToken:hashedToken,
      emailVerifyExpire: Date.now() + 10 * 60 * 1000, // 10 mins
        })

        const verifyUrl=`http://localhost:5173/verify-email/${verifyToken}`
        await sendEmail({
            to:email,
            subject:"verify email",
            html:`  <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 10 minutes.</p>`
        })

        const savedUesr=await newUser.save()
        const token=jwt.sign({id:savedUesr._id,email},process.env.secretKey,{expiresIn:"30d"})
        // sendTokenCookie(res,token)
        return res.status(201)
        .json({message:"user created successfully! Check the verification link sent on gmail",user:savedUesr,token})
    } catch (error) {
        console.log("error creating user",error)
        return res.status(500).json({message:"error creating user"})
    }
}


