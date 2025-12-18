import mongoose from "mongoose";

export const educationSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  scoreType: {
    type: String,
    enum: ['GPA', 'Percentage', 'CGPA', 'Grade', ''],
    default: ''
  },
  score: {
    type: Number,
    required: false
  },
  currentlyStudying: {
    type: Boolean,
    default: false
  }
});
