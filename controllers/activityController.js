// // // 

// // // new

// // import Activity from "../models/Activity.js";
// // import Location from "../models/Location.js";
// // import Beneficiary from "../models/Beneficiary.js";
// // import Approval from "../models/Approval.js";
// // import { logAction } from "../utils/logAction.js";
// // import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

// // const recalculateIndicators = async (req) => {
// //   await updateAllAutoIndicatorResults({
// //     year: new Date().getFullYear(),
// //     quarter: "Q1",
// //     userId: req.user._id,
// //   });
// // };
// // // CREATE ACTIVITY
// // export const createActivity = async (req, res) => {
// //   try {
// //     const {
// //       location,
// //       title,
// //       component,
// //       status,
// //       start_date,
// //       end_date,
// //       beneficiaries,
// //       evidence,
// //     } = req.body;

// //     if (!location || !title || !component) {
// //       return res.status(400).json({
// //         message: "Location, title and component are required",
// //       });
// //     }

// //     const locationExists = await Location.findById(location);

// //     if (!locationExists) {
// //       return res.status(404).json({
// //         message: "Location not found",
// //       });
// //     }

// //     if (beneficiaries && beneficiaries.length > 0) {
// //       const beneficiariesExist = await Beneficiary.find({
// //         _id: { $in: beneficiaries },
// //       });

// //       if (beneficiariesExist.length !== beneficiaries.length) {
// //         return res.status(400).json({
// //           message: "Invalid beneficiaries selected",
// //         });
// //       }
// //     }

// //     const activity = await Activity.create({
// //       location,
// //       title,
// //       component,
// //       status,
// //       start_date,
// //       end_date,
// //       beneficiaries: beneficiaries || [],
// //       evidence,
// //       createdBy: req.user._id,
// //     });

// //     await Approval.create({
// //   module_type: "activity",
// //   reference_id: activity._id,
// //   approval_status: "pending",
// //   createdBy: req.user._id,
// // });

// // await logAction(
// //   req.user._id,
// //   "CREATE",
// //   "Activity",
// //   activity._id,
// //   `Created Activity ${activity.title}`
// // );


// // await recalculateIndicators(req);

// //     res.status(201).json(activity);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // GET ALL ACTIVITIES
// // export const getActivities = async (req, res) => {
// //   try {
// //     const activities = await Activity.find()
// //       .populate({
// //         path: "location",
// //         select: "name type latitude longitude district",
// //         populate: {
// //           path: "district",
// //           select: "name code",
// //         },
// //       })
// //       .populate("beneficiaries", "name sex age category")
// //       .populate("createdBy", "name")
// //       .sort({ createdAt: -1 });

// //     res.json(activities);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // GET SINGLE ACTIVITY
// // export const getActivityById = async (req, res) => {
// //   try {
// //     const activity = await Activity.findById(req.params.id)
// //       .populate({
// //         path: "location",
// //         select: "name type latitude longitude district",
// //         populate: {
// //           path: "district",
// //           select: "name code",
// //         },
// //       })
// //       .populate("beneficiaries", "name sex age category")
// //       .populate("createdBy", "name");

// //     if (!activity) {
// //       return res.status(404).json({
// //         message: "Activity not found",
// //       });
// //     }

// //     res.json(activity);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // UPDATE ACTIVITY
// // export const updateActivity = async (req, res) => {
// //   try {
// //     if (req.body.location) {
// //       const locationExists = await Location.findById(req.body.location);

// //       if (!locationExists) {
// //         return res.status(404).json({
// //           message: "Location not found",
// //         });
// //       }
// //     }

// //     if (req.body.beneficiaries && req.body.beneficiaries.length > 0) {
// //       const beneficiariesExist = await Beneficiary.find({
// //         _id: { $in: req.body.beneficiaries },
// //       });

// //       if (beneficiariesExist.length !== req.body.beneficiaries.length) {
// //         return res.status(400).json({
// //           message: "Invalid beneficiaries selected",
// //         });
// //       }
// //     }

// //     const activity = await Activity.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     )
// //       .populate({
// //         path: "location",
// //         select: "name type latitude longitude district",
// //         populate: {
// //           path: "district",
// //           select: "name code",
// //         },
// //       })
// //       .populate("beneficiaries", "name sex age category")
// //       .populate("createdBy", "name");

          

// //     if (!activity) {
// //       return res.status(404).json({
// //         message: "Activity not found",
// //       });
// //     }

// //    await logAction(
// //   req.user._id,
// //   "UPDATE",
// //   "Activity",
// //   activity._id,
// //   `Updated Activity ${activity.title}`
// // );
// // await recalculateIndicators(req);

// //     res.json(activity);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // DELETE ACTIVITY
// // export const deleteActivity = async (req, res) => {
// //   try {
// //     const activity = await Activity.findByIdAndDelete(req.params.id);

// //     if (!activity) {
// //       return res.status(404).json({
// //         message: "Activity not found",
// //       });
// //     }
// // await logAction(
// //   req.user._id,
// //   "DELETE",
// //   "Activity",
// //   activity._id,
// //   `Deleted Activity ${activity.title}`
// // );
    
// // await recalculateIndicators(req);
// //     res.json({
// //       message: "Activity deleted successfully",
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// import Activity from "../models/Activity.js";
// import Location from "../models/Location.js";
// import Beneficiary from "../models/Beneficiary.js";
// import Approval from "../models/Approval.js";
// import { logAction } from "../utils/logAction.js";

// import Component from "../models/Component.js";
// import Subcomponent from "../models/Subcomponent.js";
// import ValueChain from "../models/ValueChain.js";
// import Community from "../models/Community.js";
// import CommunityGroup from "../models/CommunityGroup.js";

// import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

// const recalculateIndicators = async (req) => {
//   await updateAllAutoIndicatorResults({
//     year: new Date().getFullYear(),
//     quarter: "Q1",
//     userId: req.user._id,
//   });
// };

// const cleanActivityPayload = (body) => ({
//   ...body,
//   component: body.component || null,
//   subcomponent: body.subcomponent || null,
//   value_chain: body.value_chain || null,
//   community: body.community || null,
//   community_group: body.community_group || null,
// });

// const validateActivityReferences = async ({
//   location,
//   component,
//   subcomponent,
//   value_chain,
//   community,
//   community_group,
//   beneficiaries,
// }) => {
//   if (location) {
//     const locationExists = await Location.findById(location);

//     if (!locationExists) {
//       return "Location not found";
//     }
//   }

//   if (component && !(await Component.findById(component))) {
//     return "Component not found";
//   }

//   if (subcomponent && !(await Subcomponent.findById(subcomponent))) {
//     return "Subcomponent not found";
//   }

//   if (value_chain && !(await ValueChain.findById(value_chain))) {
//     return "Value chain not found";
//   }

//   if (community && !(await Community.findById(community))) {
//     return "Community not found";
//   }

//   if (community_group && !(await CommunityGroup.findById(community_group))) {
//     return "Community group not found";
//   }

//   if (beneficiaries && beneficiaries.length > 0) {
//     const beneficiariesExist = await Beneficiary.find({
//       _id: { $in: beneficiaries },
//     });

//     if (beneficiariesExist.length !== beneficiaries.length) {
//       return "Invalid beneficiaries selected";
//     }
//   }

//   return null;
// };

// const populateActivity = (query) => {
//   return query
//     .populate({
//       path: "location",
//       select: "name type latitude longitude district",
//       populate: {
//         path: "district",
//         select: "name code",
//       },
//     })
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
//     .populate({
//       path: "community_group",
//       select: "name group_type value_chain",
//       populate: {
//         path: "value_chain",
//         select: "name category",
//       },
//     })
//     .populate("beneficiaries", "name sex age category")
//     .populate("createdBy", "name");
// };

// // CREATE ACTIVITY
// export const createActivity = async (req, res) => {
//   try {
//     // const { location, title } = req.body;

//     // if (!location || !title) {
//     //   return res.status(400).json({
//     //     message: "Location and title are required",
//     //   });
//     // }
    

//     const payload = cleanActivityPayload(req.body);

//     const referenceError = await validateActivityReferences(payload);

//     if (referenceError) {
//       return res.status(400).json({
//         message: referenceError,
//       });
//     }

//     const activity = await Activity.create({
//       ...payload,
//       createdBy: req.user._id,
//     });

//     await Approval.create({
//       module_type: "activity",
//       reference_id: activity._id,
//       approval_status: "pending",
//       createdBy: req.user._id,
//     });

//     await logAction(
//       req.user._id,
//       "CREATE",
//       "Activity",
//       activity._id,
//       `Created Activity ${activity.title}`
//     );

//     await recalculateIndicators(req);

//     res.status(201).json(activity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL ACTIVITIES
// export const getActivities = async (req, res) => {
//   try {
//     const activities = await populateActivity(
//       Activity.find().sort({ createdAt: -1 })
//     );

//     res.json(activities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE ACTIVITY
// export const getActivityById = async (req, res) => {
//   try {
//     const activity = await populateActivity(
//       Activity.findById(req.params.id)
//     );

//     if (!activity) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     res.json(activity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE ACTIVITY
// export const updateActivity = async (req, res) => {
//   try {
//     const payload = cleanActivityPayload(req.body);

//     const referenceError = await validateActivityReferences(payload);

//     if (referenceError) {
//       return res.status(400).json({
//         message: referenceError,
//       });
//     }

//     const activity = await populateActivity(
//       Activity.findByIdAndUpdate(req.params.id, payload, {
//         new: true,
//       })
//     );

//     if (!activity) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     await logAction(
//       req.user._id,
//       "UPDATE",
//       "Activity",
//       activity._id,
//       `Updated Activity ${activity.title}`
//     );

//     await recalculateIndicators(req);

//     res.json(activity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE ACTIVITY
// export const deleteActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findByIdAndDelete(req.params.id);

//     if (!activity) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     await logAction(
//       req.user._id,
//       "DELETE",
//       "Activity",
//       activity._id,
//       `Deleted Activity ${activity.title}`
//     );

//     await recalculateIndicators(req);

//     res.json({
//       message: "Activity deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Activity from "../models/Activity.js";
import Location from "../models/Location.js";
import Beneficiary from "../models/Beneficiary.js";
import Approval from "../models/Approval.js";
import { logAction } from "../utils/logAction.js";

import Component from "../models/Component.js";
import Subcomponent from "../models/Subcomponent.js";
import ValueChain from "../models/ValueChain.js";
import Community from "../models/Community.js";
import CommunityGroup from "../models/CommunityGroup.js";

import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

const recalculateIndicators = async (req) => {
  await updateAllAutoIndicatorResults({
    year: new Date().getFullYear(),
    quarter: "Q1",
    userId: req.user._id,
  });
};

const cleanActivityPayload = (body) => ({
  ...body,
  component: body.component || null,
  subcomponent: body.subcomponent || null,
  value_chain: body.value_chain || null,
  community: body.community || null,
  community_group: body.community_group || null,
  locations: Array.isArray(body.locations) ? body.locations : [],
  beneficiaries: Array.isArray(body.beneficiaries) ? body.beneficiaries : [],
});

const validateActivityReferences = async ({
  locations,
  component,
  subcomponent,
  value_chain,
  community,
  community_group,
  beneficiaries,
}) => {
  if (!locations || locations.length === 0) {
    return "At least one location is required";
  }

  const locationsExist = await Location.find({
    _id: { $in: locations },
  });

  if (locationsExist.length !== locations.length) {
    return "Invalid location selected";
  }

  if (component && !(await Component.findById(component))) {
    return "Component not found";
  }

  if (subcomponent && !(await Subcomponent.findById(subcomponent))) {
    return "Subcomponent not found";
  }

  if (value_chain && !(await ValueChain.findById(value_chain))) {
    return "Value chain not found";
  }

  if (community && !(await Community.findById(community))) {
    return "Community not found";
  }

  if (community_group && !(await CommunityGroup.findById(community_group))) {
    return "Community group not found";
  }

  if (beneficiaries && beneficiaries.length > 0) {
    const beneficiariesExist = await Beneficiary.find({
      _id: { $in: beneficiaries },
    });

    if (beneficiariesExist.length !== beneficiaries.length) {
      return "Invalid beneficiaries selected";
    }
  }

  return null;
};

const populateActivity = (query) => {
  return query
    .populate({
      path: "locations",
      select: "name type latitude longitude district",
      populate: {
        path: "district",
        select: "name code",
      },
    })
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
    .populate({
      path: "community_group",
      select: "name group_type value_chain",
      populate: {
        path: "value_chain",
        select: "name category",
      },
    })
    .populate("beneficiaries", "name sex age category")
    .populate("createdBy", "name");
};

export const createActivity = async (req, res) => {
  try {
    const { locations, title } = req.body;

    if (!locations || locations.length === 0 || !title) {
      return res.status(400).json({
        message: "At least one location and title are required",
      });
    }

    const payload = cleanActivityPayload(req.body);
    const referenceError = await validateActivityReferences(payload);

    if (referenceError) {
      return res.status(400).json({
        message: referenceError,
      });
    }

    const activity = await Activity.create({
      ...payload,
      createdBy: req.user._id,
    });

    await Approval.create({
      module_type: "activity",
      reference_id: activity._id,
      approval_status: "pending",
      createdBy: req.user._id,
    });

    await logAction(
      req.user._id,
      "CREATE",
      "Activity",
      activity._id,
      `Created Activity ${activity.title}`
    );

    await recalculateIndicators(req);

    const populatedActivity = await populateActivity(
      Activity.findById(activity._id)
    );

    res.status(201).json(populatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await populateActivity(
      Activity.find().sort({ createdAt: -1 })
    );

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await populateActivity(Activity.findById(req.params.id));

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const payload = cleanActivityPayload(req.body);
    const referenceError = await validateActivityReferences(payload);

    if (referenceError) {
      return res.status(400).json({
        message: referenceError,
      });
    }

    const activity = await populateActivity(
      Activity.findByIdAndUpdate(req.params.id, payload, {
        new: true,
      })
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    await logAction(
      req.user._id,
      "UPDATE",
      "Activity",
      activity._id,
      `Updated Activity ${activity.title}`
    );

    await recalculateIndicators(req);

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    await logAction(
      req.user._id,
      "DELETE",
      "Activity",
      activity._id,
      `Deleted Activity ${activity.title}`
    );

    await recalculateIndicators(req);

    res.json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};