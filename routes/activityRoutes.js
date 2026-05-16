// // import express from "express";
// // import {
// //   createActivity,
// //   getActivities,deleteActivity,updateActivity
// // } from "../controllers/activityController.js";

// // import { protect } from "../middleware/authMiddleware.js";
// // import { upload } from "../middleware/upload.js";



// // const router = express.Router();

// // // router.post("/", protect, createActivity);
// // router.post("/", protect, upload.single("file"), createActivity);
// // router.get("/", protect, getActivities);
// // router.put("/:id", protect, updateActivity);
// // router.delete("/:id", protect, deleteActivity);

// // export default router;

// import express from "express";
// import multer from "multer";
// import {
//   createActivity,
//   getActivities,
//   updateActivity,
//   deleteActivity,
// } from "../controllers/activityController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // router.post("/", protect, upload.single("file"), createActivity);
// // router.put("/:id", protect, upload.single("file"), updateActivity);
// // router.get("/", protect, getActivities);
// // router.delete("/:id", protect, deleteActivity);


// // create/edit → data_entry, manager, admin
// router.post("/", protect, authorizeRoles("admin", "manager", "data_entry"), upload.single("file"), createActivity);

// router.put("/:id", protect, authorizeRoles("admin", "manager", "data_entry"), upload.single("file"), updateActivity);

// // delete → admin only
// router.delete("/:id", protect, authorizeRoles("admin"), deleteActivity);

// // view → all
// router.get("/", protect, getActivities);

// export default router;


import express from "express";
import multer from "multer";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// create → admin, manager, data_entry
router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  upload.single("file"),
  createActivity
);

// view all → all logged users
router.get("/", protect, getActivities);

// view single → all logged users
router.get("/:id", protect, getActivityById);

// edit → admin, manager, data_entry
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager", "data_entry"),
  upload.single("file"),
  updateActivity
);

// delete → admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteActivity);

export default router;