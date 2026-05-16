// import express from "express";

// import {
//   createReportRegistry,
//   getReportRegistries,
//   getReportRegistryById,
//   updateReportRegistry,
//   deleteReportRegistry,
// } from "../controllers/reportRegistryController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin", "manager", "data_entry"),
//   createReportRegistry
// );

// router.get("/", protect, getReportRegistries);
// router.get("/:id", protect, getReportRegistryById);

// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   updateReportRegistry
// );

// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin"),
//   deleteReportRegistry
// );

// export default router;

import express from "express";
import multer from "multer";
import fs from "fs";

import {
  createReportRegistry,
  getReportRegistries,
  getReportRegistryById,
  updateReportRegistry,
  deleteReportRegistry,
} from "../controllers/reportRegistryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const uploadPath = "uploads/reports";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  upload.single("file"),
  createReportRegistry
);

router.get("/", protect, getReportRegistries);
router.get("/:id", protect, getReportRegistryById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("file"),
  updateReportRegistry
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteReportRegistry
);

export default router;