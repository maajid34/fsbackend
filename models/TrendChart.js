import mongoose from "mongoose";

const trendChartSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    period_type: {
      type: String,
      enum: ["monthly", "quarterly", "annually"],
      required: true,
    },

    period_label: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    disaggregation_value: {
      type: String,
      default: "overall",
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TrendChart", trendChartSchema);