// import DataQualityCheck from "../models/DataQualityCheck.js";
// import Beneficiary from "../models/Beneficiary.js";
// import Activity from "../models/Activity.js";
// import Service from "../models/Service.js";
// import Complaint from "../models/Complaint.js";

// const getModelByTable = (tableName) => {
//   if (tableName === "beneficiaries") return Beneficiary;
//   if (tableName === "activities") return Activity;
//   if (tableName === "services") return Service;
//   if (tableName === "complaints") return Complaint;
//   return null;
// };

// // RUN BASIC COMPLETENESS CHECK
// export const runDataQualityCheck = async (req, res) => {
//   try {
//     const { table_name, check_type, description } = req.body;

//     if (!table_name || !check_type) {
//       return res.status(400).json({
//         message: "Table name and check type are required",
//       });
//     }

//     const Model = getModelByTable(table_name);

//     if (!Model) {
//       return res.status(400).json({
//         message: "Invalid table name",
//       });
//     }

//     const records = await Model.find();

//     let errorsFound = 0;

//     records.forEach((record) => {
//       const obj = record.toObject();

//       Object.keys(obj).forEach((key) => {
//         if (
//           obj[key] === null ||
//           obj[key] === undefined ||
//           obj[key] === ""
//         ) {
//           errorsFound++;
//         }
//       });
//     });

//     const status =
//       errorsFound === 0
//         ? "passed"
//         : errorsFound <= 5
//         ? "needs_review"
//         : "failed";

//     const dqCheck = await DataQualityCheck.create({
//       table_name,
//       check_type,
//       description,
//       status,
//       records_checked: records.length,
//       errors_found: errorsFound,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(dqCheck);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL DQ CHECKS
// export const getDataQualityChecks = async (req, res) => {
//   try {
//     const checks = await DataQualityCheck.find()
//       .populate("createdBy", "name")
//       .sort({ createdAt: -1 });

//     res.json(checks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE DQ CHECK
// export const getDataQualityCheckById = async (req, res) => {
//   try {
//     const check = await DataQualityCheck.findById(req.params.id).populate(
//       "createdBy",
//       "name"
//     );

//     if (!check) {
//       return res.status(404).json({
//         message: "Data quality check not found",
//       });
//     }

//     res.json(check);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE DQ CHECK
// export const deleteDataQualityCheck = async (req, res) => {
//   try {
//     const check = await DataQualityCheck.findByIdAndDelete(req.params.id);

//     if (!check) {
//       return res.status(404).json({
//         message: "Data quality check not found",
//       });
//     }

//     res.json({
//       message: "Data quality check deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import Beneficiary from "../models/Beneficiary.js";
// import Activity from "../models/Activity.js";
// import Service from "../models/Service.js";
// import Indicator from "../models/Indicator.js";
// import IndicatorTarget from "../models/IndicatorTarget.js";
// import IndicatorResult from "../models/IndicatorResult.js";
// import ResultDisaggregation from "../models/ResultDisaggregation.js";

// export const getDataQualityDashboard = async (req, res) => {
//   try {
//     const issues = [];

//     // =========================
//     // BENEFICIARIES
//     // =========================

//     const beneficiariesWithoutLocation =
//       await Beneficiary.find({
//         $or: [
//           { location: null },
//           { location: { $exists: false } },
//         ],
//       });

//     beneficiariesWithoutLocation.forEach((item) => {
//       issues.push({
//         module: "Beneficiary",
//         severity: "high",
//         issue: "Beneficiary without location",
//         description: `${item.name} has no assigned location.`,
//         record_id: item._id,
//       });
//     });

//     const beneficiariesWithoutCategory =
//       await Beneficiary.find({
//         $or: [
//           { category: "" },
//           { category: null },
//         ],
//       });

//     beneficiariesWithoutCategory.forEach((item) => {
//       issues.push({
//         module: "Beneficiary",
//         severity: "medium",
//         issue: "Beneficiary missing category",
//         description: `${item.name} has no category.`,
//         record_id: item._id,
//       });
//     });

//     // =========================
//     // ACTIVITIES
//     // =========================

//     const activitiesWithoutLocation =
//       await Activity.find({
//         $or: [
//           { location: null },
//           { location: { $exists: false } },
//         ],
//       });

//     activitiesWithoutLocation.forEach((item) => {
//       issues.push({
//         module: "Activity",
//         severity: "high",
//         issue: "Activity without location",
//         description: `${item.title} has no location.`,
//         record_id: item._id,
//       });
//     });

//     const activitiesWithoutBeneficiaries =
//       await Activity.find({
//         beneficiaries: { $size: 0 },
//       });

//     activitiesWithoutBeneficiaries.forEach((item) => {
//       issues.push({
//         module: "Activity",
//         severity: "medium",
//         issue: "Activity without beneficiaries",
//         description: `${item.title} has no linked beneficiaries.`,
//         record_id: item._id,
//       });
//     });

//     // =========================
//     // SERVICES
//     // =========================

//     const servicesWithoutActivity =
//       await Service.find({
//         $or: [
//           { activity: null },
//           { activity: { $exists: false } },
//         ],
//       });

//     servicesWithoutActivity.forEach((item) => {
//       issues.push({
//         module: "Service",
//         severity: "high",
//         issue: "Service without activity",
//         description: `${item.service_type} has no linked activity.`,
//         record_id: item._id,
//       });
//     });

//     const servicesWithoutLocation =
//       await Service.find({
//         $or: [
//           { location: null },
//           { location: { $exists: false } },
//         ],
//       });

//     servicesWithoutLocation.forEach((item) => {
//       issues.push({
//         module: "Service",
//         severity: "high",
//         issue: "Service without location",
//         description: `${item.service_type} has no location.`,
//         record_id: item._id,
//       });
//     });

//     // =========================
//     // INDICATORS
//     // =========================

//     const indicatorsWithoutTargets =
//       await Indicator.find();

//     for (const indicator of indicatorsWithoutTargets) {
//       const targetCount =
//         await IndicatorTarget.countDocuments({
//           indicator: indicator._id,
//         });

//       if (targetCount === 0) {
//         issues.push({
//           module: "Indicator",
//           severity: "high",
//           issue: "Indicator without targets",
//           description: `${indicator.code} has no targets.`,
//           record_id: indicator._id,
//         });
//       }
//     }

//     // =========================
//     // RESULTS
//     // =========================

//     const results =
//       await IndicatorResult.find()
//         .populate(
//           "indicator",
//           "code name disaggregation_type"
//         );

//     for (const result of results) {
//       const disaggregationCount =
//         await ResultDisaggregation.countDocuments({
//           indicator_result: result._id,
//         });

//       if (
//         result.indicator?.disaggregation_type !==
//           "none" &&
//         disaggregationCount === 0
//       ) {
//         issues.push({
//           module: "Indicator Result",
//           severity: "medium",
//           issue: "Missing disaggregation",
//           description: `${result.indicator?.code} result has no disaggregation.`,
//           record_id: result._id,
//         });
//       }
//     }

//     // =========================
//     // SUMMARY
//     // =========================

//     const summary = {
//       totalIssues: issues.length,

//       high: issues.filter(
//         (i) => i.severity === "high"
//       ).length,

//       medium: issues.filter(
//         (i) => i.severity === "medium"
//       ).length,

//       low: issues.filter(
//         (i) => i.severity === "low"
//       ).length,

//       beneficiaryIssues: issues.filter(
//         (i) => i.module === "Beneficiary"
//       ).length,

//       activityIssues: issues.filter(
//         (i) => i.module === "Activity"
//       ).length,

//       serviceIssues: issues.filter(
//         (i) => i.module === "Service"
//       ).length,

//       indicatorIssues: issues.filter(
//         (i) => i.module === "Indicator"
//       ).length,
//     };

//     res.json({
//       summary,
//       issues,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

import DataQualityCheck from "../models/DataQualityCheck.js";
import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";
import Service from "../models/Service.js";
import Complaint from "../models/Complaint.js";
import Indicator from "../models/Indicator.js";
import IndicatorTarget from "../models/IndicatorTarget.js";
import IndicatorResult from "../models/IndicatorResult.js";
import ResultDisaggregation from "../models/ResultDisaggregation.js";

const getModelByTable = (tableName) => {
  if (tableName === "beneficiaries") return Beneficiary;
  if (tableName === "activities") return Activity;
  if (tableName === "services") return Service;
  if (tableName === "complaints") return Complaint;
  return null;
};

export const runDataQualityCheck = async (req, res) => {
  try {
    const { table_name, check_type, description } = req.body;

    if (!table_name || !check_type) {
      return res.status(400).json({
        message: "Table name and check type are required",
      });
    }

    const Model = getModelByTable(table_name);

    if (!Model) {
      return res.status(400).json({
        message: "Invalid table name",
      });
    }

    const records = await Model.find();

    let errorsFound = 0;

    records.forEach((record) => {
      const obj = record.toObject();

      Object.keys(obj).forEach((key) => {
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
          errorsFound++;
        }
      });
    });

    const status =
      errorsFound === 0 ? "passed" : errorsFound <= 5 ? "needs_review" : "failed";

    const dqCheck = await DataQualityCheck.create({
      table_name,
      check_type,
      description,
      status,
      records_checked: records.length,
      errors_found: errorsFound,
      createdBy: req.user._id,
    });

    res.status(201).json(dqCheck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDataQualityChecks = async (req, res) => {
  try {
    const checks = await DataQualityCheck.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(checks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDataQualityCheckById = async (req, res) => {
  try {
    const check = await DataQualityCheck.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!check) {
      return res.status(404).json({
        message: "Data quality check not found",
      });
    }

    res.json(check);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDataQualityCheck = async (req, res) => {
  try {
    const check = await DataQualityCheck.findByIdAndDelete(req.params.id);

    if (!check) {
      return res.status(404).json({
        message: "Data quality check not found",
      });
    }

    res.json({
      message: "Data quality check deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDataQualityDashboard = async (req, res) => {
  try {
    const issues = [];

    const beneficiariesWithoutLocation = await Beneficiary.find({
      $or: [{ location: null }, { location: { $exists: false } }],
    });

    beneficiariesWithoutLocation.forEach((item) => {
      issues.push({
        module: "Beneficiary",
        severity: "high",
        issue: "Beneficiary without location",
        description: `${item.name} has no assigned location.`,
        record_id: item._id,
      });
    });

    const beneficiariesWithoutCategory = await Beneficiary.find({
      $or: [{ category: "" }, { category: null }],
    });

    beneficiariesWithoutCategory.forEach((item) => {
      issues.push({
        module: "Beneficiary",
        severity: "medium",
        issue: "Beneficiary missing category",
        description: `${item.name} has no category.`,
        record_id: item._id,
      });
    });

    const activitiesWithoutLocation = await Activity.find({
      $or: [{ location: null }, { location: { $exists: false } }],
    });

    activitiesWithoutLocation.forEach((item) => {
      issues.push({
        module: "Activity",
        severity: "high",
        issue: "Activity without location",
        description: `${item.title} has no location.`,
        record_id: item._id,
      });
    });

    const activitiesWithoutBeneficiaries = await Activity.find({
      beneficiaries: { $size: 0 },
    });

    activitiesWithoutBeneficiaries.forEach((item) => {
      issues.push({
        module: "Activity",
        severity: "medium",
        issue: "Activity without beneficiaries",
        description: `${item.title} has no linked beneficiaries.`,
        record_id: item._id,
      });
    });

    const servicesWithoutActivity = await Service.find({
      $or: [{ activity: null }, { activity: { $exists: false } }],
    });

    servicesWithoutActivity.forEach((item) => {
      issues.push({
        module: "Service",
        severity: "high",
        issue: "Service without activity",
        description: `${item.service_type} has no linked activity.`,
        record_id: item._id,
      });
    });

    const servicesWithoutLocation = await Service.find({
      $or: [{ location: null }, { location: { $exists: false } }],
    });

    servicesWithoutLocation.forEach((item) => {
      issues.push({
        module: "Service",
        severity: "high",
        issue: "Service without location",
        description: `${item.service_type} has no location.`,
        record_id: item._id,
      });
    });

    const indicators = await Indicator.find();

    for (const indicator of indicators) {
      const targetCount = await IndicatorTarget.countDocuments({
        indicator: indicator._id,
      });

      if (targetCount === 0) {
        issues.push({
          module: "Indicator",
          severity: "high",
          issue: "Indicator without targets",
          description: `${indicator.code} has no targets.`,
          record_id: indicator._id,
        });
      }
    }

    const results = await IndicatorResult.find().populate(
      "indicator",
      "code name disaggregation_type"
    );

    for (const result of results) {
      const disaggregationCount = await ResultDisaggregation.countDocuments({
        indicator_result: result._id,
      });

      if (
        result.indicator?.disaggregation_type !== "none" &&
        disaggregationCount === 0
      ) {
        issues.push({
          module: "Indicator Result",
          severity: "medium",
          issue: "Missing disaggregation",
          description: `${result.indicator?.code} result has no disaggregation.`,
          record_id: result._id,
        });
      }
    }

    const summary = {
      totalIssues: issues.length,
      high: issues.filter((i) => i.severity === "high").length,
      medium: issues.filter((i) => i.severity === "medium").length,
      low: issues.filter((i) => i.severity === "low").length,
      beneficiaryIssues: issues.filter((i) => i.module === "Beneficiary").length,
      activityIssues: issues.filter((i) => i.module === "Activity").length,
      serviceIssues: issues.filter((i) => i.module === "Service").length,
      indicatorIssues: issues.filter((i) => i.module === "Indicator").length,
      resultIssues: issues.filter((i) => i.module === "Indicator Result").length,
    };

    res.json({
      summary,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};