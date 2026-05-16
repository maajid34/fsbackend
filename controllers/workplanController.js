// import Workplan from "../models/Workplan.js";

// export const createWorkplan = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       createdBy: req.user._id,
//     };

//     data.total_budget =
//       Number(data.projected_cost_q1 || 0) +
//       Number(data.projected_cost_q2 || 0) +
//       Number(data.projected_cost_q3 || 0) +
//       Number(data.projected_cost_q4 || 0);

//     data.budget_variance =
//       data.total_budget -
//       Number(data.actual_expenditure || 0);

//     const workplan =
//       await Workplan.create(data);

//     res.status(201).json(workplan);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getWorkplans = async (
//   req,
//   res
// ) => {
//   try {
//     const workplans =
//       await Workplan.find()
//         .populate(
//           "component",
//           "code name"
//         )
//         .populate(
//           "subcomponent",
//           "code name"
//         )
//         .populate(
//           "activity",
//           "title"
//         )
//         .populate(
//           "createdBy",
//           "name"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     res.json(workplans);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getWorkplanById =
//   async (req, res) => {
//     try {
//       const workplan =
//         await Workplan.findById(
//           req.params.id
//         )
//           .populate(
//             "component",
//             "code name"
//           )
//           .populate(
//             "subcomponent",
//             "code name"
//           )
//           .populate(
//             "activity",
//             "title"
//           )
//           .populate(
//             "createdBy",
//             "name"
//           );

//       if (!workplan) {
//         return res.status(404).json({
//           message:
//             "Workplan not found",
//         });
//       }

//       res.json(workplan);
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// export const updateWorkplan =
//   async (req, res) => {
//     try {
//       const data = {
//         ...req.body,
//       };

//       data.total_budget =
//         Number(
//           data.projected_cost_q1 || 0
//         ) +
//         Number(
//           data.projected_cost_q2 || 0
//         ) +
//         Number(
//           data.projected_cost_q3 || 0
//         ) +
//         Number(
//           data.projected_cost_q4 || 0
//         );

//       data.budget_variance =
//         data.total_budget -
//         Number(
//           data.actual_expenditure ||
//             0
//         );

//       const workplan =
//         await Workplan.findByIdAndUpdate(
//           req.params.id,
//           data,
//           {
//             new: true,
//           }
//         );

//       if (!workplan) {
//         return res.status(404).json({
//           message:
//             "Workplan not found",
//         });
//       }

//       res.json(workplan);
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// export const deleteWorkplan =
//   async (req, res) => {
//     try {
//       const workplan =
//         await Workplan.findByIdAndDelete(
//           req.params.id
//         );

//       if (!workplan) {
//         return res.status(404).json({
//           message:
//             "Workplan not found",
//         });
//       }

//       res.json({
//         message:
//           "Workplan deleted successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

import Workplan from "../models/Workplan.js";

export const createWorkplan = async (
  req,
  res
) => {
  try {
    const workplan =
      await Workplan.create({
        ...req.body,
        createdBy: req.user._id,
      });

    res.status(201).json(workplan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkplans = async (
  req,
  res
) => {
  try {
    const workplans =
      await Workplan.find()
        .populate(
          "component",
          "code name"
        )
        .populate(
          "subcomponent",
          "code name"
        )
        .populate(
          "createdBy",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    res.json(workplans);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkplanById =
  async (req, res) => {
    try {
      const workplan =
        await Workplan.findById(
          req.params.id
        )
          .populate(
            "component",
            "code name"
          )
          .populate(
            "subcomponent",
            "code name"
          )
          .populate(
            "createdBy",
            "name"
          );

      if (!workplan) {
        return res.status(404).json({
          message:
            "Workplan not found",
        });
      }

      res.json(workplan);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateWorkplan =
  async (req, res) => {
    try {
      const workplan =
        await Workplan.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!workplan) {
        return res.status(404).json({
          message:
            "Workplan not found",
        });
      }

      res.json(workplan);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteWorkplan =
  async (req, res) => {
    try {
      const workplan =
        await Workplan.findByIdAndDelete(
          req.params.id
        );

      if (!workplan) {
        return res.status(404).json({
          message:
            "Workplan not found",
        });
      }

      res.json({
        message:
          "Workplan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };