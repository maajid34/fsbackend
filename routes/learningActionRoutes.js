import express from "express";

import {
  createLearningAction,
  getLearningActions,
  updateLearningAction,
  deleteLearningAction,
} from "../controllers/learningActionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createLearningAction
);

// GET
router.get("/", protect, getLearningActions);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateLearningAction
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteLearningAction
);

export default router;