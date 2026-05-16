import ProgressBar from "../models/ProgressBar.js";
import Indicator from "../models/Indicator.js";

// CREATE
export const createProgressBar = async (req, res) => {
  try {
    const {
      indicator,
      period,
      year,
      baseline,
      target,
      actual,
    } = req.body;

    if (!indicator || !period || !year || !target) {
      return res.status(400).json({
        message: "Indicator, period, year and target are required",
      });
    }

    const indicatorExists = await Indicator.findById(indicator);

    if (!indicatorExists) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    const progress_percent =
      target > 0 ? ((actual || 0) / target) * 100 : 0;

    let status = "on_track";

    if (progress_percent < 50) {
      status = "off_track";
    } else if (progress_percent < 80) {
      status = "at_risk";
    }

    const progressBar = await ProgressBar.create({
      indicator,
      period,
      year,
      baseline,
      target,
      actual,
      progress_percent,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(progressBar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getProgressBars = async (req, res) => {
  try {
    const progressBars = await ProgressBar.find()
      .populate("indicator", "code name")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(progressBars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
export const getProgressBarById = async (req, res) => {
  try {
    const progressBar = await ProgressBar.findById(req.params.id)
      .populate("indicator", "code name")
      .populate("createdBy", "name role");

    if (!progressBar) {
      return res.status(404).json({
        message: "Progress bar not found",
      });
    }

    res.json(progressBar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateProgressBar = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.target && data.actual !== undefined) {
      data.progress_percent =
        data.target > 0
          ? (data.actual / data.target) * 100
          : 0;

      if (data.progress_percent < 50) {
        data.status = "off_track";
      } else if (data.progress_percent < 80) {
        data.status = "at_risk";
      } else {
        data.status = "on_track";
      }
    }

    const progressBar = await ProgressBar.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    )
      .populate("indicator", "code name")
      .populate("createdBy", "name role");

    if (!progressBar) {
      return res.status(404).json({
        message: "Progress bar not found",
      });
    }

    res.json(progressBar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteProgressBar = async (req, res) => {
  try {
    const progressBar = await ProgressBar.findByIdAndDelete(
      req.params.id
    );

    if (!progressBar) {
      return res.status(404).json({
        message: "Progress bar not found",
      });
    }

    res.json({
      message: "Progress bar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};