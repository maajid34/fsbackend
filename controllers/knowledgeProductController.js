import KnowledgeProduct from "../models/KnowledgeProduct.js";

export const createKnowledgeProduct = async (req, res) => {
  try {
    const product = await KnowledgeProduct.create({
      ...req.body,
      file_path: req.file ? req.file.path : req.body.file_path,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKnowledgeProducts = async (req, res) => {
  try {
    const products = await KnowledgeProduct.find()
      .populate("report")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateKnowledgeProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.file_path = req.file.path;
    }

    const product = await KnowledgeProduct.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Knowledge product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteKnowledgeProduct = async (req, res) => {
  try {
    const product = await KnowledgeProduct.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Knowledge product not found" });
    }

    res.json({ message: "Knowledge product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};