import Community from "../models/Community.js";

export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .populate("district", "name code")
      .sort({ createdAt: -1 });

    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCommunity = async (req, res) => {
  try {
    const {
      district,
      name,
      type,
      population,
      vulnerability_level,
      status,
      notes,
    } = req.body;

    const exists = await Community.findOne({ district, name });

    if (exists) {
      return res.status(400).json({
        message: "Community already exists under this district",
      });
    }

    const community = await Community.create({
      district,
      name,
      type,
      population,
      vulnerability_level,
      status,
      notes,
      createdBy: req.user?._id,
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};