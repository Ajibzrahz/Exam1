import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  const { Token } = req.cookies;
  if (!Token) {
    return res.send("No Token");
  }
  try {
    const decode = jwt.verify(Token, process.env.JWT_SECRET);
    req.user = {
      id: decode.id,
      admin: decode.admin,
      kyc: decode.kyc,
    };
  } catch (error) {
    return res.json({ message: "Invalid Token" });
  }

  next();
};

export default authenticateUser;
