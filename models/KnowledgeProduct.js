import mongoose from "mongoose";

const knowledgeProductSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportRegistry",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    product_type: {
      type: String,
      enum: [
        "case_study",
        "success_story",
        "learning_brief",
        "research_paper",
        "publication",
        "other",
      ],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    file_path: {
      type: String,
      trim: true,
    },

    author: {
      type: String,
      trim: true,
    },

    publication_date: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["draft", "reviewed", "published"],
      default: "draft",
    },

    is_public: {
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

export default mongoose.model("KnowledgeProduct", knowledgeProductSchema);