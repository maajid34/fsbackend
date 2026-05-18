import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   enum: ["admin", "editor", "viewer"],
    //   default: "viewer",
    // },
  role: {
  type: String,
  enum: ["admin", "manager", "data_entry", "viewer","reporter"],
  default: "data_entry",
},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);