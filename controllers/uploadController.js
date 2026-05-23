


// import Evidence from "../models/Evidence.js";

// export const uploadEvidenceFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     const fileUrl = `${process.env.R2_PUBLIC_URL}/${req.file.key}`;

//     // save into mongodb
//     const evidence = await Evidence.create({
//       original_name: req.file.originalname,
//       file_name: req.file.key,
//       file_url: fileUrl,
//       mime_type: req.file.mimetype,
//       size: req.file.size,
//       uploaded_by: req.user?._id || null,
//     });

//     res.status(201).json({
//       message: "File uploaded successfully",
//       file: evidence,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


import Evidence from "../models/Evidence.js";

export const uploadEvidenceFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileUrl = `${process.env.R2_PUBLIC_URL}/${req.file.key}`;

    const evidence = await Evidence.create({
      original_name: req.file.originalname,
      file_name: req.file.key,
      file_url: fileUrl,
      mime_type: req.file.mimetype,
      size: req.file.size,
      module: req.body.module || "general",
      related_id: req.body.related_id || null,
      uploaded_by: req.user?._id || null,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: evidence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};