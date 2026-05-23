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