import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema(
  {
    original_name: {
      type: String,
      required: true,
    },

    file_name: {
      type: String,
      required: true,
    },

    file_url: {
      type: String,
      required: true,
    },

    mime_type: {
      type: String,
    },

    size: {
      type: Number,
    },

    module: {
      type: String,
      default: "general",
    },

    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    related_name: {
  type: String,
  default: "",
},

    related_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Evidence", evidenceSchema);