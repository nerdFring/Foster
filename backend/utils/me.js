import { User } from "../models/user"


export const me=async(req,res)=>{
const user=await User.findById(req.userId).select("-password")
res.json(user)
}
