import CommunityGroup from "../models/CommunityGroup.js";

export const getCommunityGroups = async (req, res) => {
  try {
    const groups = await CommunityGroup.find()
      .populate({
        path: "community",
        select: "name type district",
        populate: {
          path: "district",
          select: "name code",
        },
      })
      .populate("value_chain", "name category")
      .sort({ createdAt: -1 });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCommunityGroup = async (req, res) => {
  try {
    const {
      community,
      name,
      group_type,
      value_chain,
      members_count,
      female_members,
      male_members,
      registration_date,
      status,
      notes,
    } = req.body;

    const exists = await CommunityGroup.findOne({
      community,
      name,
    });

    if (exists) {
      return res.status(400).json({
        message: "Group already exists under this community",
      });
    }

    const group = await CommunityGroup.create({
      community,
      name,
      group_type,
      value_chain: value_chain || null,
      members_count,
      female_members,
      male_members,
      registration_date,
      status,
      notes,
      createdBy: req.user?._id,
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCommunityGroup = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      value_chain: req.body.value_chain || null,
    };

    const group = await CommunityGroup.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: "Community group not found" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommunityGroup = async (req, res) => {
  try {
    const group = await CommunityGroup.findByIdAndDelete(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Community group not found" });
    }

    res.json({ message: "Community group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};