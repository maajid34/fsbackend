import express from "express";
import AuditLog from "../models/AuditLog.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET logs
router.get("/", protect, isAdmin, async (req, res) => {
  const logs = await AuditLog.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(logs);
});

export default router;