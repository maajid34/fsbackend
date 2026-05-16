import mongoose from "mongoose";

const subcomponentSchema = new mongoose.Schema(
  {
    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    budget: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subcomponent", subcomponentSchema);