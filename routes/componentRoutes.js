import express from "express";

import {
  getComponents,
  createComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/componentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getComponents);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createComponent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateComponent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteComponent
);

export default router;