import express from "express";

import {
  createIndicatorResult,
  getIndicatorResults,
  getIndicatorResultById,
  updateIndicatorResult,
  deleteIndicatorResult,
} from "../controllers/indicatorResultController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createIndicatorResult
);

router.get("/", protect, getIndicatorResults);
router.get("/:id", protect, getIndicatorResultById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateIndicatorResult
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteIndicatorResult
);

export default router;