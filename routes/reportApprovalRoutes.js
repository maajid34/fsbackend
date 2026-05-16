import express from "express";

import {
  createReportApproval,
  getReportApprovals,
  updateReportApproval,
} from "../controllers/reportApprovalController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createReportApproval
);

router.get(
  "/",
  protect,
  getReportApprovals
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateReportApproval
);

export default router;