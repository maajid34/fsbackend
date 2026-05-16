import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getSystemAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.get("/alerts", protect, getSystemAlerts);

export default router;