import mongoose from "mongoose";

const dataQualityIssueSchema = new mongoose.Schema(
  {
    dq_check: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DataQualityCheck",
      required: true,
    },

    table_name: {
      type: String,
      required: true,
      enum: ["beneficiaries", "activities", "services", "complaints"],
    },

    record_id: {
      type: String,
      required: true,
    },

    field_name: {
      type: String,
      required: true,
    },

    issue_type: {
      type: String,
      required: true,
      enum: ["missing_value", "invalid_value", "duplicate", "inconsistent_data"],
    },

    issue_description: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["open", "fixed", "ignored"],
      default: "open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("DataQualityIssue", dataQualityIssueSchema);