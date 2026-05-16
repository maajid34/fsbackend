import ReportIndicator from "../models/ReportIndicator.js";

// CREATE
export const createReportIndicator = async (req, res) => {
  try {
    const progress =
      req.body.target_value > 0
        ? (req.body.actual_value / req.body.target_value) * 100
        : 0;

    const variance =
      req.body.actual_value - req.body.target_value;

    const item = await ReportIndicator.create({
      ...req.body,
      variance,
      progress_percent: progress,
      createdBy: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
export const getReportIndicators = async (req, res) => {
  try {
    const items = await ReportIndicator.find()
      .populate("report")
      .populate("indicator")
      .populate("createdBy", "name role");

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
export const updateReportIndicator = async (req, res) => {
  try {
    if (
      req.body.target_value !== undefined &&
      req.body.actual_value !== undefined
    ) {
      req.body.progress_percent =
        req.body.target_value > 0
          ? (req.body.actual_value /
              req.body.target_value) *
            100
          : 0;

      req.body.variance =
        req.body.actual_value -
        req.body.target_value;
    }

    const item =
      await ReportIndicator.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!item) {
      return res.status(404).json({
        message: "Report indicator not found",
      });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
export const deleteReportIndicator = async (
  req,
  res
) => {
  try {
    const item =
      await ReportIndicator.findByIdAndDelete(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        message: "Report indicator not found",
      });
    }

    res.json({
      message:
        "Report indicator deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};