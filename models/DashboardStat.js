import mongoose from "mongoose";

const dashboardStatSchema = new mongoose.Schema(
  {
    stat_name: {
      type: String,
      required: true,
    },

    stat_key: {
      type: String,
      required: true,
      unique: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    module_name: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "bar_chart",
    },

    color: {
      type: String,
      default: "#2563eb",
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

export default mongoose.model("DashboardStat", dashboardStatSchema);