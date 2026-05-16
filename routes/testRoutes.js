import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// anyone logged in
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user,
  });
});

// admin only
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

export default router;