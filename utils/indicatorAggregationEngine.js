// // // // import Indicator from "../models/Indicator.js";
// // // // import IndicatorResult from "../models/IndicatorResult.js";
// // // // import Beneficiary from "../models/Beneficiary.js";
// // // // import Service from "../models/Service.js";
// // // // import Activity from "../models/Activity.js";
// // // // import ResultDisaggregation from "../models/ResultDisaggregation.js";

// // // // export const calculateIndicatorValue = async (indicator) => {
// // // //   let value = 0;

// // // //   // BENEFICIARY SOURCE
// // // //   if (indicator.source_type === "beneficiary") {
// // // //     const filter = {};

// // // //     if (indicator.category_filter) {
// // // //       filter.category = indicator.category_filter;
// // // //     }

// // // //     value = await Beneficiary.countDocuments(filter);
// // // //   }

// // // //   // SERVICE SOURCE
// // // //   if (indicator.source_type === "service") {
// // // //     const filter = {};

// // // //     if (indicator.service_type_filter) {
// // // //       filter.service_type = indicator.service_type_filter;
// // // //     }

// // // //     if (indicator.aggregation_field === "quantity") {
// // // //       const result = await Service.aggregate([
// // // //         { $match: filter },
// // // //         {
// // // //           $group: {
// // // //             _id: null,
// // // //             total: { $sum: "$quantity" },
// // // //           },
// // // //         },
// // // //       ]);

// // // //       value = result.length > 0 ? result[0].total : 0;
// // // //     } else {
// // // //       value = await Service.countDocuments(filter);
// // // //     }
// // // //   }

// // // //   // ACTIVITY SOURCE
// // // //   if (indicator.source_type === "activity") {
// // // //     const filter = {};

// // // //     if (indicator.activity_status_filter) {
// // // //       filter.status = indicator.activity_status_filter;
// // // //     }

// // // //     value = await Activity.countDocuments(filter);
// // // //   }

// // // //   return value;
// // // // };

// // // // export const updateAutoIndicatorResult = async ({
// // // //   indicatorId,
// // // //   year,
// // // //   quarter,
// // // //   userId,
// // // // }) => {
// // // //   const indicator = await Indicator.findById(indicatorId);

// // // //   if (!indicator) {
// // // //     throw new Error("Indicator not found");
// // // //   }

// // // //   const actualValue = await calculateIndicatorValue(indicator);

// // // //   // Delete old duplicate auto/manual results for same indicator/year/quarter
// // // //   await IndicatorResult.deleteMany({
// // // //     indicator: indicator._id,
// // // //     period_year: year,
// // // //     period_quarter: quarter,
// // // //   });

// // // //   // Create one clean official auto result
// // // //   const result = await IndicatorResult.create({
// // // //     indicator: indicator._id,
// // // //     period_year: year,
// // // //     period_quarter: quarter,
// // // //     result_value: actualValue,
// // // //     data_source: "auto_aggregation",
// // // //     comments: "Automatically calculated from linked field data",
// // // //     statusApproval: "pending",
// // // //     createdBy: userId,
// // // //   });

// // // //   return result;
// // // // };



// // // // const generateDisaggregation = async (
// // // //   indicatorResult,
// // // //   indicator,
// // // //   beneficiaries
// // // // ) => {
// // // //   try {
// // // //     // delete old auto disaggregation
// // // //     await ResultDisaggregation.deleteMany({
// // // //       indicator_result: indicatorResult._id,
// // // //       source: "auto",
// // // //     });

// // // //     // gender disaggregation
// // // //     if (indicator.disaggregation_type === "gender") {
// // // //       const maleCount = beneficiaries.filter(
// // // //         (b) => b.sex?.toLowerCase() === "male"
// // // //       ).length;

// // // //       const femaleCount = beneficiaries.filter(
// // // //         (b) => b.sex?.toLowerCase() === "female"
// // // //       ).length;

// // // //       if (maleCount > 0) {
// // // //         await ResultDisaggregation.create({
// // // //           indicator_result: indicatorResult._id,
// // // //           type: "gender",
// // // //           value: "male",
// // // //           result_value: maleCount,
// // // //           source: "auto",
// // // //         });
// // // //       }

// // // //       if (femaleCount > 0) {
// // // //         await ResultDisaggregation.create({
// // // //           indicator_result: indicatorResult._id,
// // // //           type: "gender",
// // // //           value: "female",
// // // //           result_value: femaleCount,
// // // //           source: "auto",
// // // //         });
// // // //       }
// // // //     }

// // // //     // category disaggregation
// // // //     if (indicator.disaggregation_type === "category") {
// // // //       const grouped = {};

// // // //       beneficiaries.forEach((b) => {
// // // //         const key = b.category || "unknown";

// // // //         if (!grouped[key]) {
// // // //           grouped[key] = 0;
// // // //         }

// // // //         grouped[key]++;
// // // //       });

// // // //       for (const category in grouped) {
// // // //         await ResultDisaggregation.create({
// // // //           indicator_result: indicatorResult._id,
// // // //           type: "category",
// // // //           value: category,
// // // //           result_value: grouped[category],
// // // //           source: "auto",
// // // //         });
// // // //       }
// // // //     }
// // // //   } catch (error) {
// // // //     console.log("Disaggregation generation error:", error.message);
// // // //   }
// // // // };

// // // // export const updateAllAutoIndicatorResults = async ({
// // // //   year,
// // // //   quarter,
// // // //   userId,
// // // // }) => {
// // // //   const indicators = await Indicator.find();

// // // //   const results = [];

// // // //   for (const indicator of indicators) {
// // // //     const result = await updateAutoIndicatorResult({
// // // //       indicatorId: indicator._id,
// // // //       year,
// // // //       quarter,
// // // //       userId,
// // // //     });

// // // //     results.push(result);
// // // //   }

// // // //   return results;
// // // // };

// // // import Indicator from "../models/Indicator.js";
// // // import IndicatorResult from "../models/IndicatorResult.js";
// // // import Beneficiary from "../models/Beneficiary.js";
// // // import Service from "../models/Service.js";
// // // import Activity from "../models/Activity.js";
// // // import ResultDisaggregation from "../models/ResultDisaggregation.js";

// // // export const calculateIndicatorValue = async (indicator) => {
// // //   let value = 0;

// // //   if (indicator.source_type === "beneficiary") {
// // //     const filter = {};

// // //     if (indicator.category_filter) {
// // //       filter.category = indicator.category_filter;
// // //     }

// // //     value = await Beneficiary.countDocuments(filter);
// // //   }

// // //   if (indicator.source_type === "service") {
// // //     const filter = {};

// // //     if (indicator.service_type_filter) {
// // //       filter.service_type = indicator.service_type_filter;
// // //     }

// // //     if (indicator.aggregation_field === "quantity") {
// // //       const result = await Service.aggregate([
// // //         { $match: filter },
// // //         {
// // //           $group: {
// // //             _id: null,
// // //             total: { $sum: "$quantity" },
// // //           },
// // //         },
// // //       ]);

// // //       value = result.length > 0 ? result[0].total : 0;
// // //     } else {
// // //       value = await Service.countDocuments(filter);
// // //     }
// // //   }

// // //   if (indicator.source_type === "activity") {
// // //     const filter = {};

// // //     if (indicator.activity_status_filter) {
// // //       filter.status = indicator.activity_status_filter;
// // //     }

// // //     value = await Activity.countDocuments(filter);
// // //   }

// // //   return value;
// // // };

// // // const getBeneficiariesForIndicator = async (indicator) => {
// // //   const filter = {};

// // //   if (indicator.category_filter) {
// // //     filter.category = indicator.category_filter;
// // //   }

// // //   return Beneficiary.find(filter);
// // // };

// // // const generateDisaggregation = async (
// // //   indicatorResult,
// // //   indicator,
// // //   beneficiaries
// // // ) => {
// // //   try {
// // //     await ResultDisaggregation.deleteMany({
// // //       indicator_result: indicatorResult._id,
// // //       source: "auto",
// // //     });

// // //     if (indicator.disaggregation_type === "gender") {
// // //       const maleCount = beneficiaries.filter(
// // //         (b) => b.sex?.toLowerCase() === "male"
// // //       ).length;

// // //       const femaleCount = beneficiaries.filter(
// // //         (b) => b.sex?.toLowerCase() === "female"
// // //       ).length;

// // //       if (maleCount > 0) {
// // //         await ResultDisaggregation.create({
// // //           indicator_result: indicatorResult._id,
// // //           type: "gender",
// // //           value: "male",
// // //           result_value: maleCount,
// // //           source: "auto",
// // //         });
// // //       }

// // //       if (femaleCount > 0) {
// // //         await ResultDisaggregation.create({
// // //           indicator_result: indicatorResult._id,
// // //           type: "gender",
// // //           value: "female",
// // //           result_value: femaleCount,
// // //           source: "auto",
// // //         });
// // //       }
// // //     }

// // //     if (indicator.disaggregation_type === "category") {
// // //       const grouped = {};

// // //       beneficiaries.forEach((b) => {
// // //         const key = b.category || "unknown";
// // //         grouped[key] = (grouped[key] || 0) + 1;
// // //       });

// // //       for (const category in grouped) {
// // //         await ResultDisaggregation.create({
// // //           indicator_result: indicatorResult._id,
// // //           type: "category",
// // //           value: category,
// // //           result_value: grouped[category],
// // //           source: "auto",
// // //         });
// // //       }
// // //     }
// // //   } catch (error) {
// // //     console.log("Disaggregation generation error:", error.message);
// // //   }
// // // };

// // // export const updateAutoIndicatorResult = async ({
// // //   indicatorId,
// // //   year,
// // //   quarter,
// // //   userId,
// // // }) => {
// // //   const indicator = await Indicator.findById(indicatorId);

// // //   if (!indicator) {
// // //     throw new Error("Indicator not found");
// // //   }

// // //   const actualValue = await calculateIndicatorValue(indicator);

// // //   await IndicatorResult.deleteMany({
// // //     indicator: indicator._id,
// // //     period_year: year,
// // //     period_quarter: quarter,
// // //   });

// // //   const result = await IndicatorResult.create({
// // //     indicator: indicator._id,
// // //     period_year: year,
// // //     period_quarter: quarter,
// // //     result_value: actualValue,
// // //     data_source: "auto_aggregation",
// // //     comments: "Automatically calculated from linked field data",
// // //     statusApproval: "pending",
// // //     createdBy: userId,
// // //   });

// // //   if (indicator.source_type === "beneficiary") {
// // //     const beneficiaries = await getBeneficiariesForIndicator(indicator);

// // //     await generateDisaggregation(
// // //       result,
// // //       indicator,
// // //       beneficiaries
// // //     );
// // //   }

// // //   return result;
// // // };

// // // export const updateAllAutoIndicatorResults = async ({
// // //   year,
// // //   quarter,
// // //   userId,
// // // }) => {
// // //   const indicators = await Indicator.find();

// // //   const results = [];

// // //   for (const indicator of indicators) {
// // //     const result = await updateAutoIndicatorResult({
// // //       indicatorId: indicator._id,
// // //       year,
// // //       quarter,
// // //       userId,
// // //     });

// // //     results.push(result);
// // //   }

// // //   return results;
// // // };


// // import Indicator from "../models/Indicator.js";
// // import IndicatorResult from "../models/IndicatorResult.js";
// // import Beneficiary from "../models/Beneficiary.js";
// // import Service from "../models/Service.js";
// // import Activity from "../models/Activity.js";
// // import ResultDisaggregation from "../models/ResultDisaggregation.js";

// // const buildFilter = (indicator) => {
// //   const filter = {};

// //   if (indicator.source_type === "beneficiary" && indicator.category_filter) {
// //     filter.category = indicator.category_filter;
// //   }

// //   if (indicator.source_type === "service" && indicator.service_type_filter) {
// //     filter.service_type = indicator.service_type_filter;
// //   }

// //   if (indicator.source_type === "activity" && indicator.activity_status_filter) {
// //     filter.status = indicator.activity_status_filter;
// //   }

// //   return filter;
// // };

// // export const calculateIndicatorValue = async (indicator) => {
// //   const filter = buildFilter(indicator);

// //   if (indicator.source_type === "beneficiary") {
// //     return Beneficiary.countDocuments(filter);
// //   }

// //   if (indicator.source_type === "service") {
// //     if (indicator.aggregation_field === "quantity") {
// //       const result = await Service.aggregate([
// //         { $match: filter },
// //         {
// //           $group: {
// //             _id: null,
// //             total: { $sum: "$quantity" },
// //           },
// //         },
// //       ]);

// //       return result.length > 0 ? result[0].total : 0;
// //     }

// //     return Service.countDocuments(filter);
// //   }

// //   if (indicator.source_type === "activity") {
// //     return Activity.countDocuments(filter);
// //   }

// //   return 0;
// // };

// // const getSourceRecords = async (indicator) => {
// //   const filter = buildFilter(indicator);

// //   if (indicator.source_type === "beneficiary") {
// //     return {
// //       records: await Beneficiary.find(filter),
// //       model: "Beneficiary",
// //     };
// //   }

// //   if (indicator.source_type === "service") {
// //     return {
// //       records: await Service.find(filter),
// //       model: "Service",
// //     };
// //   }

// //   if (indicator.source_type === "activity") {
// //     return {
// //       records: await Activity.find(filter),
// //       model: "Activity",
// //     };
// //   }

// //   return {
// //     records: [],
// //     model: null,
// //   };
// // };

// // const extractStructureFromRecords = (records) => {
// //   const first = records[0];

// //   if (!first) {
// //     return {
// //       component: null,
// //       subcomponent: null,
// //       value_chain: null,
// //       community: null,
// //       community_group: null,
// //     };
// //   }

// //   return {
// //     component: first.component || null,
// //     subcomponent: first.subcomponent || null,
// //     value_chain: first.value_chain || null,
// //     community: first.community || null,
// //     community_group: first.community_group || null,
// //   };
// // };

// // const generateDisaggregation = async (
// //   indicatorResult,
// //   indicator,
// //   beneficiaries
// // ) => {
// //   try {
// //     await ResultDisaggregation.deleteMany({
// //       indicator_result: indicatorResult._id,
// //       source: "auto",
// //     });

// //     if (indicator.disaggregation_type === "gender") {
// //       const maleCount = beneficiaries.filter(
// //         (b) => b.sex?.toLowerCase() === "male"
// //       ).length;

// //       const femaleCount = beneficiaries.filter(
// //         (b) => b.sex?.toLowerCase() === "female"
// //       ).length;

// //       if (maleCount > 0) {
// //         await ResultDisaggregation.create({
// //           indicator_result: indicatorResult._id,
// //           type: "gender",
// //           value: "male",
// //           result_value: maleCount,
// //           source: "auto",
// //         });
// //       }

// //       if (femaleCount > 0) {
// //         await ResultDisaggregation.create({
// //           indicator_result: indicatorResult._id,
// //           type: "gender",
// //           value: "female",
// //           result_value: femaleCount,
// //           source: "auto",
// //         });
// //       }
// //     }

// //     if (indicator.disaggregation_type === "category") {
// //       const grouped = {};

// //       beneficiaries.forEach((b) => {
// //         const key = b.category || "unknown";
// //         grouped[key] = (grouped[key] || 0) + 1;
// //       });

// //       for (const category in grouped) {
// //         await ResultDisaggregation.create({
// //           indicator_result: indicatorResult._id,
// //           type: "category",
// //           value: category,
// //           result_value: grouped[category],
// //           source: "auto",
// //         });
// //       }
// //     }

// //     if (indicator.disaggregation_type === "age") {
// //       const youth = beneficiaries.filter((b) => Number(b.age) < 35).length;
// //       const adult = beneficiaries.filter((b) => Number(b.age) >= 35).length;

// //       if (youth > 0) {
// //         await ResultDisaggregation.create({
// //           indicator_result: indicatorResult._id,
// //           type: "age",
// //           value: "youth",
// //           result_value: youth,
// //           source: "auto",
// //         });
// //       }

// //       if (adult > 0) {
// //         await ResultDisaggregation.create({
// //           indicator_result: indicatorResult._id,
// //           type: "age",
// //           value: "adult",
// //           result_value: adult,
// //           source: "auto",
// //         });
// //       }
// //     }
// //   } catch (error) {
// //     console.log("Disaggregation generation error:", error.message);
// //   }
// // };

// // export const updateAutoIndicatorResult = async ({
// //   indicatorId,
// //   year,
// //   quarter,
// //   userId,
// // }) => {
// //   const indicator = await Indicator.findById(indicatorId);

// //   if (!indicator) {
// //     throw new Error("Indicator not found");
// //   }

// //   const actualValue = await calculateIndicatorValue(indicator);
// //   const { records, model } = await getSourceRecords(indicator);
// //   const structure = extractStructureFromRecords(records);

// //   await IndicatorResult.deleteMany({
// //     indicator: indicator._id,
// //     period_year: year,
// //     period_quarter: quarter,
// //   });

// //   const result = await IndicatorResult.create({
// //     indicator: indicator._id,
// //     period_year: year,
// //     period_quarter: quarter,
// //     result_value: actualValue,
// //     data_source: "auto_aggregation",
// //     comments: "Automatically calculated from linked field data",
// //     statusApproval: "pending",
// //     createdBy: userId,

// //     component: structure.component,
// //     subcomponent: structure.subcomponent,
// //     value_chain: structure.value_chain,
// //     community: structure.community,
// //     community_group: structure.community_group,

// //     source_model: model,
// //     source_records: records.map((r) => r._id),
// //   });

// //   if (indicator.source_type === "beneficiary") {
// //     await generateDisaggregation(result, indicator, records);
// //   }

// //   return result;
// // };

// // export const updateAllAutoIndicatorResults = async ({
// //   year,
// //   quarter,
// //   userId,
// // }) => {
// //   const indicators = await Indicator.find({ is_active: true });

// //   const results = [];

// //   for (const indicator of indicators) {
// //     const result = await updateAutoIndicatorResult({
// //       indicatorId: indicator._id,
// //       year,
// //       quarter,
// //       userId,
// //     });

// //     results.push(result);
// //   }

// //   return results;
// // };

// import Indicator from "../models/Indicator.js";
// import IndicatorResult from "../models/IndicatorResult.js";
// import IndicatorTarget from "../models/IndicatorTarget.js";
// import Beneficiary from "../models/Beneficiary.js";
// import Service from "../models/Service.js";
// import Activity from "../models/Activity.js";
// import ResultDisaggregation from "../models/ResultDisaggregation.js";

// const buildFilter = (indicator) => {
//   const filter = {};

//   if (indicator.source_type === "beneficiary" && indicator.category_filter) {
//     filter.category = indicator.category_filter;
//   }

//   if (indicator.source_type === "service" && indicator.service_type_filter) {
//     filter.service_type = indicator.service_type_filter;
//   }

//   if (indicator.source_type === "activity" && indicator.activity_status_filter) {
//     filter.status = indicator.activity_status_filter;
//   }

//   return filter;
// };

// const calculatePerformance = async ({
//   indicatorId,
//   year,
//   quarter,
//   actualValue,
// }) => {
//   const target = await IndicatorTarget.findOne({
//     indicator: indicatorId,
//     target_year: Number(year),
//     target_quarter: quarter,
//     status: "active",
//   });

//   const targetValue = Number(target?.target_value || 0);
//   const resultValue = Number(actualValue || 0);

//   const achievement =
//     targetValue > 0 ? Number(((resultValue / targetValue) * 100).toFixed(2)) : 0;

//   const variance = Number((resultValue - targetValue).toFixed(2));

//   let performanceStatus = "on_track";

//   if (targetValue <= 0) {
//     performanceStatus = "off_track";
//   } else if (achievement < 70) {
//     performanceStatus = "off_track";
//   } else if (achievement < 90) {
//     performanceStatus = "at_risk";
//   }

//   return {
//     target_value: targetValue,
//     achievement_percentage: achievement,
//     variance,
//     performance_status: performanceStatus,
//   };
// };

// export const calculateIndicatorValue = async (indicator) => {
//   const filter = buildFilter(indicator);

//   if (indicator.source_type === "beneficiary") {
//     return Beneficiary.countDocuments(filter);
//   }

//   if (indicator.source_type === "service") {
//     if (indicator.aggregation_field === "quantity") {
//       const result = await Service.aggregate([
//         { $match: filter },
//         {
//           $group: {
//             _id: null,
//             total: { $sum: "$quantity" },
//           },
//         },
//       ]);

//       return result.length > 0 ? result[0].total : 0;
//     }

//     return Service.countDocuments(filter);
//   }

//   if (indicator.source_type === "activity") {
//     return Activity.countDocuments(filter);
//   }

//   return 0;
// };

// const getSourceRecords = async (indicator) => {
//   const filter = buildFilter(indicator);

//   if (indicator.source_type === "beneficiary") {
//     return {
//       records: await Beneficiary.find(filter),
//       model: "Beneficiary",
//     };
//   }

//   if (indicator.source_type === "service") {
//     return {
//       records: await Service.find(filter),
//       model: "Service",
//     };
//   }

//   if (indicator.source_type === "activity") {
//     return {
//       records: await Activity.find(filter),
//       model: "Activity",
//     };
//   }

//   return {
//     records: [],
//     model: null,
//   };
// };

// const extractStructureFromRecords = (records) => {
//   const first = records[0];

//   if (!first) {
//     return {
//       component: null,
//       subcomponent: null,
//       value_chain: null,
//       community: null,
//       community_group: null,
//     };
//   }

//   return {
//     component: first.component || null,
//     subcomponent: first.subcomponent || null,
//     value_chain: first.value_chain || null,
//     community: first.community || null,
//     community_group: first.community_group || null,
//   };
// };

// const generateDisaggregation = async (
//   indicatorResult,
//   indicator,
//   beneficiaries
// ) => {
//   try {
//     await ResultDisaggregation.deleteMany({
//       indicator_result: indicatorResult._id,
//       source: "auto",
//     });

//     if (indicator.disaggregation_type === "gender") {
//       const maleCount = beneficiaries.filter(
//         (b) => b.sex?.toLowerCase() === "male"
//       ).length;

//       const femaleCount = beneficiaries.filter(
//         (b) => b.sex?.toLowerCase() === "female"
//       ).length;

//       if (maleCount > 0) {
//         await ResultDisaggregation.create({
//           indicator_result: indicatorResult._id,
//           type: "gender",
//           value: "male",
//           result_value: maleCount,
//           source: "auto",
//         });
//       }

//       if (femaleCount > 0) {
//         await ResultDisaggregation.create({
//           indicator_result: indicatorResult._id,
//           type: "gender",
//           value: "female",
//           result_value: femaleCount,
//           source: "auto",
//         });
//       }
//     }

//     if (indicator.disaggregation_type === "category") {
//       const grouped = {};

//       beneficiaries.forEach((b) => {
//         const key = b.category || "unknown";
//         grouped[key] = (grouped[key] || 0) + 1;
//       });

//       for (const category in grouped) {
//         await ResultDisaggregation.create({
//           indicator_result: indicatorResult._id,
//           type: "category",
//           value: category,
//           result_value: grouped[category],
//           source: "auto",
//         });
//       }
//     }

//     if (indicator.disaggregation_type === "age") {
//       const youth = beneficiaries.filter((b) => Number(b.age) < 35).length;
//       const adult = beneficiaries.filter((b) => Number(b.age) >= 35).length;

//       if (youth > 0) {
//         await ResultDisaggregation.create({
//           indicator_result: indicatorResult._id,
//           type: "age",
//           value: "youth",
//           result_value: youth,
//           source: "auto",
//         });
//       }

//       if (adult > 0) {
//         await ResultDisaggregation.create({
//           indicator_result: indicatorResult._id,
//           type: "age",
//           value: "adult",
//           result_value: adult,
//           source: "auto",
//         });
//       }
//     }
//   } catch (error) {
//     console.log("Disaggregation generation error:", error.message);
//   }
// };

// export const updateAutoIndicatorResult = async ({
//   indicatorId,
//   year,
//   quarter,
//   userId,
// }) => {
//   const indicator = await Indicator.findById(indicatorId);

//   if (!indicator) {
//     throw new Error("Indicator not found");
//   }

//   const actualValue = await calculateIndicatorValue(indicator);

//   const { records, model } = await getSourceRecords(indicator);

//   const structure = extractStructureFromRecords(records);

//   const performance = await calculatePerformance({
//     indicatorId: indicator._id,
//     year,
//     quarter,
//     actualValue,
//   });

//   await IndicatorResult.deleteMany({
//     indicator: indicator._id,
//     period_year: year,
//     period_quarter: quarter,
//   });

//   const result = await IndicatorResult.create({
//     indicator: indicator._id,
//     period_year: year,
//     period_quarter: quarter,
//     result_value: actualValue,

//     ...performance,

//     data_source: "auto_aggregation",
//     comments: "Automatically calculated from linked field data",
//     statusApproval: "pending",
//     createdBy: userId,

//     component: structure.component,
//     subcomponent: structure.subcomponent,
//     value_chain: structure.value_chain,
//     community: structure.community,
//     community_group: structure.community_group,

//     source_model: model,
//     source_records: records.map((r) => r._id),
//   });

//   if (indicator.source_type === "beneficiary") {
//     await generateDisaggregation(result, indicator, records);
//   }

//   return result;
// };

// export const updateAllAutoIndicatorResults = async ({
//   year,
//   quarter,
//   userId,
// }) => {
//   const indicators = await Indicator.find({ is_active: true });

//   const results = [];

//   for (const indicator of indicators) {
//     const result = await updateAutoIndicatorResult({
//       indicatorId: indicator._id,
//       year,
//       quarter,
//       userId,
//     });

//     results.push(result);
//   }

//   return results;
// };

import Indicator from "../models/Indicator.js";
import IndicatorResult from "../models/IndicatorResult.js";
import IndicatorTarget from "../models/IndicatorTarget.js";
import Beneficiary from "../models/Beneficiary.js";
import Service from "../models/Service.js";
import Activity from "../models/Activity.js";
import ResultDisaggregation from "../models/ResultDisaggregation.js";

const buildFilter = (indicator) => {
  const filter = {};

  if (indicator.source_type === "beneficiary" && indicator.category_filter) {
    filter.category = indicator.category_filter;
  }

  if (indicator.source_type === "service" && indicator.service_type_filter) {
    filter.service_type = indicator.service_type_filter;
  }

  if (indicator.source_type === "activity" && indicator.activity_status_filter) {
    filter.status = indicator.activity_status_filter;
  }

  return filter;
};

const calculatePerformance = async ({
  indicatorId,
  year,
  quarter,
  actualValue,
}) => {
  const target = await IndicatorTarget.findOne({
    indicator: indicatorId,
    target_year: Number(year),
    target_quarter: quarter,
    status: "active",
  });

  const targetValue = Number(target?.target_value || 0);
  const resultValue = Number(actualValue || 0);

  const achievement =
    targetValue > 0
      ? Number(((resultValue / targetValue) * 100).toFixed(2))
      : 0;

  const variance = Number((resultValue - targetValue).toFixed(2));

  let performanceStatus = "on_track";

  if (targetValue <= 0) {
    performanceStatus = "off_track";
  } else if (achievement < 70) {
    performanceStatus = "off_track";
  } else if (achievement < 90) {
    performanceStatus = "at_risk";
  }

  return {
    target_value: targetValue,
    achievement_percentage: achievement,
    variance,
    performance_status: performanceStatus,
  };
};

export const calculateIndicatorValue = async (indicator) => {
  const filter = buildFilter(indicator);

  if (indicator.source_type === "beneficiary") {
    return Beneficiary.countDocuments(filter);
  }

  if (indicator.source_type === "service") {
    if (indicator.aggregation_field === "quantity") {
      const result = await Service.aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      return result.length > 0 ? result[0].total : 0;
    }

    return Service.countDocuments(filter);
  }

  if (indicator.source_type === "activity") {
    return Activity.countDocuments(filter);
  }

  return 0;
};

const getSourceRecords = async (indicator) => {
  const filter = buildFilter(indicator);

  if (indicator.source_type === "beneficiary") {
    return {
      records: await Beneficiary.find(filter),
      model: "Beneficiary",
    };
  }

  if (indicator.source_type === "service") {
    return {
      records: await Service.find(filter),
      model: "Service",
    };
  }

  if (indicator.source_type === "activity") {
    return {
      records: await Activity.find(filter),
      model: "Activity",
    };
  }

  return {
    records: [],
    model: null,
  };
};

const extractStructureFromRecords = (records) => {
  const first = records[0];

  if (!first) {
    return {
      component: null,
      subcomponent: null,
      value_chain: null,
      community: null,
      community_group: null,
    };
  }

  return {
    component: first.component || null,
    subcomponent: first.subcomponent || null,
    value_chain: first.value_chain || null,
    community: first.community || null,
    community_group: first.community_group || null,
  };
};

const createAutoDisaggregation = async ({
  indicatorResult,
  disaggregationType,
  disaggregationValue,
  resultValue,
}) => {
  if (!resultValue || Number(resultValue) <= 0) return;

  await ResultDisaggregation.create({
    indicator_result: indicatorResult._id,
    disaggregation_type: disaggregationType,
    disaggregation_value: disaggregationValue,
    result_value: Number(resultValue),
    source: "auto",
  });
};

const generateDisaggregation = async (
  indicatorResult,
  indicator,
  beneficiaries
) => {
  try {
    await ResultDisaggregation.deleteMany({
      indicator_result: indicatorResult._id,
      source: "auto",
    });

    if (!beneficiaries || beneficiaries.length === 0) return;

    if (indicator.disaggregation_type === "gender") {
      const maleCount = beneficiaries.filter(
        (b) => b.sex?.toLowerCase() === "male"
      ).length;

      const femaleCount = beneficiaries.filter(
        (b) => b.sex?.toLowerCase() === "female"
      ).length;

      await createAutoDisaggregation({
        indicatorResult,
        disaggregationType: "gender",
        disaggregationValue: "male",
        resultValue: maleCount,
      });

      await createAutoDisaggregation({
        indicatorResult,
        disaggregationType: "gender",
        disaggregationValue: "female",
        resultValue: femaleCount,
      });
    }

    if (indicator.disaggregation_type === "category") {
      const grouped = {};

      beneficiaries.forEach((b) => {
        const key = b.category || "unknown";
        grouped[key] = (grouped[key] || 0) + 1;
      });

      for (const category in grouped) {
        await createAutoDisaggregation({
          indicatorResult,
          disaggregationType: "category",
          disaggregationValue: category,
          resultValue: grouped[category],
        });
      }
    }

    if (indicator.disaggregation_type === "age") {
      const youth = beneficiaries.filter((b) => Number(b.age) < 35).length;
      const adult = beneficiaries.filter((b) => Number(b.age) >= 35).length;

      await createAutoDisaggregation({
        indicatorResult,
        disaggregationType: "age",
        disaggregationValue: "youth",
        resultValue: youth,
      });

      await createAutoDisaggregation({
        indicatorResult,
        disaggregationType: "age",
        disaggregationValue: "adult",
        resultValue: adult,
      });
    }
  } catch (error) {
    console.log("Disaggregation generation error:", error.message);
  }
};

export const updateAutoIndicatorResult = async ({
  indicatorId,
  year,
  quarter,
  userId,
}) => {
  const indicator = await Indicator.findById(indicatorId);

  if (!indicator) {
    throw new Error("Indicator not found");
  }

  const actualValue = await calculateIndicatorValue(indicator);
  const { records, model } = await getSourceRecords(indicator);
  const structure = extractStructureFromRecords(records);

  const performance = await calculatePerformance({
    indicatorId: indicator._id,
    year,
    quarter,
    actualValue,
  });

  await IndicatorResult.deleteMany({
    indicator: indicator._id,
    period_year: year,
    period_quarter: quarter,
  });

  const result = await IndicatorResult.create({
    indicator: indicator._id,
    period_year: year,
    period_quarter: quarter,
    result_value: actualValue,

    ...performance,

    data_source: "auto_aggregation",
    comments: "Automatically calculated from linked field data",
    statusApproval: "pending",
    createdBy: userId,

    component: structure.component,
    subcomponent: structure.subcomponent,
    value_chain: structure.value_chain,
    community: structure.community,
    community_group: structure.community_group,

    source_model: model,
    source_records: records.map((r) => r._id),
  });

  if (indicator.source_type === "beneficiary") {
    await generateDisaggregation(result, indicator, records);
  }

  return result;
};

export const updateAllAutoIndicatorResults = async ({
  year,
  quarter,
  userId,
}) => {
  const indicators = await Indicator.find({ is_active: true });

  const results = [];

  for (const indicator of indicators) {
    const result = await updateAutoIndicatorResult({
      indicatorId: indicator._id,
      year,
      quarter,
      userId,
    });

    results.push(result);
  }

  return results;
};