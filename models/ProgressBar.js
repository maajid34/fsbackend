import mongoose from "mongoose";

const progressBarSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    period: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    baseline: {
      type: Number,
      default: 0,
    },

    target: {
      type: Number,
      required: true,
    },

    actual: {
      type: Number,
      default: 0,
    },

    progress_percent: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["on_track", "at_risk", "off_track"],
      default: "on_track",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProgressBar", progressBarSchema);