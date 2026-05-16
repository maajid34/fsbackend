import ReportRegistry from "../models/ReportRegistry.js";
import Approval from "../models/Approval.js";

// export const createReportRegistry = async (req, res) => {
//   try {
//     const report = await ReportRegistry.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(report);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const createReportRegistry = async (req, res) => {
  try {
    const report = await ReportRegistry.create({
      ...req.body,
      file_path: req.file ? req.file.path : req.body.file_path,
      createdBy: req.user._id,
    });

    await Approval.create({
  module_type: "report",
  reference_id: report._id,
  approval_status: "pending",
  createdBy: req.user._id,
});

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getReportRegistries = async (req, res) => {
  try {
    const reports = await ReportRegistry.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReportRegistryById = async (req, res) => {
  try {
    const report = await ReportRegistry.findById(req.params.id)
      .populate("createdBy", "name role");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const updateReportRegistry = async (req, res) => {
//   try {
//     const report = await ReportRegistry.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).populate("createdBy", "name role");

//     if (!report) {
//       return res.status(404).json({ message: "Report not found" });
//     }

//     res.json(report);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updateReportRegistry = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.file_path = req.file.path;
    }

    const report = await ReportRegistry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("createdBy", "name role");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteReportRegistry = async (req, res) => {
  try {
    const report = await ReportRegistry.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};