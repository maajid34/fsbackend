import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["village", "ward", "community", "settlement"],
      default: "village",
    },

    population: {
      type: Number,
      default: 0,
    },

    vulnerability_level: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", communitySchema);