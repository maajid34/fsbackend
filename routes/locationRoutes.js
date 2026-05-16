import express from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLocation);
router.get("/", protect, getLocations);
router.get("/:id", protect, getLocationById);
router.put("/:id", protect, updateLocation);
router.delete("/:id", protect, deleteLocation);

export default router;