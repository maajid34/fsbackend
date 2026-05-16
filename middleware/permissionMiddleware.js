import RolePermission from "../models/RolePermission.js";

export const hasPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      // admin always allowed
      if (req.user.role === "admin") {
        return next();
      }

      const allowed = await RolePermission.findOne({
        role: req.user.role,
        is_allowed: true,
      }).populate("permission");

      const userPermissions = await RolePermission.find({
        role: req.user.role,
        is_allowed: true,
      }).populate("permission");

      const matched = userPermissions.find((rp) => {
        return (
          rp.permission &&
          rp.permission.module_name === moduleName &&
          rp.permission.action === action &&
          rp.permission.is_active === true
        );
      });

      if (!matched) {
        return res.status(403).json({
          message: "Permission denied",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
};