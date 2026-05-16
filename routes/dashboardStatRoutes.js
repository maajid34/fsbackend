import express from "express";

import {
  createDashboardStat,
  getDashboardStats,
} from "../controllers/dashboardStatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDashboardStat);

router.get("/", protect, getDashboardStats);

export default router;