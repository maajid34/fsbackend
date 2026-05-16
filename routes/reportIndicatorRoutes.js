import express from "express";

import {
  createReportIndicator,
  getReportIndicators,
  updateReportIndicator,
  deleteReportIndicator,
} from "../controllers/reportIndicatorController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createReportIndicator
);

// GET
router.get("/", protect, getReportIndicators);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateReportIndicator
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteReportIndicator
);

export default router;