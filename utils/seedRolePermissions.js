import Permission from "../models/Permission.js";
import RolePermission from "../models/RolePermission.js";

export const seedRolePermissions = async () => {
  const permissions = await Permission.find();

  const roleRules = {
    admin: ["create", "read", "update", "delete", "approve", "publish", "export"],
    manager: ["create", "read", "update", "approve", "export"],
    data_entry: ["create", "read"],
    viewer: ["read"],
  };

  for (const role of Object.keys(roleRules)) {
    for (const permission of permissions) {
      const isAllowed = roleRules[role].includes(permission.action);

      await RolePermission.findOneAndUpdate(
        {
          role,
          permission: permission._id,
        },
        {
          role,
          permission: permission._id,
          is_allowed: isAllowed,
        },
        { upsert: true, new: true }
      );
    }
  }

  console.log("✅ Role permissions seeded successfully");
};