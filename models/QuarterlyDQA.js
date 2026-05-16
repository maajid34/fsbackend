import mongoose from "mongoose";

const quarterlyDQASchema = new mongoose.Schema(
  {
    quarter: {
      type: String,
      required: true,
      enum: ["Q1", "Q2", "Q3", "Q4"],
    },

    year: {
      type: Number,
      required: true,
    },

    data_source_summary: {
      type: String,
      trim: true,
    },

    accuracy_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    completeness_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    issues_summary: {
      type: String,
      trim: true,
    },

    recommendations: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["draft", "reviewed", "approved"],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("QuarterlyDQA", quarterlyDQASchema);