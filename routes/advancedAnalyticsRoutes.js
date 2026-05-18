import express from "express";
import { getAdvancedDashboardAnalytics } from "../controllers/advancedAnalyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAdvancedDashboardAnalytics);

export default router;