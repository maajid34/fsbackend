import Workplan from "../models/Workplan.js";
import Activity from "../models/Activity.js";
import Service from "../models/Service.js";
import Beneficiary from "../models/Beneficiary.js";
import IndicatorResult from "../models/IndicatorResult.js";

export const getAdvancedDashboardAnalytics = async (req, res) => {
  try {
    const workplans = await Workplan.find().populate("component", "code name");
    const activities = await Activity.find().populate("component", "code name");
    const services = await Service.find();
    const beneficiaries = await Beneficiary.find();
    const indicatorResults = await IndicatorResult.find().populate(
      "indicator",
      "code name"
    );

    const totalBudget = workplans.reduce(
      (sum, item) => sum + Number(item.milestone_total_budget || 0),
      0
    );

    const activityStatus = {
      planned: activities.filter((a) => a.status === "planned").length,
      ongoing: activities.filter((a) => a.status === "ongoing").length,
      completed: activities.filter((a) => a.status === "completed").length,
      delayed: activities.filter((a) => a.status === "delayed").length,
    };

    const workplanByQuarter = {};

    workplans.forEach((item) => {
      const quarter = item.quarter || "Unknown";
      workplanByQuarter[quarter] =
        (workplanByQuarter[quarter] || 0) +
        Number(item.milestone_total_budget || 0);
    });

    const componentBudget = {};

    workplans.forEach((item) => {
      const key = item.component
        ? `${item.component.code} - ${item.component.name}`
        : "Unknown";

      componentBudget[key] =
        (componentBudget[key] || 0) + Number(item.milestone_total_budget || 0);
    });

    const beneficiaryGender = {
      male: beneficiaries.filter((b) => b.sex === "male").length,
      female: beneficiaries.filter((b) => b.sex === "female").length,
    };

    const serviceTypeSummary = {};

    services.forEach((service) => {
      serviceTypeSummary[service.service_type] =
        (serviceTypeSummary[service.service_type] || 0) +
        Number(service.quantity || 0);
    });

    const indicatorTrend = indicatorResults.map((result) => ({
      indicator: result.indicator?.code || "N/A",
      name: result.indicator?.name || "",
      period: `${result.period_year}-${result.period_quarter}`,
      value: Number(result.result_value || 0),
    }));

    res.json({
      kpis: {
        totalWorkplans: workplans.length,
        totalActivities: activities.length,
        totalServices: services.length,
        totalBeneficiaries: beneficiaries.length,
        totalBudget,
      },
      activityStatus,
      workplanByQuarter,
      componentBudget,
      beneficiaryGender,
      serviceTypeSummary,
      indicatorTrend,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};