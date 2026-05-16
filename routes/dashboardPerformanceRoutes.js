import express from "express";
import { getDashboardPerformance } from "../controllers/dashboardPerformanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardPerformance);

export default router;