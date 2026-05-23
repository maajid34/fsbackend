import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadEvidenceFile } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/evidence",
  protect,
  upload.single("file"),
  uploadEvidenceFile
);

export default router;