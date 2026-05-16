// import express from "express";
// import { createService, getServices } from "../controllers/serviceController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, createService);
// router.get("/", protect, getServices);

// export default router;

import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create → admin, manager, data_entry
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createService
);

// view all → all logged users
router.get("/", protect, getServices);

// view single → all logged users
router.get("/:id", protect, getServiceById);

// edit → admin, manager, data_entry
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  updateService
);

// delete → admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteService);

export default router;