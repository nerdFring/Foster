import { User } from "../models/user.js"
import { clearTokenCookie } from "./cookie.js"

export const me=async(req,res)=>{
const user=await User.findById(req.userId).select("-password")
res.json(user)
}

export const logOut=(req,res)=>{
clearTokenCookie(res)
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
}
