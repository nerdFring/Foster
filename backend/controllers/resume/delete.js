import Resume from "../../models/resume.js"



export const deleteResume=async(req,res)=>{
    const {id}=req.body;
    try {
        const data=await Resume.findOneAndDelete(id)
        if(!data){
            return res.status(500).json({
                message:"resume not found",
                success:fase
            })
        }
        return res.status(201).json({message:"deleted Successfully",success:true})
    } catch (error) {
        console.error("Error deleting resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting resume",
      error: error.message
    });
    }
}

