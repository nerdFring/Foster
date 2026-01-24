import { validationResult } from "express-validator";
import Resume from "../../models/resume.js";

export const createResume = async (req, res) => {


  try {

    const userId = req.userId; 

   const {
  firstName,
  lastName,
  email,
  phone,
  address,
  languages,
  educations,
  experiences,
  skills,
  projects,
  template,
  
} = req.body;
    
    const newResume = new Resume({
      firstName,
      lastName,
      email,
      phone,
      address,
      languages: languages || [], 
      education: educations || [], 
      experience: experiences || [], 
      skills: skills || [], 
      projects: projects || [],
      userId,
      template: template || 'default'
    });

    const savedResume = await newResume.save();

    const populatedResume = await Resume.findById(savedResume._id).populate('userId', 'name email');

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: populatedResume
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating resume",
      error: error.message,
      stack:error.stack
    });
  }
};





