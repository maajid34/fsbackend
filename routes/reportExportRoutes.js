import express from "express";

import {
  exportQuarterlyReportPDF,
  exportQuarterlyReportExcel,
} from "../controllers/reportExportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/quarterly-report/pdf", protect, exportQuarterlyReportPDF);
router.get("/quarterly-report/excel", protect, exportQuarterlyReportExcel);

export default router;