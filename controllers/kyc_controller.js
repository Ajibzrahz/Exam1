import kycModel from "../models/kyc_model.js";
import userModel from "../models/user_model.js";

const createKyc = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;

  const kycExist = await kycModel.findOne({ user: id });
  if (kycExist) {
    return res.send("You have created a Kyc");
  }

  try {
    //creating kyc
    const kyc = new kycModel({
      user: id,
      ...payload,
    });
    const savedKyc = await kyc.save();
    //updating usermodel
    await userModel.findByIdAndUpdate(id, { kyc: savedKyc }, { new: true });
    return res.json({
      message: "KYC submitted successfully",
      kyc: savedKyc,
    });
  } catch (error) {
    res.send(error.message);
  }
};

const getKyc = async (req, res) => {
  const { kycId } = req.query;

  try {
    const kyc = await kycModel.findById(kycId).populate({
      path: "user",
      select: "name email hobbies",
    });

    res.json(kyc);
  } catch (error) {
    res.json(error.message);
  }
};

export { createKyc, getKyc };
