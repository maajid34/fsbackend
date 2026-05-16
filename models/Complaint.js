// import mongoose from "mongoose";

// const complaintSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "resolved"],
//       default: "pending",
//     },
//     beneficiary: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Beneficiary",
//     },
//     reviewed: {
//   type: Boolean,
//   default: false,
// },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Complaint", complaintSchema);

import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    complaint_type: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date_received: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "closed"],
      default: "open",
    },

    resolution: {
      type: String,
      trim: true,
    },

    resolved_date: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);