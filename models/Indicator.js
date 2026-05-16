


// // import mongoose from "mongoose";

// // const indicatorSchema = new mongoose.Schema(
// //   {
// //     code: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       trim: true,
// //     },

// //     name: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     description: {
// //       type: String,
// //       trim: true,
// //     },

// //     indicator_type: {
// //       type: String,
// //       required: true,
// //       enum: [
// //         "output",
// //         "outcome",
// //         "impact",
// //         "process",
// //       ],
// //     },

// //     unit_of_measure: {
// //       type: String,
// //       required: true,
// //     },

// //     disaggregation_type: {
// //       type: String,
// //       enum: [
// //         "gender",
// //         "age",
// //         "location",
// //         "none",
// //       ],
// //       default: "none",
// //     },

// //     baseline_value: {
// //       type: Number,
// //       default: 0,
// //     },

// //     target_value: {
// //       type: Number,
// //       default: 0,
// //     },

// //     actual_value: {
// //       type: Number,
// //       default: 0,
// //     },

// //     reporting_frequency: {
// //       type: String,
// //       enum: [
// //         "monthly",
// //         "quarterly",
// //         "annually",
// //       ],
// //       default: "quarterly",
// //     },

// //     status: {
// //       type: String,
// //       enum: [
// //         "on_track",
// //         "at_risk",
// //         "off_track",
// //       ],
// //       default: "on_track",
// //     },

// //     is_active: {
// //       type: Boolean,
// //       default: true,
// //     },

// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model(
// //   "Indicator",
// //   indicatorSchema
// // );

//  import mongoose from "mongoose";

// const indicatorSchema = new mongoose.Schema(
//   {
//     code: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//     },

//     unit_of_measure: {
//       type: String,
//       default: "",
//     },
//     indicator_type: {
//   type: String,
//   enum: ["output", "outcome", "impact", "process"],
//   default: "output",
// },

//     baseline: {
//       type: Number,
//       default: 0,
//     },

//     source_type: {
//       type: String,
//       enum: ["beneficiary", "service", "activity"],
//       default: "beneficiary",
//     },

//     aggregation_field: {
//       type: String,
//       enum: ["count", "quantity"],
//       default: "count",
//     },

//     service_type_filter: {
//       type: String,
//       default: "",
//     },

//     activity_status_filter: {
//       type: String,
//       default: "",
//     },

//     category_filter: {
//       type: String,
//       default: "",
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );


// export default mongoose.model(             
//   "Indicator",
//   indicatorSchema
// );




import mongoose from "mongoose";

const indicatorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    indicator_type: {
      type: String,
      enum: ["pdo", "output", "outcome", "impact", "process"],
      default: "output",
    },
    component: {
  type: String,
  default: "",
},

subcomponent: {
  type: String,
  default: "",
},

    unit_of_measure: {
      type: String,
      default: "",
    },

    baseline: {
      type: Number,
      default: 0,
    },
result_level: {
  type: String,
  enum: ["pdo", "outcome", "output", "impact"],
  default: "output",
},

end_target: {
  type: Number,
  default: 0,
},
    disaggregation_type: {
      type: String,
      enum: ["none", "gender", "age", "category", "location", "district"],
      default: "none",
    },

    reporting_frequency: {
      type: String,
      enum: ["monthly", "quarterly", "annually"],
      default: "quarterly",
    },

    source_type: {
      type: String,
      enum: ["beneficiary", "service", "activity"],
      default: "beneficiary",
    },

    aggregation_field: {
      type: String,
      enum: ["count", "quantity"],
      default: "count",
    },

    service_type_filter: {
      type: String,
      default: "",
    },

    activity_status_filter: {
      type: String,
      default: "",
    },

    category_filter: {
      type: String,
      default: "",
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

export default mongoose.model("Indicator", indicatorSchema);