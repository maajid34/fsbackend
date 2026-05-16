// import express from "express";
// import { registerUser,loginUser  } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;
import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// USERS MANAGEMENT
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.put(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

export default router;