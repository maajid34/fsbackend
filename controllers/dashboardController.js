import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";
import Indicator from "../models/Indicator.js";
import IndicatorResult from "../models/IndicatorResult.js";
import Report from "../models/ReportRegistry.js";
import Complaint from "../models/Complaint.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalBeneficiaries,
      totalActivities,
      totalIndicators,
      totalReports,
      approvedReports,
      totalComplaints,
      onTrack,
      atRisk,
      offTrack,
    ] = await Promise.all([
      Beneficiary.countDocuments(),
      Activity.countDocuments(),
      Indicator.countDocuments(),
      Report.countDocuments(),
      Report.countDocuments({ status: "approved" }),
      Complaint.countDocuments(),
      IndicatorResult.countDocuments({ performance_status: "on_track" }),
      IndicatorResult.countDocuments({ performance_status: "at_risk" }),
      IndicatorResult.countDocuments({ performance_status: "off_track" }),
    ]);

    res.json({
      totalBeneficiaries,
      totalActivities,
      totalIndicators,
      totalReports,
      approvedReports,
      totalComplaints,
      onTrack,
      atRisk,
      offTrack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardPerformance = async (req, res) => {
  try {
    const year = Number(req.query.year || new Date().getFullYear());
    const quarter = req.query.quarter || "Q1";

    const results = await IndicatorResult.find({
      period_year: year,
      period_quarter: quarter,
    })
      .populate("indicator", "code name unit_of_measure component result_level")
      .populate("component", "code name")
      .sort({ achievement_percentage: -1 });

    const indicatorPerformance = results.map((item) => ({
      indicator_id: item.indicator?._id,
      code: item.indicator?.code || "-",
      name: item.indicator?.name || "-",
      unit: item.indicator?.unit_of_measure || "-",
      component:
        item.component?.code ||
        item.indicator?.component ||
        "Not assigned",
      target: Number(item.target_value || 0),
      actual: Number(item.result_value || 0),
      progress: Number(item.achievement_percentage || 0).toFixed(1),
      variance: Number(item.variance || 0),
      status: item.performance_status || "off_track",
    }));

    const kpiCards = results.slice(0, 6).map((item) => ({
      _id: item._id,
      title: `${item.indicator?.code || "-"} - ${item.indicator?.name || "-"}`,
      target_value: item.target_value || 0,
      actual_value: item.result_value || 0,
      progress: item.achievement_percentage || 0,
      variance: item.variance || 0,
      status: item.performance_status || "off_track",
    }));

    const trendResults = await IndicatorResult.find({
      period_year: year,
    })
      .populate("indicator", "code name")
      .sort({ period_quarter: 1 });

    const trendCharts = trendResults.map((item) => ({
      period_label: `${item.period_year} ${item.period_quarter}`,
      value: Number(item.achievement_percentage || 0),
    }));

    const componentMap = {};

    results.forEach((item) => {
      const key =
        item.component?.code ||
        item.indicator?.component ||
        "Not assigned";

      if (!componentMap[key]) {
        componentMap[key] = {
          component: key,
          totalProgress: 0,
          count: 0,
        };
      }

      componentMap[key].totalProgress += Number(
        item.achievement_percentage || 0
      );
      componentMap[key].count += 1;
    });

    const componentPerformance = Object.values(componentMap).map((item) => ({
      component: item.component,
      progress: Number((item.totalProgress / item.count).toFixed(1)),
    }));

    res.json({
      year,
      quarter,
      kpiCards,
      indicatorPerformance,
      trendCharts,
      componentPerformance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};