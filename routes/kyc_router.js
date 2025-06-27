import e from "express";
import { createKyc, getKyc } from "../controllers/kyc_controller.js";
import authenticateUser from "../middleware/auth_middleware.js";

const kycRouter = e.Router();

kycRouter.post("/kyc", authenticateUser, createKyc);
kycRouter.get("/kyc", getKyc);

export default kycRouter;
