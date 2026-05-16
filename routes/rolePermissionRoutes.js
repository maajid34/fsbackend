import express from "express";

import {
  createRolePermission,
  getRolePermissions,
  updateRolePermission,
  deleteRolePermission,
} from "../controllers/rolePermissionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createRolePermission
);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  getRolePermissions
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateRolePermission
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteRolePermission
);

export default router;