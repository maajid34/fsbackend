import mongoose from "mongoose";

const indicatorTargetSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    target_year: {
      type: Number,
      required: true,
    },

    target_quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4", "Annual"],
      required: true,
    },

    target_value: {
      type: Number,
      required: true,
      min: 0,
    },

    disaggregation_value: {
      type: String,
      default: "overall",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("IndicatorTarget", indicatorTargetSchema);
