import express from "express";

import {
  createKpiCard,
  getKpiCards,
  getKpiCardById,
  updateKpiCard,
  deleteKpiCard,
} from "../controllers/kpiCardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createKpiCard
);

router.get("/", protect, getKpiCards);
router.get("/:id", protect, getKpiCardById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateKpiCard
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteKpiCard
);

export default router;