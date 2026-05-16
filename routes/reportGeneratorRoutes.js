import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  generateQuarterlyReport,
} from "../controllers/reportGeneratorController.js";

const router = express.Router();

router.get(
  "/quarterly-report",
  protect,
  generateQuarterlyReport
);

export default router;