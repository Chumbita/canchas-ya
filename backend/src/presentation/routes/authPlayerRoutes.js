import express from "express";
import { googleAuthController } from "../controllers/authController.js";
import { completeProfileController } from "../controllers/playerController.js";

const router = express.Router();

router.post("/google", googleAuthController);
router.post("/complete-profile", completeProfileController);

export default router;
