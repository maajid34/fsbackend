import DashboardStat from "../models/DashboardStat.js";

export const createDashboardStat = async (req, res) => {
  try {
    const stat = await DashboardStat.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await DashboardStat.find()
      .populate("createdBy", "name role");

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};