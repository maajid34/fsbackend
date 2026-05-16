import ReportApproval from "../models/ReportApproval.js";
import ReportRegistry from "../models/ReportRegistry.js";

export const createReportApproval = async (req, res) => {
  try {
    const approval = await ReportApproval.create({
      ...req.body,
      reviewed_at:
        req.body.approval_status !== "pending"
          ? new Date()
          : null,
    });

    res.status(201).json(approval);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReportApprovals = async (req, res) => {
  try {
    const approvals = await ReportApproval.find()
      .populate("report")
      .populate("reviewer", "name role")
      .sort({ createdAt: -1 });

    res.json(approvals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReportApproval = async (req, res) => {
  try {
    const approval = await ReportApproval.findById(req.params.id);

    if (!approval) {
      return res.status(404).json({
        message: "Approval record not found",
      });
    }

    approval.approval_status =
      req.body.approval_status || approval.approval_status;

    approval.comments =
      req.body.comments || approval.comments;

    approval.reviewed_at = new Date();

    await approval.save();

    // Auto publish if approved
    if (approval.approval_status === "approved") {
      await ReportRegistry.findByIdAndUpdate(
        approval.report,
        {
          status: "published",
          is_published: true,
        }
      );
    }

    res.json(approval);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};