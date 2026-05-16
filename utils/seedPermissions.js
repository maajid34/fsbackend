import Permission from "../models/Permission.js";

export const seedPermissions = async () => {
  const modules = [
    "beneficiaries",
    "activities",
    "services",
    "complaints",
    "districts",
    "locations",
    "indicators",
    "indicator_targets",
    "indicator_results",
    "reports",
    "report_registry",
    "public_portal",
    "data_quality",
    "users",
  ];

  const actions = [
    "create",
    "read",
    "update",
    "delete",
    "approve",
    "publish",
    "export",
  ];

  for (const moduleName of modules) {
    for (const action of actions) {
      const permission_name = `${action}_${moduleName}`;

      await Permission.findOneAndUpdate(
        { permission_name },
        {
          permission_name,
          module_name: moduleName,
          action,
          description: `Allows user to ${action} ${moduleName}`,
          is_active: true,
        },
        { upsert: true, new: true }
      );
    }
  }

  console.log("✅ Permissions seeded successfully");
};