import Location from "../models/Location.js";
import District from "../models/District.js";
import { logAction } from "../utils/logAction.js";

// CREATE LOCATION
export const createLocation = async (req, res) => {
  try {
    const { district, name, type, latitude, longitude } = req.body;

    if (!district || !name || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "District, name, latitude and longitude are required",
      });
    }

    const districtExists = await District.findById(district);

    if (!districtExists) {
      return res.status(404).json({
        message: "District not found",
      });
    }

    const location = await Location.create({
      district,
      name,
      type,
      latitude,
      longitude,
    });

    await logAction(
  req.user._id,
  "CREATE",
  "Location",
  location._id,
  `Created Location ${location.name}`
);

    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL LOCATIONS
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find()
      .populate("district", "name code")
      .sort({ createdAt: -1 });

    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE LOCATION
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate(
      "district",
      "name code"
    );

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LOCATION
export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("district", "name code");

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    await logAction(
  req.user._id,
  "UPDATE",
  "Location",
  location._id,
  `Updated Location ${location.name}`
);

    res.json(location);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SOFT DELETE / DEACTIVATE LOCATION
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      { new: true }
    );

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }


    await logAction(
  req.user._id,
  "DELETE",
  "Location",
  location._id,
  `Deactivated Location ${location.name}`
);
    res.json({
      message: "Location deactivated successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};