import LearningAction from "../models/LearningAction.js";

// CREATE
export const createLearningAction = async (
  req,
  res
) => {
  try {
    const action = await LearningAction.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
export const getLearningActions = async (
  req,
  res
) => {
  try {
    const actions = await LearningAction.find()
      .populate("report")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(actions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
export const updateLearningAction = async (
  req,
  res
) => {
  try {
    const action =
      await LearningAction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!action) {
      return res.status(404).json({
        message: "Learning action not found",
      });
    }

    res.json(action);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
export const deleteLearningAction = async (
  req,
  res
) => {
  try {
    const action =
      await LearningAction.findByIdAndDelete(
        req.params.id
      );

    if (!action) {
      return res.status(404).json({
        message: "Learning action not found",
      });
    }

    res.json({
      message:
        "Learning action deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};