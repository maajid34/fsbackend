// import Expenditure from "../models/Expenditure.js";
// import Workplan from "../models/Workplan.js";

// const populateExpenditure = (query) => {
//   return query
//     .populate({
//       path: "workplan",
//       select:
//         "workplan_no milestone component subcomponent subcomponent_text activity_subactivities milestone_total_budget quarter timeline",
//       populate: [
//         {
//           path: "component",
//           select: "code name",
//         },
//         {
//           path: "subcomponent",
//           select: "code name",
//         },
//       ],
//     })
//     .populate("createdBy", "name role");
// };

// export const createExpenditure = async (req, res) => {
//   try {
//     const {
//       workplan,
//       subactivity_title,
//       expenditure_date,
//       description,
//       amount,
//     } = req.body;

//     if (
//       !workplan ||
//       !subactivity_title ||
//       !expenditure_date ||
//       !description ||
//       amount === undefined
//     ) {
//       return res.status(400).json({
//         message:
//           "Workplan, subactivity, expenditure date, description and amount are required",
//       });
//     }

//     const workplanExists = await Workplan.findById(workplan);

//     if (!workplanExists) {
//       return res.status(404).json({
//         message: "Workplan not found",
//       });
//     }

//     const expenditure = await Expenditure.create({
//       ...req.body,
//       amount: Number(amount),
//       createdBy: req.user._id,
//     });

//     const populated = await populateExpenditure(
//       Expenditure.findById(expenditure._id)
//     );

//     res.status(201).json(populated);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getExpenditures = async (req, res) => {
//   try {
//     const { workplan, statusApproval, expenditure_type } = req.query;

//     const filter = {};

//     if (workplan) filter.workplan = workplan;
//     if (statusApproval) filter.statusApproval = statusApproval;
//     if (expenditure_type) filter.expenditure_type = expenditure_type;

//     const expenditures = await populateExpenditure(
//       Expenditure.find(filter).sort({ expenditure_date: -1, createdAt: -1 })
//     );

//     res.json(expenditures);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getExpenditureById = async (req, res) => {
//   try {
//     const expenditure = await populateExpenditure(
//       Expenditure.findById(req.params.id)
//     );

//     if (!expenditure) {
//       return res.status(404).json({
//         message: "Expenditure not found",
//       });
//     }

//     res.json(expenditure);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const updateExpenditure = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//     };

//     if (data.amount !== undefined) {
//       data.amount = Number(data.amount);
//     }

//     if (data.workplan) {
//       const workplanExists = await Workplan.findById(data.workplan);

//       if (!workplanExists) {
//         return res.status(404).json({
//           message: "Workplan not found",
//         });
//       }
//     }

//     const expenditure = await populateExpenditure(
//       Expenditure.findByIdAndUpdate(req.params.id, data, {
//         new: true,
//       })
//     );

//     if (!expenditure) {
//       return res.status(404).json({
//         message: "Expenditure not found",
//       });
//     }

//     res.json(expenditure);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const deleteExpenditure = async (req, res) => {
//   try {
//     const expenditure = await Expenditure.findByIdAndDelete(req.params.id);

//     if (!expenditure) {
//       return res.status(404).json({
//         message: "Expenditure not found",
//       });
//     }

//     res.json({
//       message: "Expenditure deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getBudgetUtilization = async (req, res) => {
//   try {
//     const workplans = await Workplan.find().populate("component", "code name");
//     const expenditures = await Expenditure.find({
//       statusApproval: { $ne: "rejected" },
//     });

//     const totalBudget = workplans.reduce(
//       (sum, item) => sum + Number(item.milestone_total_budget || 0),
//       0
//     );

//     const utilizedBudget = expenditures.reduce(
//       (sum, item) => sum + Number(item.amount || 0),
//       0
//     );

//     const remainingBudget = totalBudget - utilizedBudget;

//     const utilizationRate =
//       totalBudget > 0
//         ? Number(((utilizedBudget / totalBudget) * 100).toFixed(1))
//         : 0;

//     const byWorkplan = workplans.map((workplan) => {
//       const spent = expenditures
//         .filter((exp) => String(exp.workplan) === String(workplan._id))
//         .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

//       const budget = Number(workplan.milestone_total_budget || 0);

//       return {
//         workplan_id: workplan._id,
//         milestone: workplan.milestone,
//         component: workplan.component
//           ? `${workplan.component.code} - ${workplan.component.name}`
//           : "Unknown",
//         budget,
//         spent,
//         remaining: budget - spent,
//         utilizationRate:
//           budget > 0 ? Number(((spent / budget) * 100).toFixed(1)) : 0,
//       };
//     });

//     res.json({
//       totalBudget,
//       utilizedBudget,
//       remainingBudget,
//       utilizationRate,
//       byWorkplan,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


import Expenditure from "../models/Expenditure.js";
import Workplan from "../models/Workplan.js";

const populateExpenditure = (query) => {
  return query
    .populate({
      path: "workplan",
      select:
        "workplan_year workplan_no milestone component subcomponent subcomponent_text activity_subactivities milestone_total_budget quarter timeline",
      populate: [
        {
          path: "component",
          select: "code name",
        },
        {
          path: "subcomponent",
          select: "code name",
        },
      ],
    })
    .populate("createdBy", "name role");
};

export const createExpenditure = async (req, res) => {
  try {
    const {
      workplan,
      subactivity_title,
      expenditure_date,
      description,
      amount,
    } = req.body;

    if (
      !workplan ||
      !subactivity_title ||
      !expenditure_date ||
      !description ||
      amount === undefined
    ) {
      return res.status(400).json({
        message:
          "Workplan, subactivity, expenditure date, description and amount are required",
      });
    }

    const workplanExists = await Workplan.findById(workplan);

    if (!workplanExists) {
      return res.status(404).json({
        message: "Workplan not found",
      });
    }

    const expenditure = await Expenditure.create({
      ...req.body,
      amount: Number(amount),
      createdBy: req.user._id,
    });

    const populated = await populateExpenditure(
      Expenditure.findById(expenditure._id)
    );

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenditures = async (req, res) => {
  try {
    const { workplan, statusApproval, expenditure_type, year } = req.query;

    const filter = {};

    if (workplan) filter.workplan = workplan;
    if (statusApproval) filter.statusApproval = statusApproval;
    if (expenditure_type) filter.expenditure_type = expenditure_type;

    if (year) {
      const workplans = await Workplan.find({
        workplan_year: Number(year),
      }).select("_id");

      filter.workplan = {
        $in: workplans.map((w) => w._id),
      };
    }

    const expenditures = await populateExpenditure(
      Expenditure.find(filter).sort({
        expenditure_date: -1,
        createdAt: -1,
      })
    );

    res.json(expenditures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenditureById = async (req, res) => {
  try {
    const expenditure = await populateExpenditure(
      Expenditure.findById(req.params.id)
    );

    if (!expenditure) {
      return res.status(404).json({
        message: "Expenditure not found",
      });
    }

    res.json(expenditure);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateExpenditure = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (data.amount !== undefined) {
      data.amount = Number(data.amount);
    }

    if (data.workplan) {
      const workplanExists = await Workplan.findById(data.workplan);

      if (!workplanExists) {
        return res.status(404).json({
          message: "Workplan not found",
        });
      }
    }

    const expenditure = await populateExpenditure(
      Expenditure.findByIdAndUpdate(req.params.id, data, {
        new: true,
      })
    );

    if (!expenditure) {
      return res.status(404).json({
        message: "Expenditure not found",
      });
    }

    res.json(expenditure);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteExpenditure = async (req, res) => {
  try {
    const expenditure = await Expenditure.findByIdAndDelete(req.params.id);

    if (!expenditure) {
      return res.status(404).json({
        message: "Expenditure not found",
      });
    }

    res.json({
      message: "Expenditure deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBudgetUtilization = async (req, res) => {
  try {
    const { year } = req.query;

    const workplanFilter = {};

    if (year) {
      workplanFilter.workplan_year = Number(year);
    }

    const workplans = await Workplan.find(workplanFilter).populate(
      "component",
      "code name"
    );

    const workplanIds = workplans.map((w) => w._id);

    const expenditures = await Expenditure.find({
      workplan: { $in: workplanIds },
      statusApproval: { $ne: "rejected" },
    });

    const totalBudget = workplans.reduce(
      (sum, item) => sum + Number(item.milestone_total_budget || 0),
      0
    );

    const utilizedBudget = expenditures.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const remainingBudget = totalBudget - utilizedBudget;

    const utilizationRate =
      totalBudget > 0
        ? Number(((utilizedBudget / totalBudget) * 100).toFixed(1))
        : 0;

    const byWorkplan = workplans.map((workplan) => {
      const spent = expenditures
        .filter((exp) => String(exp.workplan) === String(workplan._id))
        .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

      const budget = Number(workplan.milestone_total_budget || 0);

      return {
        workplan_id: workplan._id,
        workplan_year: workplan.workplan_year,
        milestone: workplan.milestone,
        component: workplan.component
          ? `${workplan.component.code} - ${workplan.component.name}`
          : "Unknown",
        budget,
        spent,
        remaining: budget - spent,
        utilizationRate:
          budget > 0 ? Number(((spent / budget) * 100).toFixed(1)) : 0,
      };
    });

    res.json({
      year: year || "all",
      totalBudget,
      utilizedBudget,
      remainingBudget,
      utilizationRate,
      byWorkplan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};