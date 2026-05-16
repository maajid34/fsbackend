import mongoose from "mongoose";

const reportIndicatorSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportRegistry",
      required: true,
    },

    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    target_value: {
      type: Number,
      default: 0,
    },

    actual_value: {
      type: Number,
      default: 0,
    },

    variance: {
      type: Number,
      default: 0,
    },

    progress_percent: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["on_track", "off_track", "completed"],
      default: "on_track",
    },

    comments: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ReportIndicator",
  reportIndicatorSchema
);