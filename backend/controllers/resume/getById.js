import mongoose from "mongoose";
import Resume from "../../models/resume.js";

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({ _id: id })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resume",
      error: error.message
    });
  }
};

