import KpiCard from "../models/KpiCard.js";
import Indicator from "../models/Indicator.js";

// CREATE KPI CARD
export const createKpiCard = async (req, res) => {
  try {
    const {
      indicator,
      title,
      aggregation_type,
      target_value,
      actual_value,
      period,
      year,
      status,
    } = req.body;

    if (!indicator || !title || !period || !year) {
      return res.status(400).json({
        message: "Indicator, title, period and year are required",
      });
    }

    const indicatorExists = await Indicator.findById(indicator);

    if (!indicatorExists) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    const kpi = await KpiCard.create({
      indicator,
      title,
      aggregation_type,
      target_value,
      actual_value,
      period,
      year,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(kpi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL KPI CARDS
export const getKpiCards = async (req, res) => {
  try {
    const kpis = await KpiCard.find()
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(kpis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE KPI CARD
export const getKpiCardById = async (req, res) => {
  try {
    const kpi = await KpiCard.findById(req.params.id)
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!kpi) {
      return res.status(404).json({
        message: "KPI card not found",
      });
    }

    res.json(kpi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE KPI CARD
export const updateKpiCard = async (req, res) => {
  try {
    if (req.body.indicator) {
      const indicatorExists = await Indicator.findById(req.body.indicator);

      if (!indicatorExists) {
        return res.status(404).json({
          message: "Indicator not found",
        });
      }
    }

    const kpi = await KpiCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!kpi) {
      return res.status(404).json({
        message: "KPI card not found",
      });
    }

    res.json(kpi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE KPI CARD
export const deleteKpiCard = async (req, res) => {
  try {
    const kpi = await KpiCard.findByIdAndDelete(req.params.id);

    if (!kpi) {
      return res.status(404).json({
        message: "KPI card not found",
      });
    }

    res.json({
      message: "KPI card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};