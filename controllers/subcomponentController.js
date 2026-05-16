import Subcomponent from "../models/Subcomponent.js";

export const getSubcomponents = async (req, res) => {
  try {
    const subcomponents = await Subcomponent.find()
      .populate("component", "code name")
      .sort({ createdAt: -1 });

    res.json(subcomponents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubcomponent = async (req, res) => {
  try {
    const { component, code, name, description, budget, status } = req.body;

    const exists = await Subcomponent.findOne({ component, code });
    if (exists) {
      return res.status(400).json({
        message: "Subcomponent code already exists under this component",
      });
    }

    const subcomponent = await Subcomponent.create({
      component,
      code,
      name,
      description,
      budget,
      status,
      createdBy: req.user?._id,
    });

    res.status(201).json(subcomponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubcomponent = async (req, res) => {
  try {
    const subcomponent = await Subcomponent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subcomponent) {
      return res.status(404).json({ message: "Subcomponent not found" });
    }

    res.json(subcomponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubcomponent = async (req, res) => {
  try {
    const subcomponent = await Subcomponent.findByIdAndDelete(req.params.id);

    if (!subcomponent) {
      return res.status(404).json({ message: "Subcomponent not found" });
    }

    res.json({ message: "Subcomponent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};