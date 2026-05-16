import Component from "../models/Component.js";

export const getComponents = async (req, res) => {
  try {
    const components = await Component.find().sort({ createdAt: -1 });
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComponent = async (req, res) => {
  try {
    const { code, name, description, budget, status } = req.body;

    const exists = await Component.findOne({ code });
    if (exists) {
      return res.status(400).json({ message: "Component code already exists" });
    }

    const component = await Component.create({
      code,
      name,
      description,
      budget,
      status,
      createdBy: req.user?._id,
    });

    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};