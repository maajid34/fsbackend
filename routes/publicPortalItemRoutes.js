import express from "express";

import {
  createPublicPortalItem,
  getPublicPortalItems,
  getPublishedPortalItems,
  updatePublicPortalItem,
  deletePublicPortalItem,
} from "../controllers/publicPortalItemController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// public route
router.get("/published", getPublishedPortalItems);

// protected admin routes
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createPublicPortalItem
);

router.get("/", protect, getPublicPortalItems);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updatePublicPortalItem
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePublicPortalItem
);

export default router;