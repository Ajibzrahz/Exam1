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
    isAdmin: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    hobbies: {
      type: [String],
      default: [],
    },
    kyc: {
      type: mongoose.Types.ObjectId,
      ref: "Kyc",
      unique: true
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
