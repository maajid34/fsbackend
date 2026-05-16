import mongoose from "mongoose";

const resultDisaggregationSchema = new mongoose.Schema(
  {
    indicator_result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndicatorResult",
      required: true,
    },

    disaggregation_type: {
      type: String,
      required: true,
      enum: ["gender", "age", "location", "youth", "vulnerable", "other"],
    },

    disaggregation_value: {
      type: String,
      required: true,
      trim: true,
    },

    result_value: {
      type: Number,
      required: true,
      min: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ResultDisaggregation", resultDisaggregationSchema);