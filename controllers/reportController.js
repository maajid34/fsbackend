// import PDFDocument from "pdfkit";
// import Beneficiary from "../models/Beneficiary.js";

// export const generateReport = async (req, res) => {
//   try {
//     const beneficiaries = await Beneficiary.find({ status: "approved" });

//     const total = beneficiaries.length;
//     const male = beneficiaries.filter(b => b.sex === "male").length;
//     const female = beneficiaries.filter(b => b.sex === "female").length;

//     const doc = new PDFDocument();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     doc.pipe(res);

//     doc.fontSize(20).text("MIS Report", { align: "center" });

//     doc.moveDown();
//     doc.fontSize(14).text(`Total Beneficiaries: ${total}`);
//     doc.text(`Male: ${male}`);
//     doc.text(`Female: ${female}`);

//     doc.end();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import PDFDocument from "pdfkit";
import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";
import Indicator from "../models/Indicator.js";

export const generateReport = async (req, res) => {
  try {
    // 📊 DATA
    const beneficiaries = await Beneficiary.find({ status: "approved" });
    const activities = await Activity.find();
    const indicators = await Indicator.find();

    // 🔢 BENEFICIARY STATS
    const total = beneficiaries.length;
    const male = beneficiaries.filter(b => b.sex === "male").length;
    const female = beneficiaries.filter(b => b.sex === "female").length;

    // 🔢 ACTIVITY STATS
    const totalActivities = activities.length;
    const ongoing = activities.filter(a => a.status === "ongoing").length;
    const completed = activities.filter(a => a.status === "completed").length;

    // 🔢 INDICATOR PERFORMANCE
    const performance = indicators.map(i => {
      const progress = i.endTarget
        ? Math.round((i.achieved / i.endTarget) * 100)
        : 0;

      let status = "RED";
      if (progress >= 80) status = "GREEN";
      else if (progress >= 50) status = "YELLOW";

      return { name: i.name, progress, status };
    });

    // 📄 PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    doc.pipe(res);

    // 🔥 TITLE
    doc.fontSize(22).text("MIS M&E REPORT", { align: "center" });

    doc.moveDown();

    // =========================
    // 1️⃣ BENEFICIARIES
    // =========================
    doc.fontSize(16).text("Beneficiaries", { underline: true });
    doc.fontSize(12).text(`Total: ${total}`);
    doc.text(`Male: ${male}`);
    doc.text(`Female: ${female}`);

    doc.moveDown();

    // =========================
    // 2️⃣ ACTIVITIES
    // =========================
    doc.fontSize(16).text("Activities", { underline: true });
    doc.text(`Total Activities: ${totalActivities}`);
    doc.text(`Ongoing: ${ongoing}`);
    doc.text(`Completed: ${completed}`);

    doc.moveDown();

    // =========================
    // 3️⃣ INDICATOR PERFORMANCE
    // =========================
    doc.fontSize(16).text("Indicator Performance", { underline: true });

    performance.forEach(p => {
      doc.text(`${p.name}: ${p.progress}% (${p.status})`);
    });

    doc.moveDown();

    // =========================
    // 4️⃣ KEY FINDINGS
    // =========================
    doc.fontSize(16).text("Key Findings", { underline: true });

    doc.text(
      "• System shows current performance of indicators.\n" +
      "• Activities progress tracked.\n" +
      "• Gender distribution recorded.\n"
    );

    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateAnnualReport = async (req, res) => {
  try {
    const { year } = req.query;

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const beneficiaries = await Beneficiary.find({
      createdAt: { $gte: start, $lte: end },
      status: "approved",
    });

    const activities = await Activity.find({
      createdAt: { $gte: start, $lte: end },
      statusApproval: "approved",
    });

    const male = beneficiaries.filter(b => b.sex === "male").length;
    const female = beneficiaries.filter(b => b.sex === "female").length;

    const completed = activities.filter(a => a.status === "completed").length;

    // 📄 PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=annual-report-${year}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text(`Annual Report ${year}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Total Beneficiaries: ${beneficiaries.length}`);
    doc.text(`Male: ${male}`);
    doc.text(`Female: ${female}`);

    doc.moveDown();

    doc.text(`Total Activities: ${activities.length}`);
    doc.text(`Completed Activities: ${completed}`);

    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};