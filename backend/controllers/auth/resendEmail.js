import { User } from "../../models/user.js"
import { generateVerifyToken } from "../../utils/generateVerifyToken.js"
import { sendEmail } from "../../utils/sendEmail.js"


export const resendEmail=async(req,res)=>{
    try {
         const {verifyToken,hashedToken}=generateVerifyToken()
    const {email}=req.body;

     if (!email){
      return res.status(400).json({ message: "Email is required" });
     }
     const user =await User.findOne({email})
  if (!user){
      return res.status(400).json({ message: "User not found" });
     }
if (
  user.emailVerifyExpire &&
  user.emailVerifyExpire > Date.now()
) {
  return res.status(429).json({
    message: "Verification email already sent. Please wait."
  });
}

    user.emailVerifyExpire = Date.now() + 10 * 60 * 1000; // 10 min
    user.emailVerifyToken=hashedToken;

    await user.save()

        const verifyUrl=`http://localhost:5173/verify-email/${verifyToken}` 
        await sendEmail({
            to:email,
            subject:"verify email",
            html:`  <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 10 minutes.</p>`
        })
    return res.status(200).json({
      message: "Verification email resent successfully",
    });

    } catch (error) {
        console.log('err:',error)
        return res.status(501).json({message:"err resending email"})
    }
}

     