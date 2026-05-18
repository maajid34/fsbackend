import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import indicatorRoutes from "./routes/indicatorRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import dataQualityRoutes from "./routes/dataQualityRoutes.js";

import dataQualityIssueRoutes from "./routes/dataQualityIssueRoutes.js";
import quarterlyDQARoutes from "./routes/quarterlyDQARoutes.js";
import indicatorTargetRoutes from "./routes/indicatorTargetRoutes.js";
import indicatorResultRoutes from "./routes/indicatorResultRoutes.js";
import resultDisaggregationRoutes from "./routes/resultDisaggregationRoutes.js";
import kpiCardRoutes from "./routes/kpiCardRoutes.js";
import progressBarRoutes from "./routes/progressBarRoutes.js";
import trendChartRoutes from "./routes/trendChartRoutes.js";
import gisDataRoutes from "./routes/gisDataRoutes.js";
import reportRegistryRoutes from "./routes/reportRegistryRoutes.js";
import reportIndicatorRoutes from "./routes/reportIndicatorRoutes.js";
import learningActionRoutes from "./routes/learningActionRoutes.js";
import knowledgeProductRoutes from "./routes/knowledgeProductRoutes.js";
import reportApprovalRoutes from "./routes/reportApprovalRoutes.js";
import publicPortalItemRoutes from "./routes/publicPortalItemRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import rolePermissionRoutes from "./routes/rolePermissionRoutes.js";
import { seedPermissions } from "./utils/seedPermissions.js";
import { seedRolePermissions } from "./utils/seedRolePermissions.js";
import dashboardStatRoutes from "./routes/dashboardStatRoutes.js";
import dashboardSummaryRoutes from "./routes/dashboardSummaryRoutes.js";
import dashboardPerformanceRoutes from "./routes/dashboardPerformanceRoutes.js";
import indicatorAggregationRoutes from "./routes/indicatorAggregationRoutes.js";
import componentRoutes from "./routes/componentRoutes.js";
import subcomponentRoutes from "./routes/subcomponentRoutes.js";
import valueChainRoutes from "./routes/valueChainRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import communityGroupRoutes from "./routes/communityGroupRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportGeneratorRoutes from "./routes/reportGeneratorRoutes.js";
import reportExportRoutes from "./routes/reportExportRoutes.js";
import gisAnalyticsRoutes from "./routes/gisAnalyticsRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import workplanRoutes from "./routes/workplanRoutes.js";
import advancedAnalyticsRoutes from "./routes/advancedAnalyticsRoutes.js";
import expenditureRoutes from "./routes/expenditureRoutes.js";
import path from "path";


dotenv.config();

connectDB();
seedPermissions();

setTimeout(() => {
  seedRolePermissions();
}, 3000);

const app = express();

// app.use(cors());
app.use(express.json());


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fsrprfrontend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/indicators", indicatorRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/locations", locationRoutes);
// app.use("/api/data-quality", dataQualityRoutes);
app.use("/api/data-quality-checks", dataQualityRoutes);
app.use("/api/data-quality-issues", dataQualityIssueRoutes);
app.use("/api/quarterly-dqa", quarterlyDQARoutes);
app.use("/api/indicator-targets", indicatorTargetRoutes);
app.use("/api/indicator-results", indicatorResultRoutes);
app.use("/api/result-disaggregations", resultDisaggregationRoutes);
app.use("/api/kpi-cards", kpiCardRoutes);
app.use("/api/progress-bars", progressBarRoutes);
app.use("/api/trend-charts", trendChartRoutes);
app.use("/api/gis-data", gisDataRoutes);
app.use("/api/report-registry", reportRegistryRoutes);
app.use("/api/report-indicators", reportIndicatorRoutes);
app.use("/api/learning-actions", learningActionRoutes);
app.use("/api/knowledge-products", knowledgeProductRoutes);
app.use("/api/report-approvals", reportApprovalRoutes);
app.use("/api/public-portal", publicPortalItemRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/role-permissions", rolePermissionRoutes);
app.use("/api/dashboard-stats", dashboardStatRoutes);
app.use("/api/dashboard-summary", dashboardSummaryRoutes);
app.use("/api/dashboard-performance", dashboardPerformanceRoutes);
app.use("/api/indicator-aggregation", indicatorAggregationRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/subcomponents", subcomponentRoutes);
app.use("/api/value-chains", valueChainRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/community-groups", communityGroupRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", reportGeneratorRoutes);
app.use("/api/export", reportExportRoutes);
app.use("/api", gisAnalyticsRoutes);
app.use("/api", alertRoutes);
app.use("/api/workplans", workplanRoutes);
app.use("/api/advanced-analytics", advancedAnalyticsRoutes);
app.use("/api/expenditures", expenditureRoutes);

// images
app.use("/uploads", express.static("uploads"));




app.get("/", (req, res) => {
  res.send("MIS Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});