import DataQualityIssue from "../models/DataQualityIssue.js";
import DataQualityCheck from "../models/DataQualityCheck.js";

// CREATE ISSUE
export const createDataQualityIssue = async (req, res) => {
  try {
    const {
      dq_check,
      table_name,
      record_id,
      field_name,
      issue_type,
      issue_description,
      severity,
      status,
    } = req.body;

    if (
      !dq_check ||
      !table_name ||
      !record_id ||
      !field_name ||
      !issue_type ||
      !issue_description
    ) {
      return res.status(400).json({
        message:
          "DQ check, table name, record ID, field name, issue type and description are required",
      });
    }

    const dqCheckExists = await DataQualityCheck.findById(dq_check);

    if (!dqCheckExists) {
      return res.status(404).json({
        message: "Data quality check not found",
      });
    }

    const issue = await DataQualityIssue.create({
      dq_check,
      table_name,
      record_id,
      field_name,
      issue_type,
      issue_description,
      severity,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ISSUES
export const getDataQualityIssues = async (req, res) => {
  try {
    const issues = await DataQualityIssue.find()
      .populate("dq_check", "table_name check_type status")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ISSUE
export const getDataQualityIssueById = async (req, res) => {
  try {
    const issue = await DataQualityIssue.findById(req.params.id)
      .populate("dq_check", "table_name check_type status")
      .populate("createdBy", "name");

    if (!issue) {
      return res.status(404).json({
        message: "Data quality issue not found",
      });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ISSUE STATUS
export const updateDataQualityIssue = async (req, res) => {
  try {
    const issue = await DataQualityIssue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("dq_check", "table_name check_type status")
      .populate("createdBy", "name");

    if (!issue) {
      return res.status(404).json({
        message: "Data quality issue not found",
      });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ISSUE
export const deleteDataQualityIssue = async (req, res) => {
  try {
    const issue = await DataQualityIssue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Data quality issue not found",
      });
    }

    res.json({
      message: "Data quality issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};