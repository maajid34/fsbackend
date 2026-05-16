import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";
import Service from "../models/Service.js";
import Complaint from "../models/Complaint.js";
import Indicator from "../models/Indicator.js";
import ReportRegistry from "../models/ReportRegistry.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalBeneficiaries,
      totalActivities,
      totalServices,
      totalComplaints,
      totalIndicators,
      totalReports,
      approvedReports,
      pendingComplaints,
    ] = await Promise.all([
      Beneficiary.countDocuments(),
      Activity.countDocuments(),
      Service.countDocuments(),
      Complaint.countDocuments(),
      Indicator.countDocuments(),
      ReportRegistry.countDocuments(),
      ReportRegistry.countDocuments({ status: "published" }),
      Complaint.countDocuments({ status: { $in: ["open", "in_review"] } }),
    ]);

    res.json({
      totalBeneficiaries,
      totalActivities,
      totalServices,
      totalComplaints,
      totalIndicators,
      totalReports,
      approvedReports,
      pendingComplaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};