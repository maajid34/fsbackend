import express from "express";

import {
  createResultDisaggregation,
  getResultDisaggregations,
  getResultDisaggregationById,
  updateResultDisaggregation,
  deleteResultDisaggregation,
} from "../controllers/resultDisaggregationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createResultDisaggregation
);

router.get("/", protect, getResultDisaggregations);
router.get("/:id", protect, getResultDisaggregationById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateResultDisaggregation
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteResultDisaggregation
);

export default router;