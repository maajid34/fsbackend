import GISData from "../models/GISData.js";

// CREATE GIS DATA
export const createGISData = async (req, res) => {
  try {
    const gis = await GISData.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(gis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL GIS DATA
export const getGISData = async (req, res) => {
  try {
    const data = await GISData.find()
      .populate("location")
      .populate("district")
      .populate("createdBy", "name role");

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE GIS DATA
export const updateGISData = async (req, res) => {
  try {
    const gis = await GISData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!gis) {
      return res.status(404).json({
        message: "GIS data not found",
      });
    }

    res.json(gis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE GIS DATA
export const deleteGISData = async (req, res) => {
  try {
    const gis = await GISData.findByIdAndDelete(req.params.id);

    if (!gis) {
      return res.status(404).json({
        message: "GIS data not found",
      });
    }

    res.json({
      message: "GIS data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};