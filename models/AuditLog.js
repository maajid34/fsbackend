// import mongoose from "mongoose";

// const auditSchema = new mongoose.Schema(
//   {
//     action: String, // approved / rejected
//     entity: String, // beneficiary / activity
//     entityId: mongoose.Schema.Types.ObjectId,
//     performedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("AuditLog", auditSchema);

import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    table_name: {
      type: String,
      required: true,
    },

    record_id: {
      type: String,
      required: true,
    },

    details: {
      type: String,
    },

    ip_address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);