import District from "../models/District.js";
import { logAction } from "../utils/logAction.js";

// CREATE DISTRICT
export const createDistrict = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "District name and code are required",
      });
    }

    const district = await District.create({
      name,
      code,
    });

    await logAction(
  req.user._id,
  "CREATE",
  "District",
  district._id,
  `Created District ${district.name}`
);

    res.status(201).json(district);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL DISTRICTS
export const getDistricts = async (req, res) => {
  try {
    const districts = await District.find().sort({ createdAt: -1 });
    res.json(districts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE DISTRICT
export const getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id);

    if (!district) {
      return res.status(404).json({
        message: "District not found",
      });
    }

    res.json(district);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE DISTRICT
export const updateDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!district) {
      return res.status(404).json({
        message: "District not found",
      });
    }
await logAction(
  req.user._id,
  "UPDATE",
  "District",
  district._id,
  `Updated District ${district.name}`
);
    res.json(district);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SOFT DELETE / DEACTIVATE DISTRICT
export const deleteDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      { new: true }
    );

    if (!district) {
      return res.status(404).json({
        message: "District not found",
      });
    }
await logAction(
  req.user._id,
  "DELETE",
  "District",
  district._id,
  `Deactivated District ${district.name}`
);
    res.json({
      message: "District deactivated successfully",
      district,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};