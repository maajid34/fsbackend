import IndicatorResult from "../models/IndicatorResult.js";
import ResultDisaggregation from "../models/ResultDisaggregation.js";

export const generateQuarterlyReport = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const quarter = req.query.quarter;

    if (!year || !quarter) {
      return res.status(400).json({
        message: "Year and quarter are required",
      });
    }

    const results = await IndicatorResult.find({
      period_year: year,
      period_quarter: quarter,
    })
      .populate(
        "indicator",
        "code name component result_level unit_of_measure"
      )
      .sort({ achievement_percentage: -1 });

    const disaggregations = await ResultDisaggregation.find()
      .populate({
        path: "indicator_result",
        match: {
          period_year: year,
          period_quarter: quarter,
        },
        populate: {
          path: "indicator",
          select: "code name",
        },
      });

    const validDisaggregations = disaggregations.filter(
      (d) => d.indicator_result
    );

    // summary
    const totalIndicators = results.length;

    const onTrack = results.filter(
      (r) => r.performance_status === "on_track"
    ).length;

    const atRisk = results.filter(
      (r) => r.performance_status === "at_risk"
    ).length;

    const offTrack = results.filter(
      (r) => r.performance_status === "off_track"
    ).length;

    // average performance
    let avgPerformance = 0;

    if (results.length > 0) {
      const total = results.reduce(
        (sum, item) => sum + Number(item.achievement_percentage || 0),
        0
      );

      avgPerformance = Number((total / results.length).toFixed(1));
    }

    // component performance
    const componentMap = {};

    results.forEach((item) => {
      const component =
        item.indicator?.component || "Unassigned";

      if (!componentMap[component]) {
        componentMap[component] = {
          component,
          indicators: 0,
          totalAchievement: 0,
        };
      }

      componentMap[component].indicators += 1;

      componentMap[component].totalAchievement += Number(
        item.achievement_percentage || 0
      );
    });

    const componentPerformance = Object.values(componentMap).map(
      (item) => ({
        component: item.component,

        indicators: item.indicators,

        averageAchievement: Number(
          (
            item.totalAchievement / item.indicators
          ).toFixed(1)
        ),
      })
    );

    // gender
    const maleTotal = validDisaggregations
      .filter(
        (d) =>
          d.disaggregation_type === "gender" &&
          d.disaggregation_value === "male"
      )
      .reduce(
        (sum, item) => sum + Number(item.result_value || 0),
        0
      );

    const femaleTotal = validDisaggregations
      .filter(
        (d) =>
          d.disaggregation_type === "gender" &&
          d.disaggregation_value === "female"
      )
      .reduce(
        (sum, item) => sum + Number(item.result_value || 0),
        0
      );

    // top indicators
    const topIndicators = results
      .sort(
        (a, b) =>
          b.achievement_percentage -
          a.achievement_percentage
      )
      .slice(0, 10)
      .map((item) => ({
        code: item.indicator?.code,

        name: item.indicator?.name,

        target: item.target_value,

        actual: item.result_value,

        achievement:
          item.achievement_percentage,

        variance: item.variance,

        status: item.performance_status,
      }));

    // off track indicators
    const offTrackIndicators = results
      .filter(
        (item) =>
          item.performance_status === "off_track"
      )
      .map((item) => ({
        code: item.indicator?.code,

        name: item.indicator?.name,

        achievement:
          item.achievement_percentage,
      }));

    res.json({
      reporting_period: `${year} ${quarter}`,

      summary: {
        totalIndicators,
        onTrack,
        atRisk,
        offTrack,
        averagePerformance: avgPerformance,
      },

      genderSummary: {
        male: maleTotal,
        female: femaleTotal,
      },

      componentPerformance,

      topIndicators,

      offTrackIndicators,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};