// // import mongoose from "mongoose";

// // const activitySchema = new mongoose.Schema(
// //   {
// //     title: {
// //       type: String,
// //       required: true,
// //     },
// //     component: {
// //       type: String,
// //       required: true,
// //     },
// //     status: {
// //       type: String,
// //       enum: ["planned", "ongoing", "completed"],
// //       default: "planned",
// //     },
// //     beneficiaries: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Beneficiary",
// //       },
// //     ],
// //     evidence: {
// //       type: String, // later file upload
// //     },
// //     statusApproval: {
// //   type: String,
// //   enum: ["pending", "approved", "rejected"],
// //   default: "pending",
// // },
// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("Activity", activitySchema);

// // new
// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema(
//   {
//     location: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Location",
//       required: true,
//     },

//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     component: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: ["planned", "ongoing", "completed"],
//       default: "planned",
//     },

//     start_date: {
//       type: Date,
//     },

//     end_date: {
//       type: Date,
//     },

//     beneficiaries: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Beneficiary",
//       },
//     ],

//     evidence: {
//       type: String,
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

// export default mongoose.model("Activity", activitySchema);

import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    // location: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Location",
    //   required: true,
    // },
    locations: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
],

    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      default: null,
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

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["planned", "ongoing", "completed"],
      default: "planned",
    },
    seeded_2026: {
  type: Boolean,
  default: false,
},

    start_date: {
      type: Date,
    },

    end_date: {
      type: Date,
    },

    beneficiaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beneficiary",
      },
    ],

    evidence: {
      type: String,
    },

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

export default mongoose.model("Activity", activitySchema);