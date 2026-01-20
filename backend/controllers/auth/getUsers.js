import { User } from "../../models/user.js";


export const getUsers=async(req,res)=>{
    try {
        const data=await User.find();
        return res.status(201).json({data})
    } catch (error) {
        console.log('err:',error)
    }
}

