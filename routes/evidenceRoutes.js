import express from "express";
import {
  getEvidenceFiles,
  getEvidenceCounts,
  getEvidenceFileById,
  downloadEvidenceFile,
  deleteEvidenceFile,
} from "../controllers/evidenceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEvidenceFiles);

router.get("/counts", protect, getEvidenceCounts);

router.get("/:id/download", protect, downloadEvidenceFile);

router.get("/:id", protect, getEvidenceFileById);

router.delete("/:id", protect, deleteEvidenceFile);

export default router;
