import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    verificationPic: {
      type: String,
      required: true,
    },
    userPic: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  { timestamps: true }
);

const kycModel = mongoose.model("Kyc", kycSchema);
export default kycModel;
