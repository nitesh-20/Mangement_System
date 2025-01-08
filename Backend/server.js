const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Utility function to format date to "yyyy-mm" for monthly report
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

// Utility function to generate report
const generateReport = (data, type) => {
  const filteredData = [];

  if (type === "monthly") {
    // Filter by month
    const currentMonth = formatDate(new Date());
    filteredData.push(...data.filter((entry) => formatDate(entry.date) === currentMonth));
  } else if (type === "product") {
    // Filter by product
    const product = "kirana"; // Example, can pass as parameter
    filteredData.push(...data.filter((entry) => entry.product === product));
  }

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  return worksheet;
};

// Endpoint to generate report
app.get("/generate-report", (req, res) => {
  const filePath = "/Users/niteshsahu/Desktop/xlxl/data.xlsx";

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Excel file not found!" });
  }

  // Read the workbook and sheet
  const workbook = XLSX.readFile(filePath);
  const sheetName = "Form Data";
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet data to JSON
  let data = XLSX.utils.sheet_to_json(worksheet);

  // Generate report (example for monthly)
  const monthlyReport = generateReport(data, "monthly");

  // Create a new workbook for report
  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, monthlyReport, "Monthly Report");

  // Save the report to a new file
  const reportPath = "/Users/niteshsahu/Desktop/xlxl/monthly_report.xlsx";
  XLSX.writeFile(newWorkbook, reportPath);

  res.status(200).json({ message: "Report generated successfully!", reportPath });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
