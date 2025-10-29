import { Router } from "express";
import { createPreference } from "../controllers/paymentController.js";

const router = Router();

router.post("/mp/create-preference", createPreference);

export default router;


