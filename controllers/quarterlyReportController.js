import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";

export const getQuarterlyReport = async (req, res) => {
  try {
    const { year, quarter } = req.query;

    if (!year || !quarter) {
      return res.status(400).json({ message: "Year and quarter required" });
    }

    // 📅 DEFINE QUARTERS
    const quarters = {
      Q1: { start: `${year}-01-01`, end: `${year}-03-31` },
      Q2: { start: `${year}-04-01`, end: `${year}-06-30` },
      Q3: { start: `${year}-07-01`, end: `${year}-09-30` },
      Q4: { start: `${year}-10-01`, end: `${year}-12-31` },
    };

    const { start, end } = quarters[quarter];

    const startDate = new Date(start);
    const endDate = new Date(end);

    // 📊 BENEFICIARIES
    const beneficiaries = await Beneficiary.find({
      createdAt: { $gte: startDate, $lte: endDate },
      status: "approved",
    });

    const male = beneficiaries.filter(b => b.sex === "male").length;
    const female = beneficiaries.filter(b => b.sex === "female").length;

    // 📊 ACTIVITIES
    const activities = await Activity.find({
      createdAt: { $gte: startDate, $lte: endDate },
      statusApproval: "approved",
    });

    const completed = activities.filter(a => a.status === "completed").length;

    res.json({
      totalBeneficiaries: beneficiaries.length,
      male,
      female,
      totalActivities: activities.length,
      completedActivities: completed,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};