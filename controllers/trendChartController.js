import TrendChart from "../models/TrendChart.js";
import Indicator from "../models/Indicator.js";

// CREATE TREND
export const createTrendChart = async (req, res) => {
  try {
    const {
      indicator,
      period_type,
      period_label,
      year,
      value,
      disaggregation_value,
    } = req.body;

    if (!indicator || !period_type || !period_label || !year || value === undefined) {
      return res.status(400).json({
        message: "Indicator, period type, period label, year and value are required",
      });
    }

    const indicatorExists = await Indicator.findById(indicator);

    if (!indicatorExists) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    const trend = await TrendChart.create({
      indicator,
      period_type,
      period_label,
      year,
      value,
      disaggregation_value,
      createdBy: req.user._id,
    });

    res.status(201).json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TRENDS
export const getTrendCharts = async (req, res) => {
  try {
    const trends = await TrendChart.find()
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role")
      .sort({ year: 1, period_label: 1 });

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TREND
export const getTrendChartById = async (req, res) => {
  try {
    const trend = await TrendChart.findById(req.params.id)
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!trend) {
      return res.status(404).json({
        message: "Trend chart not found",
      });
    }

    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TREND
export const updateTrendChart = async (req, res) => {
  try {
    if (req.body.indicator) {
      const indicatorExists = await Indicator.findById(req.body.indicator);

      if (!indicatorExists) {
        return res.status(404).json({
          message: "Indicator not found",
        });
      }
    }

    const trend = await TrendChart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!trend) {
      return res.status(404).json({
        message: "Trend chart not found",
      });
    }

    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TREND
export const deleteTrendChart = async (req, res) => {
  try {
    const trend = await TrendChart.findByIdAndDelete(req.params.id);

    if (!trend) {
      return res.status(404).json({
        message: "Trend chart not found",
      });
    }

    res.json({
      message: "Trend chart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};