import mongoose from "mongoose";

const kpiCardSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    aggregation_type: {
      type: String,
      enum: ["sum", "average", "count", "latest"],
      default: "sum",
    },

    target_value: {
      type: Number,
      default: 0,
    },

    actual_value: {
      type: Number,
      default: 0,
    },

    period: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["on_track", "at_risk", "off_track"],
      default: "on_track",
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("KpiCard", kpiCardSchema);