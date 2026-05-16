import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";

// KPI DATA
export const getDashboardStats = async (req, res) => {
  try {
    // only approved beneficiaries
    const beneficiaries = await Beneficiary.find({ status: "approved" });

    const total = beneficiaries.length;

    const male = beneficiaries.filter(b => b.sex === "male").length;
    const female = beneficiaries.filter(b => b.sex === "female").length;

    // activities
    const activities = await Activity.find({ statusApproval: "approved" });
    const totalActivities = activities.length;

    res.json({
      totalBeneficiaries: total,
      male,
      female,
      totalActivities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};