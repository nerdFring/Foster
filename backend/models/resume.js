import mongoose from "mongoose";
import { educationSchema } from "./educations.js";
import { experienceSchema } from "./experience.js";
import { projectSchema } from "./project.js";
import { skillSchema } from "./skills.js";

const resumeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },

  languages: [{
    type: String
  }],
  
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true 
});

resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;

