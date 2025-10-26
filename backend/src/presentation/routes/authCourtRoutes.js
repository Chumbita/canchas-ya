import express from "express";
import { courtController } from "../controllers/courtController.js";

const router = express.Router();

router.post("/", courtController.create);
router.get("/:sportClubId", courtController.list);
router.put("/:id", courtController.update);
router.delete("/:id", courtController.delete);

export default router;
