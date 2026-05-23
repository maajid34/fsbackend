export const uploadEvidenceFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileUrl = `${process.env.R2_PUBLIC_URL}/${req.file.key}`;

    res.status(201).json({
      message: "File uploaded successfully",
      file: {
        original_name: req.file.originalname,
        file_name: req.file.key,
        file_url: fileUrl,
        mime_type: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};