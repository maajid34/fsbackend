import mongoose from "mongoose";

const reportApprovalSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportRegistry",
      required: true,
    },

    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approval_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    comments: {
      type: String,
      trim: true,
    },

    reviewed_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReportApproval", reportApprovalSchema);