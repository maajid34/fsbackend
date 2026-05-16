import express from "express";

import {
  getCommunities,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../controllers/communityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getCommunities);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createCommunity
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateCommunity
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCommunity
);

export default router;