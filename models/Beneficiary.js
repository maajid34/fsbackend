// import mongoose from "mongoose";

// const beneficiarySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     sex: {
//       type: String,
//       enum: ["male", "female"],
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//        state: {
//   type: String,
// },
//     district: {
//       type: String,
//       required: true,
//     },
 

// category: {
//   type: String,
// },
//     status: {
//   type: String,
//   enum: ["pending", "approved", "rejected"],
//   default: "pending",
// },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Beneficiary", beneficiarySchema);



// new

// import mongoose from "mongoose";

// const beneficiarySchema = new mongoose.Schema(
//   {
//     location: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Location",
//       required: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     sex: {
//       type: String,
//       enum: ["male", "female"],
//       required: true,
//     },

//     age: {
//       type: Number,
//       required: true,
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       trim: true,
//     },

//     is_vulnerable: {
//       type: Boolean,
//       default: false,
//     },


//     status: {
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

// export default mongoose.model("Beneficiary", beneficiarySchema);


import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
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

    value_chain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ValueChain",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    is_vulnerable: {
      type: Boolean,
      default: false,
    },

    status: {
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

export default mongoose.model("Beneficiary", beneficiarySchema);