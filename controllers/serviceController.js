// // import Service from "../models/Service.js";

// // export const createService = async (req, res) => {
// //   try {
// //     const service = await Service.create({
// //       ...req.body,
// //       createdBy: req.user._id,
// //     });

// //     res.status(201).json(service);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // export const getServices = async (req, res) => {
// //   try {
// //     const data = await Service.find()
// //       .populate("beneficiaries", "name")
// //       .populate("createdBy", "name");

// //     res.json(data);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// import Service from "../models/Service.js";
// import Activity from "../models/Activity.js";
// import Location from "../models/Location.js";
// import Approval from "../models/Approval.js";
// import { logAction } from "../utils/logAction.js";
// import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

// const recalculateIndicators = async (req) => {
//   await updateAllAutoIndicatorResults({
//     year: new Date().getFullYear(),
//     quarter: "Q1",
//     userId: req.user._id,
//   });
// };
// // CREATE SERVICE
// export const createService = async (req, res) => {
//   try {
//     const {
//       activity,
//       location,
//       service_type,
//       description,
//       unit,
//       quantity,
//       date_provided,
//     } = req.body;

//     if (!activity || !location || !service_type || !unit || quantity === undefined || !date_provided) {
//       return res.status(400).json({
//         message:
//           "Activity, location, service type, unit, quantity and date provided are required",
//       });
//     }

//     const activityExists = await Activity.findById(activity);

//     if (!activityExists) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     const locationExists = await Location.findById(location);

//     if (!locationExists) {
//       return res.status(404).json({
//         message: "Location not found",
//       });
//     }

//     const service = await Service.create({
//       activity,
//       location,
//       service_type,
//       description,
//       unit,
//       quantity,
//       date_provided,
//       createdBy: req.user._id,
//     });

//     // 
//     await Approval.create({
//   module_type: "service",
//   reference_id: service._id,
//   approval_status: "pending",
//   createdBy: req.user._id,
// });

// // 
// await logAction(
//   req.user._id,
//   "CREATE",
//   "Service",
//   service._id,
//   `Created Service ${service.service_type}`
// );
// await recalculateIndicators(req);
//     res.status(201).json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL SERVICES
// export const getServices = async (req, res) => {
//   try {
//     const services = await Service.find()
//       .populate("activity", "title component status")
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name")
//       .sort({ createdAt: -1 });

//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE SERVICE
// export const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id)
//       .populate("activity", "title component status")
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!service) {
//       return res.status(404).json({
//         message: "Service not found",
//       });
//     }

//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE SERVICE
// export const updateService = async (req, res) => {
//   try {
//     if (req.body.activity) {
//       const activityExists = await Activity.findById(req.body.activity);

//       if (!activityExists) {
//         return res.status(404).json({
//           message: "Activity not found",
//         });
//       }
//     }

//     if (req.body.location) {
//       const locationExists = await Location.findById(req.body.location);

//       if (!locationExists) {
//         return res.status(404).json({
//           message: "Location not found",
//         });
//       }
//     }

//     const service = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )
//       .populate("activity", "title component status")
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!service) {
//       return res.status(404).json({
//         message: "Service not found",
//       });
//     }

//  await logAction(
//   req.user._id,
//   "UPDATE",
//   "Service",
//   service._id,
//   `Updated Service ${service.service_type}`
// );

// await recalculateIndicators(req);

//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE SERVICE
// export const deleteService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);

//     if (!service) {
//       return res.status(404).json({
//         message: "Service not found",
//       });
//     }

//  await logAction(
//   req.user._id,
//   "DELETE",
//   "Service",
//   service._id,
//   `Deleted Service ${service.service_type}`
// );

// await recalculateIndicators(req);

//     res.json({
//       message: "Service deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Service from "../models/Service.js";
import Activity from "../models/Activity.js";
import Location from "../models/Location.js";
import Beneficiary from "../models/Beneficiary.js";
import Approval from "../models/Approval.js";
import { logAction } from "../utils/logAction.js";
import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

import Component from "../models/Component.js";
import Subcomponent from "../models/Subcomponent.js";
import ValueChain from "../models/ValueChain.js";
import Community from "../models/Community.js";
import CommunityGroup from "../models/CommunityGroup.js";

const recalculateIndicators = async (req) => {
  await updateAllAutoIndicatorResults({
    year: new Date().getFullYear(),
    quarter: "Q1",
    userId: req.user._id,
  });
};

const cleanServicePayload = (body) => ({
  ...body,
  component: body.component || null,
  subcomponent: body.subcomponent || null,
  value_chain: body.value_chain || null,
  community: body.community || null,
  community_group: body.community_group || null,
  beneficiaries: body.beneficiaries || [],
  quantity: Number(body.quantity || 0),
});

const validateServiceReferences = async ({
  activity,
  location,
  component,
  subcomponent,
  value_chain,
  community,
  community_group,
  beneficiaries,
}) => {
  if (activity && !(await Activity.findById(activity))) {
    return "Activity not found";
  }

  if (location && !(await Location.findById(location))) {
    return "Location not found";
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

const populateService = (query) => {
  return query
    .populate("activity", "title status")
    .populate({
      path: "location",
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

export const createService = async (req, res) => {
  try {
    const { activity, location, service_type, unit, quantity, date_provided } =
      req.body;

    if (
      !activity ||
      !location ||
      !service_type ||
      !unit ||
      quantity === undefined ||
      !date_provided
    ) {
      return res.status(400).json({
        message:
          "Activity, location, service type, unit, quantity and date provided are required",
      });
    }

    const payload = cleanServicePayload(req.body);

    const referenceError = await validateServiceReferences(payload);
    if (referenceError) {
      return res.status(400).json({ message: referenceError });
    }

    const service = await Service.create({
      ...payload,
      createdBy: req.user._id,
    });

    await Approval.create({
      module_type: "service",
      reference_id: service._id,
      approval_status: "pending",
      createdBy: req.user._id,
    });

    await logAction(
      req.user._id,
      "CREATE",
      "Service",
      service._id,
      `Created Service ${service.service_type}`
    );

    await recalculateIndicators(req);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await populateService(
      Service.find().sort({ createdAt: -1 })
    );

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await populateService(Service.findById(req.params.id));

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const payload = cleanServicePayload(req.body);

    const referenceError = await validateServiceReferences(payload);
    if (referenceError) {
      return res.status(400).json({ message: referenceError });
    }

    const service = await populateService(
      Service.findByIdAndUpdate(req.params.id, payload, { new: true })
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await logAction(
      req.user._id,
      "UPDATE",
      "Service",
      service._id,
      `Updated Service ${service.service_type}`
    );

    await recalculateIndicators(req);

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await logAction(
      req.user._id,
      "DELETE",
      "Service",
      service._id,
      `Deleted Service ${service.service_type}`
    );

    await recalculateIndicators(req);

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};