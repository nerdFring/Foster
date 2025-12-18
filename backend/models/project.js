import mongoose from "mongoose";
export const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  link: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

