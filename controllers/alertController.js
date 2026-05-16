import IndicatorResult from "../models/IndicatorResult.js";
import Activity from "../models/Activity.js";
import Approval from "../models/Approval.js";
import Service from "../models/Service.js";

export const getSystemAlerts = async (req, res) => {
  try {
    const year = Number(req.query.year || new Date().getFullYear());
    const quarter = req.query.quarter || "Q1";

    const alerts = [];

    const offTrackResults = await IndicatorResult.find({
      period_year: year,
      period_quarter: quarter,
      performance_status: "off_track",
    }).populate("indicator", "code name");

    offTrackResults.forEach((item) => {
      alerts.push({
        type: "indicator",
        severity: "high",
        title: "Off-track indicator",
        message: `${item.indicator?.code} - ${item.indicator?.name} is off-track at ${item.achievement_percentage || 0}% achievement.`,
        module: "Indicator Results",
        status: "open",
        reference_id: item._id,
      });
    });

    const atRiskResults = await IndicatorResult.find({
      period_year: year,
      period_quarter: quarter,
      performance_status: "at_risk",
    }).populate("indicator", "code name");

    atRiskResults.forEach((item) => {
      alerts.push({
        type: "indicator",
        severity: "medium",
        title: "At-risk indicator",
        message: `${item.indicator?.code} - ${item.indicator?.name} is at risk at ${item.achievement_percentage || 0}% achievement.`,
        module: "Indicator Results",
        status: "open",
        reference_id: item._id,
      });
    });

    const delayedActivities = await Activity.find({
      status: { $ne: "completed" },
      end_date: { $lt: new Date() },
    });

    delayedActivities.forEach((item) => {
      alerts.push({
        type: "activity",
        severity: "high",
        title: "Delayed activity",
        message: `${item.title} passed its end date and is still ${item.status}.`,
        module: "Activities",
        status: "open",
        reference_id: item._id,
      });
    });

    const pendingApprovals = await Approval.find({
      approval_status: "pending",
    }).limit(20);

    pendingApprovals.forEach((item) => {
      alerts.push({
        type: "approval",
        severity: "medium",
        title: "Pending approval",
        message: `${item.module_type} record is waiting for approval.`,
        module: "Approvals",
        status: "open",
        reference_id: item._id,
      });
    });

    const servicesWithoutBeneficiaries = await Service.find({
      $or: [{ beneficiaries: { $size: 0 } }, { beneficiaries: { $exists: false } }],
    }).limit(20);

    servicesWithoutBeneficiaries.forEach((item) => {
      alerts.push({
        type: "service",
        severity: "low",
        title: "Service without beneficiaries",
        message: `${item.service_type} has quantity ${item.quantity}, but no beneficiaries are linked.`,
        module: "Services",
        status: "open",
        reference_id: item._id,
      });
    });

    const summary = {
      total: alerts.length,
      high: alerts.filter((a) => a.severity === "high").length,
      medium: alerts.filter((a) => a.severity === "medium").length,
      low: alerts.filter((a) => a.severity === "low").length,
      indicators: alerts.filter((a) => a.type === "indicator").length,
      activities: alerts.filter((a) => a.type === "activity").length,
      approvals: alerts.filter((a) => a.type === "approval").length,
      services: alerts.filter((a) => a.type === "service").length,
    };

    res.json({
      year,
      quarter,
      summary,
      alerts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};