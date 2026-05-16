import mongoose from "mongoose";

const reportRegistrySchema = new mongoose.Schema(
  {
    report_type: {
      type: String,
      enum: ["quarterly", "annual", "special", "evaluation"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    period_start: {
      type: Date,
      required: true,
    },

    period_end: {
      type: Date,
      required: true,
    },

    file_path: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "published"],
      default: "draft",
    },

    is_published: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReportRegistry", reportRegistrySchema);