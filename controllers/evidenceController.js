import Evidence from "../models/Evidence.js";

export const getEvidenceFiles = async (req, res) => {
  try {
    const { module, related_id } = req.query;

    const filter = {};

    if (module) filter.module = module;
    if (related_id) filter.related_id = related_id;

    const files = await Evidence.find(filter)
      .populate("uploaded_by", "name email role")
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvidenceFileById = async (req, res) => {
  try {
    const file = await Evidence.findById(req.params.id).populate(
      "uploaded_by",
      "name email role"
    );

    if (!file) {
      return res.status(404).json({
        message: "Evidence file not found",
      });
    }

    res.json(file);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const downloadEvidenceFile = async (req, res) => {
  try {
    const file = await Evidence.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "Evidence file not found",
      });
    }

    const response = await fetch(file.file_url);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to download evidence file",
      });
    }

    const contentType =
      response.headers.get("content-type") ||
      file.mime_type ||
      "application/octet-stream";
    const safeName = (file.original_name || file.file_name || "evidence-file")
      .replace(/[\r\n"]/g, "")
      .trim();

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeName}"`
    );

    if (file.size) {
      res.setHeader("Content-Length", file.size);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvidenceFile = async (req, res) => {
  try {
    const file = await Evidence.findByIdAndDelete(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "Evidence file not found",
      });
    }

    res.json({
      message: "Evidence file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
