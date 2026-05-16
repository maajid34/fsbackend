import AuditLog from "../models/AuditLog.js";

export const logAction = async (
  userId,
  action,
  table_name,
  record_id,
  details,
  ip_address = null
) => {
  try {
    await AuditLog.create({
      user: userId,
      action,
      table_name,
      record_id,
      details,
      ip_address,
    });
  } catch (err) {
    console.log("Audit log error:", err.message);
  }
};