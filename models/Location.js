import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
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
      enum: ["village", "town", "camp", "site", "other"],
      default: "village",
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);