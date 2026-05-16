import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "data_entry", "viewer"],
    },

    permission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },

    is_allowed: {
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

export default mongoose.model("RolePermission", rolePermissionSchema);