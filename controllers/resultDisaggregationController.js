import ResultDisaggregation from "../models/ResultDisaggregation.js";
import IndicatorResult from "../models/IndicatorResult.js";

// CREATE DISAGGREGATION
export const createResultDisaggregation = async (req, res) => {
  try {
    const {
      indicator_result,
      disaggregation_type,
      disaggregation_value,
      result_value,
    } = req.body;

    if (
      !indicator_result ||
      !disaggregation_type ||
      !disaggregation_value ||
      result_value === undefined
    ) {
      return res.status(400).json({
        message:
          "Indicator result, disaggregation type, disaggregation value and result value are required",
      });
    }

    const resultExists = await IndicatorResult.findById(indicator_result);

    if (!resultExists) {
      return res.status(404).json({
        message: "Indicator result not found",
      });
    }

    const disaggregation = await ResultDisaggregation.create({
      indicator_result,
      disaggregation_type,
      disaggregation_value,
      result_value,
      createdBy: req.user._id,
    });

    

    res.status(201).json(disaggregation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DISAGGREGATIONS
export const getResultDisaggregations = async (req, res) => {
  try {
    const disaggregations = await ResultDisaggregation.find()
      .populate({
        path: "indicator_result",
        select: "indicator period_year period_quarter result_value",
        populate: {
          path: "indicator",
          select: "code name unit_of_measure",
        },
      })
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(disaggregations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE DISAGGREGATION
export const getResultDisaggregationById = async (req, res) => {
  try {
    const disaggregation = await ResultDisaggregation.findById(req.params.id)
      .populate({
        path: "indicator_result",
        select: "indicator period_year period_quarter result_value",
        populate: {
          path: "indicator",
          select: "code name unit_of_measure",
        },
      })
      .populate("createdBy", "name role");

    if (!disaggregation) {
      return res.status(404).json({
        message: "Result disaggregation not found",
      });
    }

    res.json(disaggregation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE DISAGGREGATION
export const updateResultDisaggregation = async (req, res) => {
  try {
    if (req.body.indicator_result) {
      const resultExists = await IndicatorResult.findById(
        req.body.indicator_result
      );

      if (!resultExists) {
        return res.status(404).json({
          message: "Indicator result not found",
        });
      }
    }

    const disaggregation = await ResultDisaggregation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate({
        path: "indicator_result",
        select: "indicator period_year period_quarter result_value",
        populate: {
          path: "indicator",
          select: "code name unit_of_measure",
        },
      })
      .populate("createdBy", "name role");

    if (!disaggregation) {
      return res.status(404).json({
        message: "Result disaggregation not found",
      });
    }

    res.json(disaggregation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE DISAGGREGATION
export const deleteResultDisaggregation = async (req, res) => {
  try {
    const disaggregation = await ResultDisaggregation.findByIdAndDelete(
      req.params.id
    );

    if (!disaggregation) {
      return res.status(404).json({
        message: "Result disaggregation not found",
      });
    }

    res.json({
      message: "Result disaggregation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};