import mongoose from "mongoose";

const gisDataSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },

    layer_name: {
      type: String,
      required: true,
    },

    feature_type: {
      type: String,
      enum: ["point", "polygon", "line"],
      default: "point",
    },

    coordinates: {
      latitude: Number,
      longitude: Number,
    },

    properties: {
      type: Object,
      default: {},
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

export default mongoose.model("GISData", gisDataSchema);