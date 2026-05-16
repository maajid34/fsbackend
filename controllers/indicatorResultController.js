// // import IndicatorResult from "../models/IndicatorResult.js";
// // import Indicator from "../models/Indicator.js";

// // // CREATE RESULT
// // export const createIndicatorResult = async (req, res) => {
// //   try {
// //     const {
// //       indicator,
// //       period_year,
// //       period_quarter,
// //       result_value,
// //       data_source,
// //       comments,
// //       statusApproval,
// //     } = req.body;

// //     if (!indicator || !period_year || !period_quarter || result_value === undefined) {
// //       return res.status(400).json({
// //         message: "Indicator, period year, period quarter and result value are required",
// //       });
// //     }

// //     const indicatorExists = await Indicator.findById(indicator);

// //     if (!indicatorExists) {
// //       return res.status(404).json({
// //         message: "Indicator not found",
// //       });
// //     }

// //     const result = await IndicatorResult.create({
// //       indicator,
// //       period_year,
// //       period_quarter,
// //       result_value,
// //       data_source,
// //       comments,
// //       statusApproval,
// //       createdBy: req.user._id,
// //     });

    

// //     res.status(201).json(result);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // GET ALL RESULTS
// // export const getIndicatorResults = async (req, res) => {
// //   try {
// //     const results = await IndicatorResult.find()
// //       .populate("indicator", "code name indicator_type unit_of_measure")
// //       .populate("createdBy", "name role")
// //       .sort({ createdAt: -1 });

// //     res.json(results);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // GET SINGLE RESULT
// // export const getIndicatorResultById = async (req, res) => {
// //   try {
// //     const result = await IndicatorResult.findById(req.params.id)
// //       .populate("indicator", "code name indicator_type unit_of_measure")
// //       .populate("createdBy", "name role");

// //     if (!result) {
// //       return res.status(404).json({
// //         message: "Indicator result not found",
// //       });
// //     }

// //     res.json(result);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // UPDATE RESULT
// // export const updateIndicatorResult = async (req, res) => {
// //   try {
// //     if (req.body.indicator) {
// //       const indicatorExists = await Indicator.findById(req.body.indicator);

// //       if (!indicatorExists) {
// //         return res.status(404).json({
// //           message: "Indicator not found",
// //         });
// //       }
// //     }

// //     const result = await IndicatorResult.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     )
// //       .populate("indicator", "code name indicator_type unit_of_measure")
// //       .populate("createdBy", "name role");

// //     if (!result) {
// //       return res.status(404).json({
// //         message: "Indicator result not found",
// //       });
// //     }

// //     res.json(result);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // DELETE RESULT
// // export const deleteIndicatorResult = async (req, res) => {
// //   try {
// //     const result = await IndicatorResult.findByIdAndDelete(req.params.id);

// //     if (!result) {
// //       return res.status(404).json({
// //         message: "Indicator result not found",
// //       });
// //     }

// //     res.json({
// //       message: "Indicator result deleted successfully",
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// import IndicatorResult from "../models/IndicatorResult.js";
// import Indicator from "../models/Indicator.js";

// const populateIndicatorResult = (query) => {
//   return query
//     .populate("indicator", "code name indicator_type unit_of_measure source_type aggregation_field disaggregation_type")
//     .populate("component", "code name")
//     .populate("subcomponent", "code name")
//     .populate("value_chain", "name category")
//     .populate({
//       path: "community",
//       select: "name type district",
//       populate: {
//         path: "district",
//         select: "name code",
//       },
//     })
//     .populate("community_group", "name group_type")
//     .populate("createdBy", "name role");
// };

// const cleanPayload = (body) => {
//   return {
//     ...body,
//     result_value: Number(body.result_value || 0),
//     component: body.component || null,
//     subcomponent: body.subcomponent || null,
//     value_chain: body.value_chain || null,
//     community: body.community || null,
//     community_group: body.community_group || null,
//   };
// };

// // CREATE RESULT
// export const createIndicatorResult = async (req, res) => {
//   try {
//     const {
//       indicator,
//       period_year,
//       period_quarter,
//       result_value,
//     } = req.body;

//     if (
//       !indicator ||
//       !period_year ||
//       !period_quarter ||
//       result_value === undefined
//     ) {
//       return res.status(400).json({
//         message:
//           "Indicator, period year, period quarter and result value are required",
//       });
//     }

//     const indicatorExists = await Indicator.findById(indicator);

//     if (!indicatorExists) {
//       return res.status(404).json({
//         message: "Indicator not found",
//       });
//     }

//     const payload = cleanPayload(req.body);

//     const result = await IndicatorResult.create({
//       ...payload,
//       data_source: payload.data_source || "manual_entry",
//       statusApproval: payload.statusApproval || "pending",
//       createdBy: req.user._id,
//     });

//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL RESULTS
// export const getIndicatorResults = async (req, res) => {
//   try {
//     const results = await populateIndicatorResult(
//       IndicatorResult.find().sort({ createdAt: -1 })
//     );

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE RESULT
// export const getIndicatorResultById = async (req, res) => {
//   try {
//     const result = await populateIndicatorResult(
//       IndicatorResult.findById(req.params.id)
//     );

//     if (!result) {
//       return res.status(404).json({
//         message: "Indicator result not found",
//       });
//     }

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE RESULT
// export const updateIndicatorResult = async (req, res) => {
//   try {
//     if (req.body.indicator) {
//       const indicatorExists = await Indicator.findById(req.body.indicator);

//       if (!indicatorExists) {
//         return res.status(404).json({
//           message: "Indicator not found",
//         });
//       }
//     }

//     const payload = cleanPayload(req.body);

//     const result = await populateIndicatorResult(
//       IndicatorResult.findByIdAndUpdate(req.params.id, payload, {
//         new: true,
//       })
//     );

//     if (!result) {
//       return res.status(404).json({
//         message: "Indicator result not found",
//       });
//     }

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE RESULT
// export const deleteIndicatorResult = async (req, res) => {
//   try {
//     const result = await IndicatorResult.findByIdAndDelete(req.params.id);

//     if (!result) {
//       return res.status(404).json({
//         message: "Indicator result not found",
//       });
//     }

//     res.json({
//       message: "Indicator result deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import IndicatorResult from "../models/IndicatorResult.js";
import Indicator from "../models/Indicator.js";
import IndicatorTarget from "../models/IndicatorTarget.js";

const calculatePerformance = async ({
  indicator,
  period_year,
  period_quarter,
  result_value,
}) => {
  const target = await IndicatorTarget.findOne({
    indicator,
    target_year: Number(period_year),
    target_quarter: period_quarter,
    status: "active",
  });

  const targetValue = Number(target?.target_value || 0);
  const actualValue = Number(result_value || 0);

  const achievement =
    targetValue > 0 ? Number(((actualValue / targetValue) * 100).toFixed(2)) : 0;

  const variance = Number((actualValue - targetValue).toFixed(2));

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

const populateIndicatorResult = (query) => {
  return query
    .populate(
      "indicator",
      "code name indicator_type unit_of_measure source_type aggregation_field disaggregation_type"
    )
    .populate("component", "code name")
    .populate("subcomponent", "code name")
    .populate("value_chain", "name category")
    .populate({
      path: "community",
      select: "name type district",
      populate: {
        path: "district",
        select: "name code",
      },
    })
    .populate("community_group", "name group_type")
    .populate("createdBy", "name role");
};

const cleanPayload = (body) => {
  return {
    ...body,
    period_year: Number(body.period_year),
    result_value: Number(body.result_value || 0),
    component: body.component || null,
    subcomponent: body.subcomponent || null,
    value_chain: body.value_chain || null,
    community: body.community || null,
    community_group: body.community_group || null,
  };
};

export const createIndicatorResult = async (req, res) => {
  try {
    const { indicator, period_year, period_quarter, result_value } = req.body;

    if (
      !indicator ||
      !period_year ||
      !period_quarter ||
      result_value === undefined
    ) {
      return res.status(400).json({
        message:
          "Indicator, period year, period quarter and result value are required",
      });
    }

    const indicatorExists = await Indicator.findById(indicator);

    if (!indicatorExists) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    const payload = cleanPayload(req.body);

    const performance = await calculatePerformance({
      indicator: payload.indicator,
      period_year: payload.period_year,
      period_quarter: payload.period_quarter,
      result_value: payload.result_value,
    });

    const result = await IndicatorResult.create({
      ...payload,
      ...performance,
      data_source: payload.data_source || "manual_entry",
      statusApproval: payload.statusApproval || "pending",
      createdBy: req.user._id,
    });

    const populated = await populateIndicatorResult(
      IndicatorResult.findById(result._id)
    );

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIndicatorResults = async (req, res) => {
  try {
    const results = await populateIndicatorResult(
      IndicatorResult.find().sort({ createdAt: -1 })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIndicatorResultById = async (req, res) => {
  try {
    const result = await populateIndicatorResult(
      IndicatorResult.findById(req.params.id)
    );

    if (!result) {
      return res.status(404).json({
        message: "Indicator result not found",
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIndicatorResult = async (req, res) => {
  try {
    if (req.body.indicator) {
      const indicatorExists = await Indicator.findById(req.body.indicator);

      if (!indicatorExists) {
        return res.status(404).json({
          message: "Indicator not found",
        });
      }
    }

    const existing = await IndicatorResult.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        message: "Indicator result not found",
      });
    }

    const payload = cleanPayload({
      ...existing.toObject(),
      ...req.body,
    });

    const performance = await calculatePerformance({
      indicator: payload.indicator,
      period_year: payload.period_year,
      period_quarter: payload.period_quarter,
      result_value: payload.result_value,
    });

    const result = await populateIndicatorResult(
      IndicatorResult.findByIdAndUpdate(
        req.params.id,
        {
          ...payload,
          ...performance,
        },
        { new: true }
      )
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIndicatorResult = async (req, res) => {
  try {
    const result = await IndicatorResult.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Indicator result not found",
      });
    }

    res.json({
      message: "Indicator result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};