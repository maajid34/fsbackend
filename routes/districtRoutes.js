import express from "express";
import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districtController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDistrict);
router.get("/", protect, getDistricts);
router.get("/:id", protect, getDistrictById);
router.put("/:id", protect, updateDistrict);
router.delete("/:id", protect, deleteDistrict);

export default router;