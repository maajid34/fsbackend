import QuarterlyDQA from "../models/QuarterlyDQA.js";

// CREATE QUARTERLY DQA
export const createQuarterlyDQA = async (req, res) => {
  try {
    const {
      quarter,
      year,
      data_source_summary,
      accuracy_score,
      completeness_score,
      issues_summary,
      recommendations,
      status,
    } = req.body;

    if (
      !quarter ||
      !year ||
      accuracy_score === undefined ||
      completeness_score === undefined
    ) {
      return res.status(400).json({
        message:
          "Quarter, year, accuracy score and completeness score are required",
      });
    }

    const quarterlyDQA = await QuarterlyDQA.create({
      quarter,
      year,
      data_source_summary,
      accuracy_score,
      completeness_score,
      issues_summary,
      recommendations,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(quarterlyDQA);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL QUARTERLY DQAs
export const getQuarterlyDQAs = async (req, res) => {
  try {
    const reports = await QuarterlyDQA.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE QUARTERLY DQA
export const getQuarterlyDQAById = async (req, res) => {
  try {
    const report = await QuarterlyDQA.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!report) {
      return res.status(404).json({
        message: "Quarterly DQA not found",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE QUARTERLY DQA
export const updateQuarterlyDQA = async (req, res) => {
  try {
    const report = await QuarterlyDQA.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("createdBy", "name");

    if (!report) {
      return res.status(404).json({
        message: "Quarterly DQA not found",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE QUARTERLY DQA
export const deleteQuarterlyDQA = async (req, res) => {
  try {
    const report = await QuarterlyDQA.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Quarterly DQA not found",
      });
    }

    res.json({
      message: "Quarterly DQA deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};