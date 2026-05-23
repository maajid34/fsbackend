import multer from "multer";
import multerS3 from "multer-s3";

import s3 from "../config/r2.js";

const upload = multer({
  storage: multerS3({
    s3,

    bucket: process.env.R2_BUCKET_NAME,

    acl: "public-read",

    contentType: multerS3.AUTO_CONTENT_TYPE,

    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },

    key: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;

      cb(null, `evidence/${uniqueName}`);
    },
  }),

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only images, PDFs and Word documents are allowed"
        )
      );
    }
  },
});

export default upload;