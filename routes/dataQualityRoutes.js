// // 

// import express from "express";

// import {
//   runDataQualityCheck,
//   getDataQualityChecks,
//   getDataQualityCheckById,
//   deleteDataQualityCheck,
//   getDataQualityDashboard,
// } from "../controllers/dataQualityController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.post(
//   "/run",
//   protect,
//   authorizeRoles("admin", "manager"),
//   runDataQualityCheck
// );

// router.get("/dashboard", protect, getDataQualityDashboard);

// router.get("/", protect, getDataQualityChecks);

// router.get("/:id", protect, getDataQualityCheckById);

// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin"),
//   deleteDataQualityCheck
// );

// export default router;


import express from "express";

import {
  runDataQualityCheck,
  getDataQualityChecks,
  getDataQualityCheckById,
  deleteDataQualityCheck,
  getDataQualityDashboard,
} from "../controllers/dataQualityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/run",
  protect,
  authorizeRoles("admin", "manager"),
  runDataQualityCheck
);

router.get("/dashboard", protect, getDataQualityDashboard);

router.get("/", protect, getDataQualityChecks);

router.get("/:id", protect, getDataQualityCheckById);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteDataQualityCheck
);

export default router;