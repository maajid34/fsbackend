import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    permission_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    module_name: {
      type: String,
      required: true,
      trim: true,
    },

    action: {
      type: String,
      required: true,
      enum: ["create", "read", "update", "delete", "approve", "publish", "export"],
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);