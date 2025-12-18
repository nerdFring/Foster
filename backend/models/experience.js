import mongoose from "mongoose";
export  const experienceSchema = new mongoose.Schema({
  employer: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobLocation: {
    type: String,
    required: false
  },
  jobStartDate: {
    type: Date,
    required: false
  },
  jobEndDate: {
    type: Date,
    required: false
  },
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  jobDescription: {
    type: String,
    required: false
  }
});

