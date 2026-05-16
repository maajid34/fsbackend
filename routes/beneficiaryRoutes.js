// import express from "express";
// import {
//   createBeneficiary,
//   getBeneficiaries,
//   getSingleBeneficiary,
//   deleteBeneficiary,
//   updateBeneficiary
// } from "../controllers/beneficiaryController.js";

// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, createBeneficiary);
// router.get("/", protect, getBeneficiaries);
// router.get("/:id", protect, getSingleBeneficiary);
// router.delete("/:id", protect, deleteBeneficiary);

// router.put("/:id", protect, updateBeneficiary);

// export default router;


// new

// import express from "express";
// import {
//   createBeneficiary,
//   getBeneficiaries,
//   getBeneficiaryById,
//   updateBeneficiary,
//   deleteBeneficiary,
// } from "../controllers/beneficiaryController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { hasPermission } from "../middleware/permissionMiddleware.js";

// const router = express.Router();

// router.post("/", protect,hasPermission("beneficiaries", "create"), createBeneficiary);
// router.get("/", protect, getBeneficiaries);
// router.get("/:id", protect, getBeneficiaryById);
// router.put("/:id", protect, updateBeneficiary);
// router.delete("/:id", protect, deleteBeneficiary);

// export default router;


import express from "express";

import {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
} from "../controllers/beneficiaryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { hasPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  hasPermission("beneficiaries", "create"),
  createBeneficiary
);

router.get(
  "/",
  protect,
  hasPermission("beneficiaries", "read"),
  getBeneficiaries
);

router.get(
  "/:id",
  protect,
  hasPermission("beneficiaries", "read"),
  getBeneficiaryById
);

router.put(
  "/:id",
  protect,
  hasPermission("beneficiaries", "update"),
  updateBeneficiary
);

router.delete(
  "/:id",
  protect,
  hasPermission("beneficiaries", "delete"),
  deleteBeneficiary
);

export default router;