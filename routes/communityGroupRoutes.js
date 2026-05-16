import express from "express";

import {
  getCommunityGroups,
  createCommunityGroup,
  updateCommunityGroup,
  deleteCommunityGroup,
} from "../controllers/communityGroupController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getCommunityGroups);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createCommunityGroup
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateCommunityGroup
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCommunityGroup
);

export default router;