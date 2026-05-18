import express from "express";

import {
  createExpenditure,
  getExpenditures,
  getExpenditureById,
  updateExpenditure,
  deleteExpenditure,
  getBudgetUtilization,
} from "../controllers/expenditureController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/utilization",
  protect,
  getBudgetUtilization
);

router
  .route("/")
  .post(
    protect,
    authorizeRoles("admin", "manager", "data_entry"),
    createExpenditure
  )
  .get(protect, getExpenditures);

router
  .route("/:id")
  .get(protect, getExpenditureById)
  .put(
    protect,
    authorizeRoles("admin", "manager"),
    updateExpenditure
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteExpenditure
  );

export default router;