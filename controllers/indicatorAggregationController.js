import {
  updateAutoIndicatorResult,
  updateAllAutoIndicatorResults,
} from "../utils/indicatorAggregationEngine.js";

export const runSingleIndicatorAggregation = async (req, res) => {
  try {
    const { indicatorId, year, quarter } = req.body;

    if (!indicatorId || !year || !quarter) {
      return res.status(400).json({
        message: "indicatorId, year and quarter are required",
      });
    }

    const result = await updateAutoIndicatorResult({
      indicatorId,
      year,
      quarter,
      userId: req.user._id,
    });

    res.json({
      message: "Indicator aggregation completed",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const runAllIndicatorAggregations = async (req, res) => {
  try {
    const { year, quarter } = req.body;

    if (!year || !quarter) {
      return res.status(400).json({
        message: "year and quarter are required",
      });
    }

    const results = await updateAllAutoIndicatorResults({
      year,
      quarter,
      userId: req.user._id,
    });

    res.json({
      message: "All indicator aggregations completed",
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};