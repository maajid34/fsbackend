import mongoose from "mongoose";

const communityGroupSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    group_type: {
      type: String,
      enum: ["CIG", "VMG", "CDDC", "PMC", "MESC", "SAIC", "FSC", "other"],
      default: "CIG",
    },

    value_chain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ValueChain",
    },

    members_count: {
      type: Number,
      default: 0,
    },

    female_members: {
      type: Number,
      default: 0,
    },

    male_members: {
      type: Number,
      default: 0,
    },

    registration_date: {
      type: Date,
      default: Date.now,
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

export default mongoose.model("CommunityGroup", communityGroupSchema);