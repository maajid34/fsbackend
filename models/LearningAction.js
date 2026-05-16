import mongoose from "mongoose";

const learningActionSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportRegistry",
    },

    action_type: {
      type: String,
      enum: [
        "lesson_learned",
        "corrective_action",
        "risk",
        "recommendation",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    responsible_person: {
      type: String,
      trim: true,
    },

    target_date: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "open",
        "in_progress",
        "completed",
        "closed",
      ],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "LearningAction",
  learningActionSchema
);