import express from "express";

import {
  createIndicatorTarget,
  getIndicatorTargets,
  getIndicatorTargetById,
  updateIndicatorTarget,
  deleteIndicatorTarget,
} from "../controllers/indicatorTargetController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createIndicatorTarget
);

router.get("/", protect, getIndicatorTargets);
router.get("/:id", protect, getIndicatorTargetById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateIndicatorTarget
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteIndicatorTarget
);

export default router;