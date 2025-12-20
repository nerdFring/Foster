
import Resume from '../../models/resume.js';

export const getResumes = async (req, res) => {
  try {
    
const resumes=await Resume.find()

return res.status(200).json({
    message: "Resumes fetched successfully",
    data: resumes,
    success: true
})
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resumes",
      error: error.message
    });
  }
};

