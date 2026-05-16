import express from "express";

import {
  runSingleIndicatorAggregation,
  runAllIndicatorAggregations,
} from "../controllers/indicatorAggregationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/single",
  protect,
  authorizeRoles("admin", "manager"),
  runSingleIndicatorAggregation
);

router.post(
  "/all",
  protect,
  authorizeRoles("admin", "manager"),
  runAllIndicatorAggregations
);

export default router;