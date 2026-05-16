// // import express from "express";
// // import {
// //   approveBeneficiary,
// //   approveActivity,
// //   approveService,
// // } from "../controllers/approvalController.js";

// // import { protect } from "../middleware/authMiddleware.js";
// // import { authorizeRoles } from "../middleware/roleMiddleware.js";

// // const router = express.Router();

// // // admin only
// // router.put("/beneficiary/:id", protect, authorizeRoles("admin"), approveBeneficiary);
// // router.put("/activity/:id", protect, authorizeRoles("admin"), approveActivity);
// // router.put("/service/:id", protect, authorizeRoles("admin"), approveService);

// // export default router;

// import express from "express";
// import {
//   approveBeneficiary,
//   rejectBeneficiary,
//   approveActivity,
//   rejectActivity,
//   getPending,
// } from "../controllers/approvalController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { isAdmin } from "../middleware/adminMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.get("/", protect, isAdmin, getPending);

// // router.put("/beneficiary/:id/approve", protect, isAdmin, approveBeneficiary);
// // router.put("/beneficiary/:id/reject", protect, isAdmin, rejectBeneficiary);
// router.put("/beneficiary/:id/approve", protect, authorizeRoles("admin", "manager"), approveBeneficiary);
// router.put("/beneficiary/:id/reject", protect, authorizeRoles("admin", "manager"), rejectBeneficiary);

// router.put("/activity/:id/approve", protect, authorizeRoles("admin", "manager"), approveActivity);
// router.put("/activity/:id/reject", protect, authorizeRoles("admin", "manager"), rejectActivity);


// export default router;


import express from "express";

import {
  createApproval,
  getApprovals,
  getApprovalById,
  updateApproval,
  deleteApproval,
} from "../controllers/approvalController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create approval request
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  createApproval
);

// get all approvals
router.get("/", protect, getApprovals);

// get single approval
router.get("/:id", protect, getApprovalById);

// review / approve / reject
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateApproval
);

// delete
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteApproval
);

export default router;