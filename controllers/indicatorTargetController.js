import IndicatorTarget from "../models/IndicatorTarget.js";
import Indicator from "../models/Indicator.js";

// CREATE TARGET
export const createIndicatorTarget = async (req, res) => {
  try {
    const {
      indicator,
      target_year,
      target_quarter,
      target_value,
      disaggregation_value,
      status,
    } = req.body;

    if (!indicator || !target_year || !target_quarter || target_value === undefined) {
      return res.status(400).json({
        message: "Indicator, target year, target quarter and target value are required",
      });
    }

    const indicatorExists = await Indicator.findById(indicator);

    if (!indicatorExists) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    const target = await IndicatorTarget.create({
      indicator,
      target_year,
      target_quarter,
      target_value,
      disaggregation_value,
      status,
      createdBy: req.user._id,
    });

    

    res.status(201).json(target);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TARGETS
export const getIndicatorTargets = async (req, res) => {
  try {
    const targets = await IndicatorTarget.find()
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(targets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TARGET
export const getIndicatorTargetById = async (req, res) => {
  try {
    const target = await IndicatorTarget.findById(req.params.id)
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!target) {
      return res.status(404).json({
        message: "Indicator target not found",
      });
    }

    res.json(target);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TARGET
export const updateIndicatorTarget = async (req, res) => {
  try {
    if (req.body.indicator) {
      const indicatorExists = await Indicator.findById(req.body.indicator);

      if (!indicatorExists) {
        return res.status(404).json({
          message: "Indicator not found",
        });
      }
    }

    const target = await IndicatorTarget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("indicator", "code name indicator_type unit_of_measure")
      .populate("createdBy", "name role");

    if (!target) {
      return res.status(404).json({
        message: "Indicator target not found",
      });
    }

    res.json(target);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TARGET
export const deleteIndicatorTarget = async (req, res) => {
  try {
    const target = await IndicatorTarget.findByIdAndDelete(req.params.id);

    if (!target) {
      return res.status(404).json({
        message: "Indicator target not found",
      });
    }

    res.json({
      message: "Indicator target deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};