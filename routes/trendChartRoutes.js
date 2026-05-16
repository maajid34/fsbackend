import express from "express";

import {
  createTrendChart,
  getTrendCharts,
  getTrendChartById,
  updateTrendChart,
  deleteTrendChart,
} from "../controllers/trendChartController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createTrendChart
);

router.get("/", protect, getTrendCharts);
router.get("/:id", protect, getTrendChartById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateTrendChart
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTrendChart
);

export default router;