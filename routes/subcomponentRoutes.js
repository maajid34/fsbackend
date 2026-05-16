import express from "express";

import {
  getSubcomponents,
  createSubcomponent,
  updateSubcomponent,
  deleteSubcomponent,
} from "../controllers/subcomponentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getSubcomponents);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createSubcomponent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateSubcomponent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteSubcomponent
);

export default router;