// import express from "express";
// import {
//   createComplaint,
//   getComplaints,
// } from "../controllers/complaintController.js";

// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, createComplaint);
// router.get("/", protect, getComplaints);

// export default router;


import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create → admin, manager, data_entry
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createComplaint
);

// view all → all logged users
router.get("/", protect, getComplaints);

// view single → all logged users
router.get("/:id", protect, getComplaintById);

// edit → admin, manager, data_entry
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  updateComplaint
);

// delete → admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteComplaint);

export default router;