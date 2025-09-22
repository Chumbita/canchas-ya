import express from "express";
import { requestOtpController } from "../controllers/requestOtpController.js";
import { verifyOtpController } from "../controllers/verifyOtpController.js";

const router = express.Router();

router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyOtpController);

export default router;