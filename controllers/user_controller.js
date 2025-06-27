import jwt from "jsonwebtoken";
import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const information = req.body;

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!regexPassword.test(information.password)) {
    return res.json({
      message:
        "Password my contain atleast one capital letter, small letter, digit, special character each and it must have at least 8 characters in total",
    });
  }
  if (!information.password || !information.email) {
    return res.json({
      message: "Please fill in the required credentials",
    });
  }

  const existingUser = await userModel.findOne({
    $or: [{ email: information.email }, { phone: information.phone }],
  });
  if (existingUser) {
    return res.json({
      message:
        "User already exist try another email/phone or log into your account",
    });
  }

  try {
    const hashedpassword = await bcrypt.hash(information.password, 10);
    const newUser = new userModel({
      ...information,
      password: hashedpassword,
    });
    const saveUser = newUser.save();

    return res.json({
      message: "Account Successfully Created",
      User: saveUser,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const Userlogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    res.json({
      message: "This is account does not exist, create account!!!",
    });
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.json({
      message: "Invalid Email or Password",
    });
  }
  //generating a token
  const token = jwt.sign(
    {
      id: user.id,
      kyc: user.kyc,
      admin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2hr",
    }
  );

  res.cookie("Token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
  });
  return res.json({
    message: "login successful",
  });
};

const getUser = async (req, res) => {
  const { id } = req.query;

  try {
    const User = await userModel
      .findById(id)
      .populate({
        path: "kyc",
        select: " -verificationPic ",
      })
      .populate({
        path: "posts",
        select: "title image",
      });

      res.json(User)
  } catch (error) {
    res.json(error.message);
  }
};

export { createUser, Userlogin, getUser };
