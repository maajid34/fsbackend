import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
  {
    module_type: {
      type: String,
      required: true,
      enum: [
        "beneficiary",
        "activity",
        "service",
        "complaint",
        "quarterly_dqa",
        "report",
        "indicator",
      ],
    },

    reference_id: {
      type: String,
      required: true,
    },

    approval_status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },

    comments: {
      type: String,
      trim: true,
    },

    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approved_at: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Approval", approvalSchema);