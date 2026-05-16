


// new


// import Beneficiary from "../models/Beneficiary.js";
// import Location from "../models/Location.js";
// import { logAction } from "../utils/logAction.js";

// // CREATE BENEFICIARY
// export const createBeneficiary = async (req, res) => {
//   try {
//     const { location, name, sex, age, category } = req.body;

//     if (!location || !name || !sex || age === undefined || !category) {
//       return res.status(400).json({
//         message: "Location, name, sex, age and category are required",
//       });
//     }

//     const locationExists = await Location.findById(location);

//     if (!locationExists) {
//       return res.status(404).json({
//         message: "Location not found",
//       });
//     }

//     const beneficiary = await Beneficiary.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//      // ✅ 🔥 AUDIT LOG HALKAN KU DAR (AFTER CREATE)
//     await logAction(
//       req.user._id,
//       "CREATE",
//       "beneficiary",
//       beneficiary._id,
//       `Created ${beneficiary.name}`
//     );
    

//     res.status(201).json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL BENEFICIARIES
// export const getBeneficiaries = async (req, res) => {
//   try {
//     const beneficiaries = await Beneficiary.find()
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

//     res.json(beneficiaries);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE BENEFICIARY
// export const getBeneficiaryById = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findById(req.params.id)
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     res.json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE BENEFICIARY
// export const updateBeneficiary = async (req, res) => {
//   try {
//     if (req.body.location) {
//       const locationExists = await Location.findById(req.body.location);

//       if (!locationExists) {
//         return res.status(404).json({
//           message: "Location not found",
//         });
//       }
//     }

//     const beneficiary = await Beneficiary.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )


    
    
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     res.json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE BENEFICIARY
// export const deleteBeneficiary = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     res.json({ message: "Beneficiary deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import Beneficiary from "../models/Beneficiary.js";
// import Location from "../models/Location.js";
// import { logAction } from "../utils/logAction.js";
// import Approval from "../models/Approval.js";
// import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

// const recalculateIndicators = async (req) => {
//   await updateAllAutoIndicatorResults({
//     year: new Date().getFullYear(),
//     quarter: "Q1",
//     userId: req.user._id,
//   });
// };
// // CREATE BENEFICIARY
// export const createBeneficiary = async (req, res) => {
//   try {
//     const { location, name, sex, age, category } = req.body;

//     if (!location || !name || !sex || age === undefined || !category) {
//       return res.status(400).json({
//         message: "Location, name, sex, age and category are required",
//       });
//     }

//     const locationExists = await Location.findById(location);

//     if (!locationExists) {
//       return res.status(404).json({
//         message: "Location not found",
//       });
//     }

//     const beneficiary = await Beneficiary.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//     // 
//     await Approval.create({
//   module_type: "beneficiary",
//   reference_id: beneficiary._id,
//   approval_status: "pending",
//   createdBy: req.user._id,
// });

//     await logAction(
//       req.user._id,
//       "CREATE",
//       "beneficiaries",
//       beneficiary._id,
//       `Created beneficiary ${beneficiary.name}`
//     );

//     await recalculateIndicators(req);

//     res.status(201).json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL BENEFICIARIES
// export const getBeneficiaries = async (req, res) => {
//   try {
//     const beneficiaries = await Beneficiary.find()
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

//     res.json(beneficiaries);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET SINGLE BENEFICIARY
// export const getBeneficiaryById = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findById(req.params.id)
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     res.json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE BENEFICIARY
// export const updateBeneficiary = async (req, res) => {
//   try {
//     if (req.body.location) {
//       const locationExists = await Location.findById(req.body.location);

//       if (!locationExists) {
//         return res.status(404).json({
//           message: "Location not found",
//         });
//       }
//     }

//     const beneficiary = await Beneficiary.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )
//       .populate({
//         path: "location",
//         select: "name type latitude longitude district",
//         populate: {
//           path: "district",
//           select: "name code",
//         },
//       })
//       .populate("createdBy", "name");

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     await logAction(
//       req.user._id,
//       "UPDATE",
//       "beneficiaries",
//       beneficiary._id,
//       `Updated beneficiary ${beneficiary.name}`
//     );
//     await recalculateIndicators(req);

//     res.json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE BENEFICIARY
// export const deleteBeneficiary = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Beneficiary not found" });
//     }

//     await logAction(
//       req.user._id,
//       "DELETE",
//       "beneficiaries",
//       beneficiary._id,
//       `Deleted beneficiary ${beneficiary.name}`
//     );
//     await recalculateIndicators(req);

//     res.json({ message: "Beneficiary deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Beneficiary from "../models/Beneficiary.js";
import Location from "../models/Location.js";
import Community from "../models/Community.js";
import CommunityGroup from "../models/CommunityGroup.js";
import ValueChain from "../models/ValueChain.js";
import { logAction } from "../utils/logAction.js";
import Approval from "../models/Approval.js";
import { updateAllAutoIndicatorResults } from "../utils/indicatorAggregationEngine.js";

const recalculateIndicators = async (req) => {
  await updateAllAutoIndicatorResults({
    year: new Date().getFullYear(),
    quarter: "Q1",
    userId: req.user._id,
  });
};

const cleanPayload = (body) => {
  return {
    ...body,
    community: body.community || null,
    community_group: body.community_group || null,
    value_chain: body.value_chain || null,
    is_vulnerable:
      body.is_vulnerable === true || body.is_vulnerable === "true",
  };
};

const populateBeneficiary = (query) => {
  return query
    .populate({
      path: "location",
      select: "name type latitude longitude district",
      populate: {
        path: "district",
        select: "name code",
      },
    })
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
    .populate("value_chain", "name category")
    .populate("createdBy", "name");
};

const validateReferences = async ({ location, community, community_group, value_chain }) => {
  if (location) {
    const locationExists = await Location.findById(location);
    if (!locationExists) {
      return "Location not found";
    }
  }

  if (community) {
    const communityExists = await Community.findById(community);
    if (!communityExists) {
      return "Community not found";
    }
  }

  if (community_group) {
    const groupExists = await CommunityGroup.findById(community_group);
    if (!groupExists) {
      return "Community group not found";
    }
  }

  if (value_chain) {
    const valueChainExists = await ValueChain.findById(value_chain);
    if (!valueChainExists) {
      return "Value chain not found";
    }
  }

  return null;
};

// CREATE BENEFICIARY
export const createBeneficiary = async (req, res) => {
  try {
    const { location, name, sex, age, category } = req.body;

    if (!location || !name || !sex || age === undefined || !category) {
      return res.status(400).json({
        message: "Location, name, sex, age and category are required",
      });
    }

    const payload = cleanPayload(req.body);

    const referenceError = await validateReferences(payload);
    if (referenceError) {
      return res.status(404).json({ message: referenceError });
    }

    const beneficiary = await Beneficiary.create({
      ...payload,
      createdBy: req.user._id,
    });

    await Approval.create({
      module_type: "beneficiary",
      reference_id: beneficiary._id,
      approval_status: "pending",
      createdBy: req.user._id,
    });

    await logAction(
      req.user._id,
      "CREATE",
      "beneficiaries",
      beneficiary._id,
      `Created beneficiary ${beneficiary.name}`
    );

    await recalculateIndicators(req);

    res.status(201).json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BENEFICIARIES
export const getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await populateBeneficiary(
      Beneficiary.find().sort({ createdAt: -1 })
    );

    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BENEFICIARY
export const getBeneficiaryById = async (req, res) => {
  try {
    const beneficiary = await populateBeneficiary(
      Beneficiary.findById(req.params.id)
    );

    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    res.json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BENEFICIARY
export const updateBeneficiary = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);

    const referenceError = await validateReferences(payload);
    if (referenceError) {
      return res.status(404).json({ message: referenceError });
    }

    const beneficiary = await populateBeneficiary(
      Beneficiary.findByIdAndUpdate(req.params.id, payload, { new: true })
    );

    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    await logAction(
      req.user._id,
      "UPDATE",
      "beneficiaries",
      beneficiary._id,
      `Updated beneficiary ${beneficiary.name}`
    );

    await recalculateIndicators(req);

    res.json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BENEFICIARY
export const deleteBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);

    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    await logAction(
      req.user._id,
      "DELETE",
      "beneficiaries",
      beneficiary._id,
      `Deleted beneficiary ${beneficiary.name}`
    );

    await recalculateIndicators(req);

    res.json({ message: "Beneficiary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};