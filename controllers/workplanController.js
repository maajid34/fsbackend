// // // import Workplan from "../models/Workplan.js";

// // // export const createWorkplan = async (req, res) => {
// // //   try {
// // //     const data = {
// // //       ...req.body,
// // //       createdBy: req.user._id,
// // //     };

// // //     data.total_budget =
// // //       Number(data.projected_cost_q1 || 0) +
// // //       Number(data.projected_cost_q2 || 0) +
// // //       Number(data.projected_cost_q3 || 0) +
// // //       Number(data.projected_cost_q4 || 0);

// // //     data.budget_variance =
// // //       data.total_budget -
// // //       Number(data.actual_expenditure || 0);

// // //     const workplan =
// // //       await Workplan.create(data);

// // //     res.status(201).json(workplan);
// // //   } catch (error) {
// // //     res.status(500).json({
// // //       message: error.message,
// // //     });
// // //   }
// // // };

// // // export const getWorkplans = async (
// // //   req,
// // //   res
// // // ) => {
// // //   try {
// // //     const workplans =
// // //       await Workplan.find()
// // //         .populate(
// // //           "component",
// // //           "code name"
// // //         )
// // //         .populate(
// // //           "subcomponent",
// // //           "code name"
// // //         )
// // //         .populate(
// // //           "activity",
// // //           "title"
// // //         )
// // //         .populate(
// // //           "createdBy",
// // //           "name"
// // //         )
// // //         .sort({
// // //           createdAt: -1,
// // //         });

// // //     res.json(workplans);
// // //   } catch (error) {
// // //     res.status(500).json({
// // //       message: error.message,
// // //     });
// // //   }
// // // };

// // // export const getWorkplanById =
// // //   async (req, res) => {
// // //     try {
// // //       const workplan =
// // //         await Workplan.findById(
// // //           req.params.id
// // //         )
// // //           .populate(
// // //             "component",
// // //             "code name"
// // //           )
// // //           .populate(
// // //             "subcomponent",
// // //             "code name"
// // //           )
// // //           .populate(
// // //             "activity",
// // //             "title"
// // //           )
// // //           .populate(
// // //             "createdBy",
// // //             "name"
// // //           );

// // //       if (!workplan) {
// // //         return res.status(404).json({
// // //           message:
// // //             "Workplan not found",
// // //         });
// // //       }

// // //       res.json(workplan);
// // //     } catch (error) {
// // //       res.status(500).json({
// // //         message: error.message,
// // //       });
// // //     }
// // //   };

// // // export const updateWorkplan =
// // //   async (req, res) => {
// // //     try {
// // //       const data = {
// // //         ...req.body,
// // //       };

// // //       data.total_budget =
// // //         Number(
// // //           data.projected_cost_q1 || 0
// // //         ) +
// // //         Number(
// // //           data.projected_cost_q2 || 0
// // //         ) +
// // //         Number(
// // //           data.projected_cost_q3 || 0
// // //         ) +
// // //         Number(
// // //           data.projected_cost_q4 || 0
// // //         );

// // //       data.budget_variance =
// // //         data.total_budget -
// // //         Number(
// // //           data.actual_expenditure ||
// // //             0
// // //         );

// // //       const workplan =
// // //         await Workplan.findByIdAndUpdate(
// // //           req.params.id,
// // //           data,
// // //           {
// // //             new: true,
// // //           }
// // //         );

// // //       if (!workplan) {
// // //         return res.status(404).json({
// // //           message:
// // //             "Workplan not found",
// // //         });
// // //       }

// // //       res.json(workplan);
// // //     } catch (error) {
// // //       res.status(500).json({
// // //         message: error.message,
// // //       });
// // //     }
// // //   };

// // // export const deleteWorkplan =
// // //   async (req, res) => {
// // //     try {
// // //       const workplan =
// // //         await Workplan.findByIdAndDelete(
// // //           req.params.id
// // //         );

// // //       if (!workplan) {
// // //         return res.status(404).json({
// // //           message:
// // //             "Workplan not found",
// // //         });
// // //       }

// // //       res.json({
// // //         message:
// // //           "Workplan deleted successfully",
// // //       });
// // //     } catch (error) {
// // //       res.status(500).json({
// // //         message: error.message,
// // //       });
// // //     }
// // //   };

// // import Workplan from "../models/Workplan.js";

// // export const createWorkplan = async (
// //   req,
// //   res
// // ) => {
// //   try {
// //     const workplan =
// //       await Workplan.create({
// //         ...req.body,
// //         createdBy: req.user._id,
// //       });

// //     res.status(201).json(workplan);
// //   } catch (error) {
// //     res.status(500).json({
// //       message: error.message,
// //     });
// //   }
// // };

// // export const getWorkplans = async (
// //   req,
// //   res
// // ) => {
// //   try {
// //     const workplans =
// //       await Workplan.find()
// //         .populate(
// //           "component",
// //           "code name"
// //         )
// //         .populate(
// //           "subcomponent",
// //           "code name"
// //         )
// //         .populate(
// //           "createdBy",
// //           "name"
// //         )
// //         .sort({
// //           createdAt: -1,
// //         });

// //     res.json(workplans);
// //   } catch (error) {
// //     res.status(500).json({
// //       message: error.message,
// //     });
// //   }
// // };

// // export const getWorkplanById =
// //   async (req, res) => {
// //     try {
// //       const workplan =
// //         await Workplan.findById(
// //           req.params.id
// //         )
// //           .populate(
// //             "component",
// //             "code name"
// //           )
// //           .populate(
// //             "subcomponent",
// //             "code name"
// //           )
// //           .populate(
// //             "createdBy",
// //             "name"
// //           );

// //       if (!workplan) {
// //         return res.status(404).json({
// //           message:
// //             "Workplan not found",
// //         });
// //       }

// //       res.json(workplan);
// //     } catch (error) {
// //       res.status(500).json({
// //         message: error.message,
// //       });
// //     }
// //   };

// // export const updateWorkplan =
// //   async (req, res) => {
// //     try {
// //       const workplan =
// //         await Workplan.findByIdAndUpdate(
// //           req.params.id,
// //           req.body,
// //           {
// //             new: true,
// //           }
// //         );

// //       if (!workplan) {
// //         return res.status(404).json({
// //           message:
// //             "Workplan not found",
// //         });
// //       }

// //       res.json(workplan);
// //     } catch (error) {
// //       res.status(500).json({
// //         message: error.message,
// //       });
// //     }
// //   };

// // export const deleteWorkplan =
// //   async (req, res) => {
// //     try {
// //       const workplan =
// //         await Workplan.findByIdAndDelete(
// //           req.params.id
// //         );

// //       if (!workplan) {
// //         return res.status(404).json({
// //           message:
// //             "Workplan not found",
// //         });
// //       }

// //       res.json({
// //         message:
// //           "Workplan deleted successfully",
// //       });
// //     } catch (error) {
// //       res.status(500).json({
// //         message: error.message,
// //       });
// //     }
// //   };


// import Workplan from "../models/Workplan.js";

// const populateWorkplan = (query) => {
//   return query
//     .populate("component", "code name")
//     .populate("subcomponent", "code name")
//     .populate("createdBy", "name");
// };

// export const createWorkplan = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       createdBy: req.user._id,
//     };

//     if (!data.activity_subactivities || data.activity_subactivities.length === 0) {
//       return res.status(400).json({
//         message: "At least one activity/subactivity is required",
//       });
//     }

//     if (data.activity_subactivities.length > 10) {
//       return res.status(400).json({
//         message: "Maximum 10 activities/subactivities are allowed",
//       });
//     }

//     const workplan = await Workplan.create(data);

//     const populated = await populateWorkplan(Workplan.findById(workplan._id));

//     res.status(201).json(populated);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getWorkplans = async (req, res) => {
//   try {
//     const { quarter, component } = req.query;

//     const filter = {};

//     if (quarter) {
//       filter.quarter = quarter;
//     }

//     if (component) {
//       filter.component = component;
//     }

//     const workplans = await populateWorkplan(
//       Workplan.find(filter).sort({
//         workplan_no: 1,
//         createdAt: -1,
//       })
//     );

//     res.json(workplans);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getWorkplanById = async (req, res) => {
//   try {
//     const workplan = await populateWorkplan(
//       Workplan.findById(req.params.id)
//     );

//     if (!workplan) {
//       return res.status(404).json({
//         message: "Workplan not found",
//       });
//     }

//     res.json(workplan);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const updateWorkplan = async (req, res) => {
//   try {
//     if (
//       req.body.activity_subactivities &&
//       req.body.activity_subactivities.length > 10
//     ) {
//       return res.status(400).json({
//         message: "Maximum 10 activities/subactivities are allowed",
//       });
//     }

//     const workplan = await populateWorkplan(
//       Workplan.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       })
//     );

//     if (!workplan) {
//       return res.status(404).json({
//         message: "Workplan not found",
//       });
//     }

//     res.json(workplan);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const deleteWorkplan = async (req, res) => {
//   try {
//     const workplan = await Workplan.findByIdAndDelete(req.params.id);

//     if (!workplan) {
//       return res.status(404).json({
//         message: "Workplan not found",
//       });
//     }

//     res.json({
//       message: "Workplan deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

import Workplan from "../models/Workplan.js";

const populateWorkplan = (query) => {
  return query
    .populate("component", "code name")
    .populate("subcomponent", "code name")
    .populate("createdBy", "name");
};

const calculateMilestoneBudget = (items = []) => {
  return items.reduce(
    (sum, item) => sum + Number(item.projected_cost || 0),
    0
  );
};

const cleanSubactivities = (items = []) => {
  return items
    .filter((item) => item.title && item.title.trim() !== "")
    .map((item) => ({
      title: item.title.trim(),
      timeline: item.timeline || "",
      responsible: item.responsible || "",
      projected_cost: Number(item.projected_cost || 0),
    }));
};

export const createWorkplan = async (req, res) => {
  try {
    const subactivities = cleanSubactivities(req.body.activity_subactivities);

    if (subactivities.length === 0) {
      return res.status(400).json({
        message: "At least one activity/subactivity is required",
      });
    }

    if (subactivities.length > 10) {
      return res.status(400).json({
        message: "Maximum 10 activities/subactivities are allowed",
      });
    }

    const data = {
      ...req.body,
      activity_subactivities: subactivities,
      milestone_total_budget: calculateMilestoneBudget(subactivities),
      createdBy: req.user._id,
    };

    const workplan = await Workplan.create(data);

    const populated = await populateWorkplan(Workplan.findById(workplan._id));

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkplans = async (req, res) => {
  try {
    const { quarter, component } = req.query;

    const filter = {};

    if (quarter) {
      filter.quarter = quarter;
    }

    if (component) {
      filter.component = component;
    }

    const workplans = await populateWorkplan(
      Workplan.find(filter).sort({
        workplan_no: 1,
        createdAt: -1,
      })
    );

    res.json(workplans);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkplanById = async (req, res) => {
  try {
    const workplan = await populateWorkplan(
      Workplan.findById(req.params.id)
    );

    if (!workplan) {
      return res.status(404).json({
        message: "Workplan not found",
      });
    }

    res.json(workplan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateWorkplan = async (req, res) => {
  try {
    const subactivities = cleanSubactivities(req.body.activity_subactivities);

    if (subactivities.length === 0) {
      return res.status(400).json({
        message: "At least one activity/subactivity is required",
      });
    }

    if (subactivities.length > 10) {
      return res.status(400).json({
        message: "Maximum 10 activities/subactivities are allowed",
      });
    }

    const data = {
      ...req.body,
      activity_subactivities: subactivities,
      milestone_total_budget: calculateMilestoneBudget(subactivities),
    };

    const workplan = await populateWorkplan(
      Workplan.findByIdAndUpdate(req.params.id, data, {
        new: true,
      })
    );

    if (!workplan) {
      return res.status(404).json({
        message: "Workplan not found",
      });
    }

    res.json(workplan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteWorkplan = async (req, res) => {
  try {
    const workplan = await Workplan.findByIdAndDelete(req.params.id);

    if (!workplan) {
      return res.status(404).json({
        message: "Workplan not found",
      });
    }

    res.json({
      message: "Workplan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};