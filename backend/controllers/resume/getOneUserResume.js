import Resume from "../../models/resume.js";


export const getOneUserResume=async (req,res)=>{
    const {userId}=req.params;
    try {
        const data=await Resume.find({userId:userId})
        if (!data){
            return res.status(404).json({
                success:false,
                message:"No resume found"
            
            })
        }
        return res.status(200).json({
            success:true,
            data:data
        })

    } catch (error) {
                    console.log('Err Fetching users resume:',error)

                    return res.status(404).json({
                success:false,
                message:"Err Fetching user's resume"
            
            })
        
    }
}


