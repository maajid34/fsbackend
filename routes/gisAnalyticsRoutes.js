import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getGISAnalytics } from "../controllers/gisAnalyticsController.js";

const router = express.Router();

router.get("/gis-analytics", protect, getGISAnalytics);

export default router;