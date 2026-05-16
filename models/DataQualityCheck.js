import mongoose from "mongoose";

const dataQualityCheckSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
      enum: ["beneficiaries", "activities", "services", "complaints"],
    },

    check_type: {
      type: String,
      required: true,
      enum: ["completeness", "accuracy", "duplicate", "consistency"],
    },

    description: {
      type: String,
      trim: true,
    },

    run_date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["passed", "failed", "needs_review"],
      default: "needs_review",
    },

    records_checked: {
      type: Number,
      default: 0,
    },

    errors_found: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DataQualityCheck", dataQualityCheckSchema);