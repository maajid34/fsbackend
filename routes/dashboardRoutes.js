import express from "express";
import {
  getDashboardSummary,
  getDashboardPerformance,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-summary", protect, getDashboardSummary);
router.get("/dashboard-performance", protect, getDashboardPerformance);

export default router;