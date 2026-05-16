import ValueChain from "../models/ValueChain.js";

export const getValueChains = async (req, res) => {
  try {
    const valueChains = await ValueChain.find().sort({ createdAt: -1 });
    res.json(valueChains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createValueChain = async (req, res) => {
  try {
    const { name, description, category, status } = req.body;

    const exists = await ValueChain.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Value chain already exists" });
    }

    const valueChain = await ValueChain.create({
      name,
      description,
      category,
      status,
      createdBy: req.user?._id,
    });

    res.status(201).json(valueChain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateValueChain = async (req, res) => {
  try {
    const valueChain = await ValueChain.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!valueChain) {
      return res.status(404).json({ message: "Value chain not found" });
    }

    res.json(valueChain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteValueChain = async (req, res) => {
  try {
    const valueChain = await ValueChain.findByIdAndDelete(req.params.id);

    if (!valueChain) {
      return res.status(404).json({ message: "Value chain not found" });
    }

    res.json({ message: "Value chain deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};