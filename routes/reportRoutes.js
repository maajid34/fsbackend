// import express from "express";
// import { generateReport } from "../controllers/reportController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/pdf", protect, generateReport);


// export default router;

import express from "express";
import { generateReport,generateAnnualReport } from "../controllers/reportController.js";
import { getQuarterlyReport } from "../controllers/quarterlyReportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pdf", protect, generateReport);
router.get("/quarterly", protect, getQuarterlyReport);


router.get("/annual", protect, generateAnnualReport);

export default router;