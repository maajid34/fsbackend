// // // import mongoose from "mongoose";

// // // const workplanSchema = new mongoose.Schema(
// // //   {
// // //     component: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Component",
// // //       required: true,
// // //     },

// // //     subcomponent: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Subcomponent",
// // //       required: true,
// // //     },

// // //     workplan_no: {
// // //       type: Number,
// // //       required: true,
// // //     },

// // //     milestone: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },

// // //     activity: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Activity",
// // //       default: null,
// // //     },

// // //     activity_description: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },

// // //     output: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },

// // //     timeline_start: {
// // //       type: Date,
// // //       required: true,
// // //     },

// // //     timeline_end: {
// // //       type: Date,
// // //       required: true,
// // //     },

// // //     responsible: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },

// // //     projected_cost_q1: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     projected_cost_q2: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     projected_cost_q3: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     projected_cost_q4: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     total_budget: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     actual_expenditure: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     budget_variance: {
// // //       type: Number,
// // //       default: 0,
// // //     },

// // //     implementation_progress: {
// // //       type: Number,
// // //       default: 0,
// // //       min: 0,
// // //       max: 100,
// // //     },

// // //     status: {
// // //       type: String,
// // //       enum: [
// // //         "planned",
// // //         "ongoing",
// // //         "completed",
// // //         "delayed",
// // //       ],
// // //       default: "planned",
// // //     },

// // //     remarks: {
// // //       type: String,
// // //       default: "",
// // //     },

// // //     createdBy: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //     },
// // //   },
// // //   { timestamps: true }
// // // );

// // // export default mongoose.model(
// // //   "Workplan",
// // //   workplanSchema
// // // );


// // import mongoose from "mongoose";

// // const workplanSchema = new mongoose.Schema(
// //   {
// //     component: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Component",
// //       required: true,
// //     },

// //     subcomponent: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Subcomponent",
// //       default: null,
// //     },

// //     subcomponent_text: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     workplan_no: {
// //       type: Number,
// //       required: true,
// //     },

// //     milestone: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     activity_subactivity: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     output: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     timeline: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     responsible: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     projected_cost: {
// //       type: Number,
// //       default: 0,
// //     },

// //     budget_information: {
// //       type: String,
// //       default: "",
// //       trim: true,
// //     },

// //     status: {
// //       type: String,
// //       enum: [
// //         "planned",
// //         "ongoing",
// //         "completed",
// //         "delayed",
// //       ],
// //       default: "planned",
// //     },

// //     remarks: {
// //       type: String,
// //       default: "",
// //     },

// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model(
// //   "Workplan",
// //   workplanSchema
// // );


// import mongoose from "mongoose";

// const workplanSchema = new mongoose.Schema(
//   {
//     component: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Component",
//       required: true,
//     },

//     subcomponent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subcomponent",
//       default: null,
//     },

//     subcomponent_text: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     workplan_no: {
//       type: Number,
//       required: true,
//     },

//     milestone: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // activity_subactivities: [
//     //   {
//     //     title: {
//     //       type: String,
//     //       required: true,
//     //       trim: true,
//     //     },
//     //   },
//     // ],
// activity_subactivities: [
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     timeline: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     responsible: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     projected_cost: {
//       type: Number,
//       default: 0,
//     },
//   },
// ],
//     output: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     quarter: {
//       type: String,
//       enum: ["Q1", "Q2", "Q3", "Q4", "Q1-Q2", "Q2-Q3", "Q3-Q4", "Q1-Q4"],
//       required: true,
//     },

//     timeline: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     responsible: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     projected_cost: {
//       type: Number,
//       default: 0,
//     },

//     budget_information: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: ["planned", "ongoing", "completed", "delayed"],
//       default: "planned",
//     },

//     remarks: {
//       type: String,
//       default: "",
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Workplan", workplanSchema);


import mongoose from "mongoose";

const workplanSchema = new mongoose.Schema(
  {
    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    subcomponent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcomponent",
      default: null,
    },

    subcomponent_text: {
      type: String,
      required: true,
      trim: true,
    },

    workplan_no: {
      type: Number,
      required: true,
    },

    milestone: {
      type: String,
      required: true,
      trim: true,
    },

    activity_subactivities: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },

        timeline: {
          type: String,
          default: "",
          trim: true,
        },

        responsible: {
          type: String,
          default: "",
          trim: true,
        },

        projected_cost: {
          type: Number,
          default: 0,
        },
      },
    ],

    output: {
      type: String,
      required: true,
      trim: true,
    },

    quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4", "Q1-Q2", "Q2-Q3", "Q3-Q4", "Q1-Q4"],
      // required: true,
    },

    timeline: {
      type: String,
      // required: true,
      trim: true,
    },

    responsible: {
      type: String,
      // required: true,
      trim: true,
    },

    milestone_total_budget: {
      type: Number,
      default: 0,
    },

    budget_information: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["planned", "ongoing", "completed", "delayed"],
      default: "planned",
    },

    remarks: {
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

export default mongoose.model("Workplan", workplanSchema);