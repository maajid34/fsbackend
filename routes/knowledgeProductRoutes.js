// import express from "express";
// import multer from "multer";

// import {
//   createKnowledgeProduct,
//   getKnowledgeProducts,
//   updateKnowledgeProduct,
//   deleteKnowledgeProduct,
// } from "../controllers/knowledgeProductController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads/knowledge-products/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin", "manager", "data_entry"),
//   upload.single("file"),
//   createKnowledgeProduct
// );

// router.get("/", protect, getKnowledgeProducts);

// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin", "manager"),
//   upload.single("file"),
//   updateKnowledgeProduct
// );

// router.delete(
//   "/:id",
//   protect,
//   authorizeRoles("admin"),
//   deleteKnowledgeProduct
// );

// export default router;


import express from "express";
import multer from "multer";
import fs from "fs";

import {
  createKnowledgeProduct,
  getKnowledgeProducts,
  updateKnowledgeProduct,
  deleteKnowledgeProduct,
} from "../controllers/knowledgeProductController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const uploadPath = "uploads/knowledge-products";

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
  createKnowledgeProduct
);

router.get("/", protect, getKnowledgeProducts);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  upload.single("file"),
  updateKnowledgeProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteKnowledgeProduct
);

export default router;