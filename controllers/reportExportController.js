import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import IndicatorResult from "../models/IndicatorResult.js";
import ResultDisaggregation from "../models/ResultDisaggregation.js";

const getQuarterlyReportData = async (year, quarter) => {
  const results = await IndicatorResult.find({
    period_year: Number(year),
    period_quarter: quarter,
  })
    .populate("indicator", "code name component result_level unit_of_measure")
    .sort({ achievement_percentage: -1 });

  const disaggregations = await ResultDisaggregation.find()
    .populate({
      path: "indicator_result",
      match: {
        period_year: Number(year),
        period_quarter: quarter,
      },
      populate: {
        path: "indicator",
        select: "code name",
      },
    });

  const validDisaggregations = disaggregations.filter(
    (item) => item.indicator_result
  );

  const totalIndicators = results.length;
  const onTrack = results.filter((r) => r.performance_status === "on_track").length;
  const atRisk = results.filter((r) => r.performance_status === "at_risk").length;
  const offTrack = results.filter((r) => r.performance_status === "off_track").length;

  const averagePerformance =
    results.length > 0
      ? Number(
          (
            results.reduce(
              (sum, item) => sum + Number(item.achievement_percentage || 0),
              0
            ) / results.length
          ).toFixed(1)
        )
      : 0;

  const genderSummary = {
    male: validDisaggregations
      .filter(
        (d) =>
          d.disaggregation_type === "gender" &&
          d.disaggregation_value === "male"
      )
      .reduce((sum, item) => sum + Number(item.result_value || 0), 0),

    female: validDisaggregations
      .filter(
        (d) =>
          d.disaggregation_type === "gender" &&
          d.disaggregation_value === "female"
      )
      .reduce((sum, item) => sum + Number(item.result_value || 0), 0),
  };

  const indicatorRows = results.map((item) => ({
    code: item.indicator?.code || "-",
    name: item.indicator?.name || "-",
    component: item.indicator?.component || "-",
    unit: item.indicator?.unit_of_measure || "-",
    target: Number(item.target_value || 0),
    actual: Number(item.result_value || 0),
    achievement: Number(item.achievement_percentage || 0),
    variance: Number(item.variance || 0),
    status: item.performance_status || "off_track",
  }));

  return {
    year,
    quarter,
    summary: {
      totalIndicators,
      onTrack,
      atRisk,
      offTrack,
      averagePerformance,
    },
    genderSummary,
    indicatorRows,
  };
};

export const exportQuarterlyReportPDF = async (req, res) => {
  try {
    const { year, quarter } = req.query;

    if (!year || !quarter) {
      return res.status(400).json({ message: "Year and quarter are required" });
    }

    const data = await getQuarterlyReportData(year, quarter);

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=quarterly-report-${year}-${quarter}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Quarterly M&E Progress Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Reporting Period: ${year} ${quarter}`);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text("1. Summary", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).text(`Total Indicators: ${data.summary.totalIndicators}`);
    doc.text(`On Track: ${data.summary.onTrack}`);
    doc.text(`At Risk: ${data.summary.atRisk}`);
    doc.text(`Off Track: ${data.summary.offTrack}`);
    doc.text(`Average Performance: ${data.summary.averagePerformance}%`);
    doc.moveDown();

    doc.fontSize(14).text("2. Gender Summary", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).text(`Male: ${data.genderSummary.male}`);
    doc.text(`Female: ${data.genderSummary.female}`);
    doc.moveDown();

    doc.fontSize(14).text("3. Indicator Performance", { underline: true });
    doc.moveDown(0.5);

    data.indicatorRows.forEach((item, index) => {
      doc
        .fontSize(10)
        .text(
          `${index + 1}. ${item.code} - ${item.name}
Component: ${item.component}
Target: ${item.target} | Actual: ${item.actual} | Achievement: ${item.achievement}% | Variance: ${item.variance}
Status: ${item.status}`,
          { width: 500 }
        );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportQuarterlyReportExcel = async (req, res) => {
  try {
    const { year, quarter } = req.query;

    if (!year || !quarter) {
      return res.status(400).json({ message: "Year and quarter are required" });
    }

    const data = await getQuarterlyReportData(year, quarter);

    const workbook = new ExcelJS.Workbook();

    const summarySheet = workbook.addWorksheet("Summary");

    summarySheet.columns = [
      { header: "Metric", key: "metric", width: 30 },
      { header: "Value", key: "value", width: 20 },
    ];

    summarySheet.addRows([
      { metric: "Reporting Period", value: `${year} ${quarter}` },
      { metric: "Total Indicators", value: data.summary.totalIndicators },
      { metric: "On Track", value: data.summary.onTrack },
      { metric: "At Risk", value: data.summary.atRisk },
      { metric: "Off Track", value: data.summary.offTrack },
      {
        metric: "Average Performance",
        value: `${data.summary.averagePerformance}%`,
      },
      { metric: "Male", value: data.genderSummary.male },
      { metric: "Female", value: data.genderSummary.female },
    ]);

    const indicatorSheet = workbook.addWorksheet("Indicator Performance");

    indicatorSheet.columns = [
      { header: "Code", key: "code", width: 15 },
      { header: "Indicator", key: "name", width: 45 },
      { header: "Component", key: "component", width: 20 },
      { header: "Unit", key: "unit", width: 15 },
      { header: "Target", key: "target", width: 15 },
      { header: "Actual", key: "actual", width: 15 },
      { header: "Achievement %", key: "achievement", width: 18 },
      { header: "Variance", key: "variance", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    indicatorSheet.addRows(data.indicatorRows);

    [summarySheet, indicatorSheet].forEach((sheet) => {
      sheet.getRow(1).font = { bold: true };
      sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=quarterly-report-${year}-${quarter}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};