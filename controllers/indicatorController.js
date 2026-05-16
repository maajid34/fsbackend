// // import Indicator from "../models/Indicator.js";
// // import { logAction } from "../utils/logAction.js";

// // // CREATE
// // export const createIndicator = async (req, res) => {
// //   try {
// //     const indicator = await Indicator.create({
// //       ...req.body,
// //       createdBy: req.user._id,
// //     });

// //     await logAction(
// //       req.user._id,
// //       "CREATE",
// //       "indicator",
// //       indicator._id,
// //       `Created indicator ${indicator.name}`
// //     );

// //     res.status(201).json(indicator);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // GET
// // export const getIndicators = async (req, res) => {
// //   const data = await Indicator.find();
// //   res.json(data);
// // };

// // // UPDATE PROGRESS
// // export const updateProgress = async (req, res) => {
// //   const indicator = await Indicator.findById(req.params.id);

// //   indicator.achieved = req.body.achieved;
// //   await indicator.save();

// //   await logAction(
// //     req.user._id,
// //     "UPDATE",
// //     "indicator",
// //     indicator._id,
// //     `Updated progress to ${indicator.achieved}`
// //   );

// //   res.json(indicator);
// // };

// import Indicator from "../models/Indicator.js";

// // CREATE
// export const createIndicator = async (req, res) => {
//   try {
//     const { name, level, baseline, yearlyTarget, endTarget, unit } =
//       req.body;

//     const indicator = await Indicator.create({
//       name,
//       level,
//       baseline,
//       yearlyTarget,
//       endTarget,
//       unit,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(indicator);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET ALL
// export const getIndicators = async (req, res) => {
//   const data = await Indicator.find();
//   res.json(data);
// };

// // UPDATE PROGRESS
// export const updateIndicator = async (req, res) => {
//   try {
//     const { achieved } = req.body;

//     const indicator = await Indicator.findById(req.params.id);

//     if (!indicator) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     indicator.achieved = achieved;

//     // 🔥 AUTO CALCULATE PROGRESS
//     indicator.progress = (
//       (achieved / indicator.endTarget) *
//       100
//     ).toFixed(1);

//     await indicator.save();

//     res.json(indicator);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// export const getPerformance = async (req, res) => {
//   try {
//     const indicators = await Indicator.find();

//     const result = indicators.map((i) => {
//       const progress = i.endTarget
//         ? Math.round((i.achieved / i.endTarget) * 100)
//         : 0;

//       let status = "red";
//       if (progress >= 80) status = "green";
//       else if (progress >= 50) status = "yellow";

//       return {
//         ...i._doc,
//         progress,
//         status,
//       };
//     });

//     // KPI SUMMARY
//     const summary = {
//       total: result.length,
//       green: result.filter((i) => i.status === "green").length,
//       yellow: result.filter((i) => i.status === "yellow").length,
//       red: result.filter((i) => i.status === "red").length,
//     };

//     res.json({ indicators: result, summary });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// export const getIndicatorProgress = async (req, res) => {
//   try {
//     const indicators = await Indicator.find();

//     const result = indicators.map((i) => {
//       const progress = (i.achieved / i.target) * 100;

//       let status = "green";
//       if (progress < 50) status = "red";
//       else if (progress < 80) status = "yellow";

//       return {
//         name: i.name,
//         target: i.target,
//         achieved: i.achieved,
//         progress: progress.toFixed(1),
//         status,
//       };
//     });

//     res.json(result);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Indicator from "../models/Indicator.js";
import IndicatorTarget from "../models/IndicatorTarget.js";
import IndicatorResult from "../models/IndicatorResult.js";

// CREATE INDICATOR
export const createIndicator = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      indicator_type,
      unit_of_measure,
      disaggregation_type,
      baseline_value,
      target_value,
      actual_value,
      reporting_frequency,
      status,
    } = req.body;

    if (
      !code ||
      !name ||
      !indicator_type ||
      !unit_of_measure
    ) {
      return res.status(400).json({
        message:
          "Code, name, indicator type and unit of measure are required",
      });
    }

    const indicatorExists = await Indicator.findOne({
      code,
    });

    if (indicatorExists) {
      return res.status(400).json({
        message: "Indicator code already exists",
      });
    }

    const indicator = await Indicator.create({
      code,
      name,
      description,
      indicator_type,
      unit_of_measure,
      disaggregation_type,
      baseline_value,
      target_value,
      actual_value,
      reporting_frequency,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(indicator);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL INDICATORS
export const getIndicators = async (
  req,
  res
) => {
  try {
    const indicators = await Indicator.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(indicators);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE INDICATOR
export const getIndicatorById = async (
  req,
  res
) => {
  try {
    const indicator = await Indicator.findById(
      req.params.id
    ).populate("createdBy", "name role");

    if (!indicator) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    res.json(indicator);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE INDICATOR
export const updateIndicator = async (
  req,
  res
) => {
  try {
    const indicator =
      await Indicator.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate("createdBy", "name role");

    if (!indicator) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    res.json(indicator);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE INDICATOR
export const deleteIndicator = async (
  req,
  res
) => {
  try {
    const indicator =
      await Indicator.findByIdAndDelete(
        req.params.id
      );

    if (!indicator) {
      return res.status(404).json({
        message: "Indicator not found",
      });
    }

    res.json({
      message:
        "Indicator deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getIndicatorPerformance = async (req, res) => {
  try {
    const { year, quarter } = req.query;

    if (!year || !quarter) {
      return res.status(400).json({
        message: "Year and quarter are required",
      });
    }

    const targets = await IndicatorTarget.find({
      target_year: Number(year),
      target_quarter: quarter,
      status: "active",
    }).populate("indicator", "code name indicator_type unit_of_measure");

    const performance = await Promise.all(
      targets.map(async (target) => {
        const results = await IndicatorResult.find({
          indicator: target.indicator._id,
          period_year: Number(year),
          period_quarter: quarter,
          statusApproval: "pending",
        });

        const actual = results.reduce(
          (sum, item) => sum + item.result_value,
          0
        );

        const progress =
          target.target_value > 0
            ? (actual / target.target_value) * 100
            : 0;

        const variance = actual - target.target_value;

        let status = "on_track";

        if (progress < 50) {
          status = "off_track";
        } else if (progress < 80) {
          status = "at_risk";
        }

        return {
          indicator_id: target.indicator._id,
          code: target.indicator.code,
          name: target.indicator.name,
          indicator_type: target.indicator.indicator_type,
          unit_of_measure: target.indicator.unit_of_measure,
          year: Number(year),
          quarter,
          target: target.target_value,
          actual,
          progress: Number(progress.toFixed(1)),
          variance,
          status,
        };
      })
    );

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};