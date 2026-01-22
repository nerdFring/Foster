import crypto from 'crypto'
import { User } from '../../models/user.js';


export const verifyEmail=async (req,res)=>{
    const {verifyToken}=req.params;

const hashedToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

    const user= await User.findOne({
        emailVerifyToken:hashedToken,
        emailVerifyExpire:{$gt:Date.now()},

    })
    if(!user){
        return res.status(400).json({message:"token invalid or expired"})
    }
    user.isVerified=true;
    user.emailVerifyExpire=undefined;
    user.emailVerifyToken=undefined

    await user.save()
      return res.status(200).json({ message: "Email verified successfully" });

}

