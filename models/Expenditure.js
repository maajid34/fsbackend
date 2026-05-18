import mongoose from "mongoose";

const expenditureSchema = new mongoose.Schema(
  {
    workplan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workplan",
      required: true,
    },

    subactivity_title: {
      type: String,
      required: true,
      trim: true,
    },

    expenditure_date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    payment_reference: {
      type: String,
      default: "",
      trim: true,
    },

    vendor: {
      type: String,
      default: "",
      trim: true,
    },

    expenditure_type: {
      type: String,
      enum: [
        "procurement",
        "construction",
        "training",
        "consultancy",
        "operations",
        "field_activity",
        "other",
      ],
      default: "other",
    },

    statusApproval: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expenditure", expenditureSchema);