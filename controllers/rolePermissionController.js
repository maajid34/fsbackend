import RolePermission from "../models/RolePermission.js";

export const createRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.find()
      .populate("permission")
      .populate("createdBy", "name role");

    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("permission")
      .populate("createdBy", "name role");

    if (!rolePermission) {
      return res.status(404).json({
        message: "Role permission not found",
      });
    }

    res.json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndDelete(
      req.params.id
    );

    if (!rolePermission) {
      return res.status(404).json({
        message: "Role permission not found",
      });
    }

    res.json({
      message: "Role permission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};