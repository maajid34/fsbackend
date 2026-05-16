// // import express from "express";
// // import {
// //   createIndicator,
// //   getIndicators,
// //   updateProgress,
// // } from "../controllers/indicatorController.js";

// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // router.post("/", protect, createIndicator);
// // router.get("/", protect, getIndicators);
// // router.put("/:id", protect, updateProgress);

// // export default router;

// import express from "express";
// import {
//   createIndicator,
//   getIndicators,
//   updateIndicator,getPerformance,getIndicatorProgress,
// } from "../controllers/indicatorController.js";

// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, createIndicator);
// router.get("/", protect, getIndicators);
// router.put("/:id", protect, updateIndicator);
// router.get("/performance", protect, getPerformance);
// router.get("/progress", protect, getIndicatorProgress);

// export default router;

import express from "express";

import {
  createIndicator,
  getIndicators,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,getIndicatorPerformance,
} from "../controllers/indicatorController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create
router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "manager",
    "data_entry"
  ),
  createIndicator
);

// get all
router.get("/", protect, getIndicators);

router.get("/performance/summary", protect, getIndicatorPerformance);

// get single
router.get("/:id", protect, getIndicatorById);

// update
router.put(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  updateIndicator
);

// delete
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteIndicator
);


export default router;