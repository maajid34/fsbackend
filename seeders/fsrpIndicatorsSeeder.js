// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import connectDB from "../config/db.js";

// import Indicator from "../models/Indicator.js";
// import IndicatorTarget from "../models/IndicatorTarget.js";

// dotenv.config();

// await connectDB();

// const indicators = [
//   {
//     code: "PDO-001",
//     name: "Farmers adopting climate smart technologies",
//     description:
//       "Farmers adopting resilience enhancing technologies and practices",

//     result_level: "pdo",

//     indicator_type: "outcome",

//     unit_of_measure: "farmers",

//     baseline: 0,

//     end_target: 210000,

//     reporting_frequency: "annually",

//     disaggregation_type: "gender",

//     source_type: "beneficiary",

//     aggregation_field: "count",

//     category_filter: "farmer",
//   },

//   {
//     code: "PDO-002",
//     name: "Land under sustainable land management",

//     description:
//       "Land area under sustainable landscape management practices",

//     result_level: "outcome",

//     indicator_type: "outcome",

//     unit_of_measure: "hectares",

//     baseline: 0,

//     end_target: 300000,

//     reporting_frequency: "annually",

//     disaggregation_type: "location",

//     source_type: "service",

//     aggregation_field: "quantity",

//     service_type_filter: "land_management",
//   },

//   {
//     code: "OUT-001",

//     name: "Farmers trained",

//     description:
//       "Number of farmers receiving agricultural training services",

//     result_level: "output",

//     indicator_type: "output",

//     unit_of_measure: "people",

//     baseline: 0,

//     end_target: 50000,

//     reporting_frequency: "quarterly",

//     disaggregation_type: "gender",

//     source_type: "beneficiary",

//     aggregation_field: "count",

//     category_filter: "farmer",
//   },

//   {
//     code: "OUT-002",

//     name: "Livestock vaccinated",

//     description:
//       "Number of livestock vaccinated through campaign activities",

//     result_level: "output",

//     indicator_type: "output",

//     unit_of_measure: "animals",

//     baseline: 0,

//     end_target: 1000000,

//     reporting_frequency: "quarterly",

//     disaggregation_type: "location",

//     source_type: "service",

//     aggregation_field: "quantity",

//     service_type_filter: "vaccination",
//   },

//   {
//     code: "OUT-003",

//     name: "Community groups supported",

//     description:
//       "Community groups receiving project support",

//     result_level: "output",

//     indicator_type: "output",

//     unit_of_measure: "groups",

//     baseline: 0,

//     end_target: 5000,

//     reporting_frequency: "quarterly",

//     disaggregation_type: "location",

//     source_type: "activity",

//     aggregation_field: "count",

//     activity_status_filter: "completed",
//   },
// ];

// const seedIndicators = async () => {
//   try {
//     console.log("Deleting old indicators...");

//     await Indicator.deleteMany({});
//     await IndicatorTarget.deleteMany({});

//     console.log("Creating indicators...");

//     const createdIndicators = [];

//     for (const item of indicators) {
//       const indicator = await Indicator.create(item);

//       createdIndicators.push(indicator);
//     }

//     console.log("Creating targets...");

//     for (const indicator of createdIndicators) {
//       const annualTarget = indicator.end_target / 5;

//       for (let year = 2026; year <= 2030; year++) {
//         await IndicatorTarget.create({
//           indicator: indicator._id,

//           target_year: year,

//           target_quarter: "Annual",

//           target_value: annualTarget,

//           disaggregation_value: "overall",

//           status: "active",
//         });

//         const quarterlyTarget = annualTarget / 4;

//         const quarters = ["Q1", "Q2", "Q3", "Q4"];

//         for (const quarter of quarters) {
//           await IndicatorTarget.create({
//             indicator: indicator._id,

//             target_year: year,

//             target_quarter: quarter,

//             target_value: quarterlyTarget,

//             disaggregation_value: "overall",

//             status: "active",
//           });
//         }
//       }
//     }

//     console.log("FSRP indicators seeded successfully");

//     process.exit();
//   } catch (error) {
//     console.log(error);

//     process.exit(1);
//   }
// };

// seedIndicators();

import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

import Indicator from "../models/Indicator.js";
import IndicatorTarget from "../models/IndicatorTarget.js";

dotenv.config();

await connectDB();

const indicators = [
  // =========================
  // PDO INDICATORS
  // =========================

  {
    code: "PDO-001",

    component: "PDO",

    name: "Reduction in food insecure people",

    description:
      "Percentage reduction in food insecure people in project intervention areas",

    result_level: "pdo",

    indicator_type: "impact",

    unit_of_measure: "percentage",

    baseline: 0,

    end_target: 25,

    reporting_frequency: "annually",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",
  },

  {
    code: "PDO-002",

    component: "PDO",

    name: "Farmers adopting resilience technologies",

    description:
      "Farmers adopting resilience enhancing technologies and practices",

    result_level: "pdo",

    indicator_type: "outcome",

    unit_of_measure: "farmers",

    baseline: 0,

    end_target: 200000,

    reporting_frequency: "annually",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",

    category_filter: "farmer",
  },

  {
    code: "PDO-003",

    component: "PDO",

    name: "Land under sustainable landscape management",

    description:
      "Land area under sustainable landscape management practices",

    result_level: "pdo",

    indicator_type: "outcome",

    unit_of_measure: "hectares",

    baseline: 0,

    end_target: 500,

    reporting_frequency: "annually",

    disaggregation_type: "location",

    source_type: "service",

    aggregation_field: "quantity",

    service_type_filter: "land_management",
  },

  {
    code: "PDO-004",

    component: "PDO",

    name: "Increase in agricultural production sold",

    description:
      "Increase in agricultural production marketed by beneficiaries",

    result_level: "pdo",

    indicator_type: "outcome",

    unit_of_measure: "percentage",

    baseline: 0,

    end_target: 60,

    reporting_frequency: "annually",

    disaggregation_type: "gender",

    source_type: "service",

    aggregation_field: "quantity",
  },

  {
    code: "PDO-005",

    component: "PDO",

    name: "Policy products developed",

    description:
      "Policies, regulations, strategies and guidelines developed",

    result_level: "pdo",

    indicator_type: "output",

    unit_of_measure: "documents",

    baseline: 0,

    end_target: 6,

    reporting_frequency: "annually",

    disaggregation_type: "none",

    source_type: "activity",

    aggregation_field: "count",

    activity_status_filter: "completed",
  },

  // =========================
  // COMPONENT 1
  // =========================

  {
    code: "C1-001",

    component: "Component 1",

    name: "Farmers digitally registered",

    description:
      "Farmers registered into digital agriculture systems",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "farmers",

    baseline: 0,

    end_target: 250000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",

    category_filter: "farmer",
  },

  {
    code: "C1-002",

    component: "Component 1",

    name: "Farmers receiving extension services",

    description:
      "Farmers receiving agricultural extension and advisory services",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "people",

    baseline: 0,

    end_target: 150000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "service",

    aggregation_field: "count",

    service_type_filter: "extension_service",
  },

  {
    code: "C1-003",

    component: "Component 1",

    name: "Livestock vaccinated",

    description:
      "Livestock vaccinated through vaccination campaigns",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "animals",

    baseline: 0,

    end_target: 1000000,

    reporting_frequency: "quarterly",

    disaggregation_type: "location",

    source_type: "service",

    aggregation_field: "quantity",

    service_type_filter: "vaccination",
  },

  // =========================
  // COMPONENT 2
  // =========================

  {
    code: "C2-001",

    component: "Component 2",

    name: "Community groups supported",

    description:
      "Community groups receiving project support",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "groups",

    baseline: 0,

    end_target: 5000,

    reporting_frequency: "quarterly",

    disaggregation_type: "location",

    source_type: "activity",

    aggregation_field: "count",

    activity_status_filter: "completed",
  },

  {
    code: "C2-002",

    component: "Component 2",

    name: "People benefiting from irrigation infrastructure",

    description:
      "Beneficiaries accessing irrigation and flood control infrastructure",

    result_level: "outcome",

    indicator_type: "outcome",

    unit_of_measure: "people",

    baseline: 0,

    end_target: 120000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",
  },

  // =========================
  // COMPONENT 3
  // =========================

  {
    code: "C3-001",

    component: "Component 3",

    name: "Women accessing financial services",

    description:
      "Women beneficiaries accessing project linked financial services",

    result_level: "outcome",

    indicator_type: "outcome",

    unit_of_measure: "women",

    baseline: 0,

    end_target: 6000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",
  },

  {
    code: "C3-002",

    component: "Component 3",

    name: "Producer organizations strengthened",

    description:
      "Producer organizations receiving institutional strengthening",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "organizations",

    baseline: 0,

    end_target: 350,

    reporting_frequency: "quarterly",

    disaggregation_type: "location",

    source_type: "activity",

    aggregation_field: "count",

    activity_status_filter: "completed",
  },

  // =========================
  // COMPONENT 4
  // =========================

  {
    code: "C4-001",

    component: "Component 4",

    name: "Project beneficiaries",

    description:
      "Direct project beneficiaries across intervention areas",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "people",

    baseline: 0,

    end_target: 1200000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",
  },

  {
    code: "C4-002",

    component: "Component 4",

    name: "Female beneficiaries",

    description:
      "Female direct project beneficiaries",

    result_level: "output",

    indicator_type: "output",

    unit_of_measure: "women",

    baseline: 0,

    end_target: 360000,

    reporting_frequency: "quarterly",

    disaggregation_type: "gender",

    source_type: "beneficiary",

    aggregation_field: "count",
  },

  // =========================
  // COMPONENT 5
  // =========================

  {
    code: "C5-001",

    component: "Component 5",

    name: "Grievances addressed",

    description:
      "Project grievances addressed through GRM system",

    result_level: "output",

    indicator_type: "process",

    unit_of_measure: "cases",

    baseline: 0,

    end_target: 5000,

    reporting_frequency: "quarterly",

    disaggregation_type: "none",

    source_type: "activity",

    aggregation_field: "count",

    activity_status_filter: "completed",
  },
];

const createTargets = async (indicator) => {
  const years = [2026, 2027, 2028, 2029, 2030];

  const annualTarget = Number(
    (indicator.end_target / years.length).toFixed(2)
  );

  for (const year of years) {
    await IndicatorTarget.create({
      indicator: indicator._id,

      target_year: year,

      target_quarter: "Annual",

      target_value: annualTarget,

      disaggregation_value: "overall",

      status: "active",
    });

    const quarterlyTarget = Number((annualTarget / 4).toFixed(2));

    const quarters = ["Q1", "Q2", "Q3", "Q4"];

    for (const quarter of quarters) {
      await IndicatorTarget.create({
        indicator: indicator._id,

        target_year: year,

        target_quarter: quarter,

        target_value: quarterlyTarget,

        disaggregation_value: "overall",

        status: "active",
      });
    }
  }
};

const seedIndicators = async () => {
  try {
    console.log("Deleting old indicators...");

    await Indicator.deleteMany({});
    await IndicatorTarget.deleteMany({});

    console.log("Creating FSRP indicators...");

    for (const item of indicators) {
      const indicator = await Indicator.create(item);

      await createTargets(indicator);

      console.log(`Created: ${indicator.code}`);
    }

    console.log("=================================");
    console.log("FSRP Results Framework Loaded");
    console.log("=================================");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedIndicators();