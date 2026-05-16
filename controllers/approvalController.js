// // // import Beneficiary from "../models/Beneficiary.js";
// // // import Activity from "../models/Activity.js";
// // // import Service from "../models/Service.js";

// // // // approve beneficiary
// // // export const approveBeneficiary = async (req, res) => {
// // //   const item = await Beneficiary.findById(req.params.id);
// // //   item.status = "approved";
// // //   await item.save();
// // //   res.json({ message: "Beneficiary approved" });
// // // };

// // // // approve activity
// // // export const approveActivity = async (req, res) => {
// // //   const item = await Activity.findById(req.params.id);
// // //   item.statusApproval = "approved";
// // //   await item.save();
// // //   res.json({ message: "Activity approved" });
// // // };

// // // // approve service
// // // export const approveService = async (req, res) => {
// // //   const item = await Service.findById(req.params.id);
// // //   item.status = "approved";
// // //   await item.save();
// // //   res.json({ message: "Service approved" });
// // // };

// // import Beneficiary from "../models/Beneficiary.js";
// // import Activity from "../models/Activity.js";
// // import AuditLog from "../models/AuditLog.js";

// // // APPROVE BENEFICIARY
// // export const approveBeneficiary = async (req, res) => {
// //   const item = await Beneficiary.findById(req.params.id);

// //   if (!item) return res.status(404).json({ message: "Not found" });

// //   item.status = "approved";
// //   await item.save();

// //   await AuditLog.create({
// //     action: "approved",
// //     entity: "beneficiary",
// //     entityId: item._id,
// //     performedBy: req.user._id,
// //   });

// //   res.json({ message: "Approved" });
// // };

// // // REJECT BENEFICIARY
// // export const rejectBeneficiary = async (req, res) => {
// //   const item = await Beneficiary.findById(req.params.id);

// //   item.status = "rejected";
// //   await item.save();

// //   await AuditLog.create({
// //     action: "rejected",
// //     entity: "beneficiary",
// //     entityId: item._id,
// //     performedBy: req.user._id,
// //   });

// //   res.json({ message: "Rejected" });
// // };

// // // APPROVE ACTIVITY
// // export const approveActivity = async (req, res) => {
// //   const item = await Activity.findById(req.params.id);

// //   item.statusApproval = "approved";
// //   await item.save();

// //   await AuditLog.create({
// //     action: "approved",
// //     entity: "activity",
// //     entityId: item._id,
// //     performedBy: req.user._id,
// //   });

// //   res.json({ message: "Approved" });
// // };

// // // REJECT ACTIVITY
// // export const rejectActivity = async (req, res) => {
// //   const item = await Activity.findById(req.params.id);

// //   item.statusApproval = "rejected";
// //   await item.save();

// //   await AuditLog.create({
// //     action: "rejected",
// //     entity: "activity",
// //     entityId: item._id,
// //     performedBy: req.user._id,
// //   });

// //   res.json({ message: "Rejected" });
// // };

// // // GET PENDING
// // export const getPending = async (req, res) => {
// //   const beneficiaries = await Beneficiary.find({ status: "pending" });
// //   const activities = await Activity.find({ statusApproval: "pending" });

// //   res.json({ beneficiaries, activities });
// // };


// import Beneficiary from "../models/Beneficiary.js";
// import Activity from "../models/Activity.js";
// import { logAction } from "../utils/logAction.js"; // ✅ USE THIS ONLY

// // =======================
// // APPROVE BENEFICIARY
// // =======================
// export const approveBeneficiary = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findById(req.params.id);

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     beneficiary.status = "approved";
//     await beneficiary.save();

//     // ✅ AUDIT LOG
//     await logAction(
//       req.user._id,
//       "APPROVE",
//       "beneficiary",
//       beneficiary._id,
//       `Approved ${beneficiary.name}`
//     );

//     res.json({ message: "Beneficiary approved" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // =======================
// // REJECT BENEFICIARY
// // =======================
// export const rejectBeneficiary = async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findById(req.params.id);

//     if (!beneficiary) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     beneficiary.status = "rejected";
//     await beneficiary.save();

//     // ✅ AUDIT LOG
//     await logAction(
//       req.user._id,
//       "REJECT",
//       "beneficiary",
//       beneficiary._id,
//       `Rejected ${beneficiary.name}`
//     );

//     res.json({ message: "Beneficiary rejected" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // =======================
// // APPROVE ACTIVITY
// // =======================
// export const approveActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);

//     if (!activity) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     activity.statusApproval = "approved";
//     await activity.save();

//     // ✅ AUDIT LOG
//     await logAction(
//       req.user._id,
//       "APPROVE",
//       "activity",
//       activity._id,
//       `Approved ${activity.title}`
//     );

//     res.json({ message: "Activity approved" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // =======================
// // REJECT ACTIVITY
// // =======================
// export const rejectActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);

//     if (!activity) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     activity.statusApproval = "rejected";
//     await activity.save();

//     // ✅ AUDIT LOG
//     await logAction(
//       req.user._id,
//       "REJECT",
//       "activity",
//       activity._id,
//       `Rejected ${activity.title}`
//     );

//     res.json({ message: "Activity rejected" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // =======================
// // GET PENDING
// // =======================
// export const getPending = async (req, res) => {
//   try {
//     const beneficiaries = await Beneficiary.find({ status: "pending" });
//     const activities = await Activity.find({ statusApproval: "pending" });

//     res.json({ beneficiaries, activities });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Approval from "../models/Approval.js";

// CREATE APPROVAL REQUEST
export const createApproval = async (req, res) => {
  try {
    const {
      module_type,
      reference_id,
      approval_status,
      comments,
    } = req.body;

    if (!module_type || !reference_id) {
      return res.status(400).json({
        message: "Module type and reference ID are required",
      });
    }

    const approval = await Approval.create({
      module_type,
      reference_id,
      approval_status,
      comments,
      createdBy: req.user._id,
    });

    await logAction(
          req.user._id,
          "CREATE",
          "Approval",
          Activity._id,
          `Create Approval ${Activity.name}`
        );

    res.status(201).json(approval);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPROVALS
export const getApprovals = async (req, res) => {
  try {
    const approvals = await Approval.find()
      .populate("createdBy", "name role")
      .populate("reviewed_by", "name role")
      .sort({ createdAt: -1 });

    res.json(approvals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE APPROVAL
export const getApprovalById = async (req, res) => {
  try {
    const approval = await Approval.findById(req.params.id)
      .populate("createdBy", "name role")
      .populate("reviewed_by", "name role");

    if (!approval) {
      return res.status(404).json({
        message: "Approval not found",
      });
    }

    res.json(approval);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE APPROVAL STATUS
export const updateApproval = async (req, res) => {
  try {
    const approval = await Approval.findById(req.params.id);

    if (!approval) {
      return res.status(404).json({
        message: "Approval not found",
      });
    }

    approval.approval_status =
      req.body.approval_status || approval.approval_status;

    approval.comments =
      req.body.comments || approval.comments;

    approval.reviewed_by = req.user._id;

    if (
      req.body.approval_status === "approved"
    ) {
      approval.approved_at = new Date();
    }

    await approval.save();

    const updatedApproval = await Approval.findById(
      approval._id
    )
      .populate("createdBy", "name role")
      .populate("reviewed_by", "name role");

    res.json(updatedApproval);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE APPROVAL
export const deleteApproval = async (req, res) => {
  try {
    const approval = await Approval.findByIdAndDelete(
      req.params.id
    );

    if (!approval) {
      return res.status(404).json({
        message: "Approval not found",
      });
    }

    res.json({
      message: "Approval deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};