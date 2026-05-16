import express from "express";

import {
  createQuarterlyDQA,
  getQuarterlyDQAs,
  getQuarterlyDQAById,
  updateQuarterlyDQA,
  deleteQuarterlyDQA,
} from "../controllers/quarterlyDQAController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createQuarterlyDQA
);

// get all
router.get("/", protect, getQuarterlyDQAs);

// get single
router.get("/:id", protect, getQuarterlyDQAById);

// update
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateQuarterlyDQA
);

// delete
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteQuarterlyDQA
);

export default router;