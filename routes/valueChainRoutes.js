import express from "express";

import {
  getValueChains,
  createValueChain,
  updateValueChain,
  deleteValueChain,
} from "../controllers/valueChainController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getValueChains);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  createValueChain
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  updateValueChain
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteValueChain
);

export default router;