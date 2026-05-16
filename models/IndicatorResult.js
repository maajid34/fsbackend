// // import mongoose from "mongoose";

// // const indicatorResultSchema = new mongoose.Schema(
// //   {
// //     indicator: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Indicator",
// //       required: true,
// //     },

// //     period_year: {
// //       type: Number,
// //       required: true,
// //     },

// //     period_quarter: {
// //       type: String,
// //       enum: ["Q1", "Q2", "Q3", "Q4", "Annual"],
// //       required: true,
// //     },

// //     result_value: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },

// //     data_source: {
// //       type: String,
// //       trim: true,
// //       default: "manual_entry",
// //     },

// //     comments: {
// //       type: String,
// //       trim: true,
// //     },

// //     statusApproval: {
// //       type: String,
// //       enum: ["pending", "approved", "rejected"],
// //       default: "pending",
// //     },

// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("IndicatorResult", indicatorResultSchema);
// import mongoose from "mongoose";

// const indicatorResultSchema = new mongoose.Schema(
//   {
//     indicator: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Indicator",
//       required: true,
//     },

//     period_year: {
//       type: Number,
//       required: true,
//     },

//     period_quarter: {
//       type: String,
//       enum: ["Q1", "Q2", "Q3", "Q4", "Annual"],
//       required: true,
//     },

//     result_value: {
//       type: Number,
//       required: true,
//       default: 0,
//     },

//     data_source: {
//       type: String,
//       enum: ["manual_entry", "auto_aggregation", "activity_reports", "field_data"],
//       default: "manual_entry",
//     },

//     comments: {
//       type: String,
//       default: "",
//     },

//     statusApproval: {
//       type: String,
//       enum: ["pending", "reviewed", "approved", "rejected"],
//       default: "pending",
//     },

//     component: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Component",
//       default: null,
//     },

//     subcomponent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subcomponent",
//       default: null,
//     },

//     value_chain: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ValueChain",
//       default: null,
//     },

//     community: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Community",
//       default: null,
//     },

//     community_group: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "CommunityGroup",
//       default: null,
//     },

//     source_model: {
//       type: String,
//       enum: ["Beneficiary", "Service", "Activity", null],
//       default: null,
//     },

//     source_records: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         refPath: "source_model",
//       },
//     ],

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("IndicatorResult", indicatorResultSchema);

import mongoose from "mongoose";

const indicatorResultSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },

    period_year: {
      type: Number,
      required: true,
    },

    period_quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4", "Annual"],
      required: true,
    },

    result_value: {
      type: Number,
      required: true,
      default: 0,
    },

    target_value: {
      type: Number,
      default: 0,
    },

    achievement_percentage: {
      type: Number,
      default: 0,
    },

    variance: {
      type: Number,
      default: 0,
    },

    performance_status: {
      type: String,
      enum: ["on_track", "at_risk", "off_track"],
      default: "on_track",
    },

    data_source: {
      type: String,
      enum: ["manual_entry", "auto_aggregation", "activity_reports", "field_data"],
      default: "manual_entry",
    },

    comments: {
      type: String,
      default: "",
    },

    statusApproval: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },

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

    source_model: {
      type: String,
      enum: ["Beneficiary", "Service", "Activity", null],
      default: null,
    },

    source_records: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "source_model",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("IndicatorResult", indicatorResultSchema);