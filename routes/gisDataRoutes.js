import express from "express";

import {
  createGISData,
  getGISData,
  updateGISData,
  deleteGISData,
} from "../controllers/gisDataController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createGISData
);

// GET
router.get("/", protect, getGISData);

// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateGISData
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteGISData
);

export default router;