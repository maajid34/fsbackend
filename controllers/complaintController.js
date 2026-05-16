// import Complaint from "../models/Complaint.js";

// export const createComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getComplaints = async (req, res) => {
//   try {
//     const data = await Complaint.find()
//       .populate("beneficiary", "name district")
//       .populate("createdBy", "name");

//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Complaint from "../models/Complaint.js";
import Beneficiary from "../models/Beneficiary.js";
import Location from "../models/Location.js";
import Approval from "../models/Approval.js";
import { logAction } from "../utils/logAction.js";
// CREATE COMPLAINT
export const createComplaint = async (req, res) => {
  try {
    const {
      beneficiary,
      location,
      complaint_type,
      description,
      date_received,
      status,
      resolution,
      resolved_date,
    } = req.body;

    if (!beneficiary || !location || !complaint_type || !description || !date_received) {
      return res.status(400).json({
        message:
          "Beneficiary, location, complaint type, description and date received are required",
      });
    }

    const beneficiaryExists = await Beneficiary.findById(beneficiary);

    if (!beneficiaryExists) {
      return res.status(404).json({
        message: "Beneficiary not found",
      });
    }

    const locationExists = await Location.findById(location);

    if (!locationExists) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    const complaint = await Complaint.create({
      beneficiary,
      location,
      complaint_type,
      description,
      date_received,
      status,
      resolution,
      resolved_date,
      createdBy: req.user._id,
    });

    await Approval.create({
  module_type: "complaint",
  reference_id: complaint._id,
  approval_status: "pending",
  createdBy: req.user._id,
});

await logAction(
  req.user._id,
  "CREATE",
  "Complaint",
  complaint._id,
  `Created Complaint ${complaint.complaint_type}`
);


    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COMPLAINTS
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("beneficiary", "name sex age category phone")
      .populate({
        path: "location",
        select: "name type latitude longitude district",
        populate: {
          path: "district",
          select: "name code",
        },
      })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE COMPLAINT
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("beneficiary", "name sex age category phone")
      .populate({
        path: "location",
        select: "name type latitude longitude district",
        populate: {
          path: "district",
          select: "name code",
        },
      })
      .populate("createdBy", "name");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COMPLAINT
export const updateComplaint = async (req, res) => {
  try {
    if (req.body.beneficiary) {
      const beneficiaryExists = await Beneficiary.findById(req.body.beneficiary);

      if (!beneficiaryExists) {
        return res.status(404).json({
          message: "Beneficiary not found",
        });
      }
    }

    if (req.body.location) {
      const locationExists = await Location.findById(req.body.location);

      if (!locationExists) {
        return res.status(404).json({
          message: "Location not found",
        });
      }
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("beneficiary", "name sex age category phone")
      .populate({
        path: "location",
        select: "name type latitude longitude district",
        populate: {
          path: "district",
          select: "name code",
        },
      })
      .populate("createdBy", "name");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

  await logAction(
  req.user._id,
  "UPDATE",
  "Complaint",
  complaint._id,
  `Updated Complaint ${complaint.complaint_type}`
);

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMPLAINT
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }
await logAction(
  req.user._id,
  "DELETE",
  "Complaint",
  complaint._id,
  `Deleted Complaint ${complaint.complaint_type}`
);
    res.json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};