import express from "express";
import {
  createDataQualityIssue,
  getDataQualityIssues,
  getDataQualityIssueById,
  updateDataQualityIssue,
  deleteDataQualityIssue,
} from "../controllers/dataQualityIssueController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createDataQualityIssue
);

router.get("/", protect, getDataQualityIssues);
router.get("/:id", protect, getDataQualityIssueById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateDataQualityIssue
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteDataQualityIssue
);

export default router;