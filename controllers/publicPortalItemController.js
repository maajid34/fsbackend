import PublicPortalItem from "../models/PublicPortalItem.js";

export const createPublicPortalItem = async (req, res) => {
  try {
    const item = await PublicPortalItem.create({
      ...req.body,
      published_at: req.body.is_published ? new Date() : null,
      createdBy: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicPortalItems = async (req, res) => {
  try {
    const items = await PublicPortalItem.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublishedPortalItems = async (req, res) => {
  try {
    const items = await PublicPortalItem.find({ is_published: true })
      .sort({ published_at: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePublicPortalItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.is_published === true) {
      updateData.published_at = new Date();
    }

    const item = await PublicPortalItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("createdBy", "name role");

    if (!item) {
      return res.status(404).json({
        message: "Public portal item not found",
      });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePublicPortalItem = async (req, res) => {
  try {
    const item = await PublicPortalItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Public portal item not found",
      });
    }

    res.json({
      message: "Public portal item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};