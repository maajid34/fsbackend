import mongoose from "mongoose";

const publicPortalItemSchema = new mongoose.Schema(
  {
    content_type: {
      type: String,
      enum: ["report", "knowledge_product", "success_story", "dataset", "news"],
      required: true,
    },

    reference_id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    file_path: {
      type: String,
      trim: true,
    },

    thumbnail_path: {
      type: String,
      trim: true,
    },

    is_published: {
      type: Boolean,
      default: false,
    },

    published_at: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PublicPortalItem", publicPortalItemSchema);