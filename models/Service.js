// // import mongoose from "mongoose";

// // const serviceSchema = new mongoose.Schema(
// //   {
// //     type: {
// //       type: String,
// //       enum: ["seed", "livestock", "training"],
// //       required: true,
// //     },
// //     description: String,
// //     beneficiaries: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Beneficiary",
// //       },
// //     ],
// //     status: {
// //   type: String,
// //   enum: ["pending", "approved"],
// //   default: "pending",
// // },
// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("Service", serviceSchema);

// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema(
//   {
//     activity: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Activity",
//       required: true,
//     },

//     location: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Location",
//       required: true,
//     },

//     service_type: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     unit: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     quantity: {
//       type: Number,
//       required: true,
//     },

//     date_provided: {
//       type: Date,
//       required: true,
//     },

//     statusApproval: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Service", serviceSchema);

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      default: null,
    },
    seeded_2026: {
  type: Boolean,
  default: false,
},

    subcomponent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcomponent",
      default: null,
    },

    value_chain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ValueChain",
      default: null,
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      default: null,
    },

    community_group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityGroup",
      default: null,
    },

    service_type: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    date_provided: {
      type: Date,
      required: true,
    },

    beneficiaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beneficiary",
      },
    ],

    statusApproval: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);