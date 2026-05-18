// import Workplan from "../models/Workplan.js";
// import Activity from "../models/Activity.js";
// import Service from "../models/Service.js";
// import Beneficiary from "../models/Beneficiary.js";
// import IndicatorResult from "../models/IndicatorResult.js";

// export const getAdvancedDashboardAnalytics = async (req, res) => {
//   try {
//     const workplans = await Workplan.find().populate("component", "code name");
//     const activities = await Activity.find().populate("component", "code name");
//     const services = await Service.find();
//     const beneficiaries = await Beneficiary.find();
//     const indicatorResults = await IndicatorResult.find().populate(
//       "indicator",
//       "code name"
//     );

//     const totalBudget = workplans.reduce(
//       (sum, item) => sum + Number(item.milestone_total_budget || 0),
//       0
//     );

//     const activityStatus = {
//       planned: activities.filter((a) => a.status === "planned").length,
//       ongoing: activities.filter((a) => a.status === "ongoing").length,
//       completed: activities.filter((a) => a.status === "completed").length,
//       delayed: activities.filter((a) => a.status === "delayed").length,
//     };

//     const workplanByQuarter = {};

//     workplans.forEach((item) => {
//       const quarter = item.quarter || "Unknown";
//       workplanByQuarter[quarter] =
//         (workplanByQuarter[quarter] || 0) +
//         Number(item.milestone_total_budget || 0);
//     });

//     const componentBudget = {};

//     workplans.forEach((item) => {
//       const key = item.component
//         ? `${item.component.code} - ${item.component.name}`
//         : "Unknown";

//       componentBudget[key] =
//         (componentBudget[key] || 0) + Number(item.milestone_total_budget || 0);
//     });

//     const beneficiaryGender = {
//       male: beneficiaries.filter((b) => b.sex === "male").length,
//       female: beneficiaries.filter((b) => b.sex === "female").length,
//     };

//     const serviceTypeSummary = {};

//     services.forEach((service) => {
//       serviceTypeSummary[service.service_type] =
//         (serviceTypeSummary[service.service_type] || 0) +
//         Number(service.quantity || 0);
//     });

//     const indicatorTrend = indicatorResults.map((result) => ({
//       indicator: result.indicator?.code || "N/A",
//       name: result.indicator?.name || "",
//       period: `${result.period_year}-${result.period_quarter}`,
//       value: Number(result.result_value || 0),
//     }));

//     res.json({
//       kpis: {
//         totalWorkplans: workplans.length,
//         totalActivities: activities.length,
//         totalServices: services.length,
//         totalBeneficiaries: beneficiaries.length,
//         totalBudget,
//       },
//       activityStatus,
//       workplanByQuarter,
//       componentBudget,
//       beneficiaryGender,
//       serviceTypeSummary,
//       indicatorTrend,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

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

    const completedActivities = activities.filter(
      (a) => a.status === "completed"
    ).length;

    const implementationRate =
      activities.length > 0
        ? ((completedActivities / activities.length) * 100).toFixed(1)
        : 0;

    const activityStatus = {
      planned: activities.filter((a) => a.status === "planned").length,
      ongoing: activities.filter((a) => a.status === "ongoing").length,
      completed: completedActivities,
      delayed: activities.filter((a) => a.status === "delayed").length,
    };

    const workplanByQuarter = {};
    const componentBudget = {};
    const componentActivities = {};

    workplans.forEach((item) => {
      const quarter = item.quarter || "Unknown";

      workplanByQuarter[quarter] =
        (workplanByQuarter[quarter] || 0) +
        Number(item.milestone_total_budget || 0);

      const componentKey = item.component
        ? `${item.component.code} - ${item.component.name}`
        : "Unknown";

      componentBudget[componentKey] =
        (componentBudget[componentKey] || 0) +
        Number(item.milestone_total_budget || 0);
    });

    activities.forEach((item) => {
      const componentKey = item.component
        ? `${item.component.code} - ${item.component.name}`
        : "Unknown";

      if (!componentActivities[componentKey]) {
        componentActivities[componentKey] = {
          total: 0,
          completed: 0,
          ongoing: 0,
          planned: 0,
          delayed: 0,
        };
      }

      componentActivities[componentKey].total += 1;
      componentActivities[componentKey][item.status] =
        (componentActivities[componentKey][item.status] || 0) + 1;
    });

    const componentPerformanceRanking = Object.entries(componentActivities).map(
      ([component, value]) => ({
        component,
        total: value.total,
        completed: value.completed,
        ongoing: value.ongoing,
        planned: value.planned,
        delayed: value.delayed,
        completionRate:
          value.total > 0
            ? Number(((value.completed / value.total) * 100).toFixed(1))
            : 0,
      })
    );

    componentPerformanceRanking.sort(
      (a, b) => b.completionRate - a.completionRate
    );

    const beneficiaryGender = {
      male: beneficiaries.filter((b) => b.sex === "male").length,
      female: beneficiaries.filter((b) => b.sex === "female").length,
    };

    const beneficiaryCategory = {};

    beneficiaries.forEach((b) => {
      const key = b.category || "Unknown";
      beneficiaryCategory[key] = (beneficiaryCategory[key] || 0) + 1;
    });

    const serviceTypeSummary = {};

    services.forEach((service) => {
      const key = service.service_type || "Unknown";

      serviceTypeSummary[key] =
        (serviceTypeSummary[key] || 0) + Number(service.quantity || 0);
    });

    const indicatorTrend = indicatorResults.map((result) => ({
      indicator: result.indicator?.code || "N/A",
      name: result.indicator?.name || "",
      period: `${result.period_year}-${result.period_quarter}`,
      value: Number(result.result_value || 0),
    }));

    const budgetUtilization = {
      totalBudget,
      utilizedBudget: 0,
      remainingBudget: totalBudget,
      utilizationRate: 0,
    };

    res.json({
      kpis: {
        totalWorkplans: workplans.length,
        totalActivities: activities.length,
        totalServices: services.length,
        totalBeneficiaries: beneficiaries.length,
        totalBudget,
        implementationRate,
      },
      activityStatus,
      workplanByQuarter,
      componentBudget,
      componentPerformanceRanking,
      beneficiaryGender,
      beneficiaryCategory,
      serviceTypeSummary,
      indicatorTrend,
      budgetUtilization,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};