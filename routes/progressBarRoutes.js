import express from "express";

import {
  createProgressBar,
  getProgressBars,
  getProgressBarById,
  updateProgressBar,
  deleteProgressBar,
} from "../controllers/progressBarController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createProgressBar
);

// GET ALL
router.get("/", protect, getProgressBars);

// GET SINGLE
router.get("/:id", protect, getProgressBarById);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateProgressBar
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProgressBar
);

export default router;