import Resume from "../../models/resume.js";


export const updateResume=async(req,res)=>{
    try {
        const {id,userId,updatedData}=req.body;
        const update=await Resume.findOneAndUpdate(
            {_id:id,
            userId:userId},
            {$set:updatedData},
            {new:true}
    )
    if(!update){
        return res.status(501).json({
            success:false,
            message:"Resume not found"
        })
    }
    return res.status(201).json({
        success:true,
        message:"Resume updated successfully",
        data:update
    })
    } catch (error) {
        console.log('err updating resume:',error)
        return res.status(501).json({
            success:false,
            message:"Err updating resume"
        })
    }
}

