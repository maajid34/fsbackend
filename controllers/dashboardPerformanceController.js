import KpiCard from "../models/KpiCard.js";
import ProgressBar from "../models/ProgressBar.js";
import TrendChart from "../models/TrendChart.js";
import IndicatorTarget from "../models/IndicatorTarget.js";
import IndicatorResult from "../models/IndicatorResult.js";

export const getDashboardPerformance = async (req, res) => {
  try {
    const { year, quarter } = req.query;

    const filterYear = year ? Number(year) : new Date().getFullYear();
    const filterQuarter = quarter || "Q1";

    const [kpiCards, progressBars, trendCharts, targets] = await Promise.all([
      KpiCard.find({ year: filterYear, period: filterQuarter })
        .populate("indicator", "code name unit_of_measure"),

      ProgressBar.find({ year: filterYear, period: filterQuarter })
        .populate("indicator", "code name unit_of_measure"),

      TrendChart.find({ year: filterYear })
        .populate("indicator", "code name unit_of_measure")
        .sort({ period_label: 1 }),

      IndicatorTarget.find({
        target_year: filterYear,
        target_quarter: filterQuarter,
        status: "active",
      }).populate("indicator", "code name indicator_type unit_of_measure"),
    ]);

    const indicatorPerformance = await Promise.all(
      targets.map(async (target) => {
        const results = await IndicatorResult.find({
          indicator: target.indicator._id,
          period_year: filterYear,
          period_quarter: filterQuarter,
        });

        const actual = results.reduce(
          (sum, result) => sum + result.result_value,
          0
        );

        const progress =
          target.target_value > 0
            ? (actual / target.target_value) * 100
            : 0;

        const variance = actual - target.target_value;

        let status = "on_track";

        if (progress < 50) status = "off_track";
        else if (progress < 80) status = "at_risk";

        return {
          indicator_id: target.indicator._id,
          code: target.indicator.code,
          name: target.indicator.name,
          indicator_type: target.indicator.indicator_type,
          unit_of_measure: target.indicator.unit_of_measure,
          target: target.target_value,
          actual,
          progress: Number(progress.toFixed(1)),
          variance,
          status,
        };
      })
    );

    res.json({
      year: filterYear,
      quarter: filterQuarter,
      kpiCards,
      progressBars,
      trendCharts,
      indicatorPerformance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};