import express from "express";

import {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} from "../controllers/permissionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createPermission);
router.get("/", protect, authorizeRoles("admin", "manager"), getPermissions);
router.put("/:id", protect, authorizeRoles("admin"), updatePermission);
router.delete("/:id", protect, authorizeRoles("admin"), deletePermission);

export default router;