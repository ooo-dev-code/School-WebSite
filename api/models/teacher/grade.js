import mongoose from "mongoose";

const gradeSchema = mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    default: 0,
  },
  maxGrade: {
    type: Number,
    default: 20,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
