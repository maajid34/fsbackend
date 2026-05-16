import express from "express";

import {
  createWorkplan,
  getWorkplans,
  getWorkplanById,
  updateWorkplan,
  deleteWorkplan,
} from "../controllers/workplanController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createWorkplan)
  .get(protect, getWorkplans);

router
  .route("/:id")
  .get(protect, getWorkplanById)
  .put(protect, updateWorkplan)
  .delete(protect, deleteWorkplan);

export default router;