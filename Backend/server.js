const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post("/submit-form", (req, res) => {
  const formData = req.body;

  // File path for the Excel file
  const filePath = "/Users/niteshsahu/Desktop/xlxl/data.xlsx"; // Update path as needed

  // Check if the file exists, or create a new workbook
  let workbook;
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
  } else {
    workbook = XLSX.utils.book_new();
    // Create a sheet if the file doesn't exist
    const sheetName = "Form Data";
    const worksheet = XLSX.utils.json_to_sheet([]);
    workbook.Sheets[sheetName] = worksheet;
    workbook.SheetNames.push(sheetName);
  }

  // Get the sheet or create a new one
  const sheetName = "Form Data";
  let worksheet = workbook.Sheets[sheetName];
  let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];

  // Add the new form data
  data.push(formData);

  // Convert the data back to a worksheet
  worksheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets[sheetName] = worksheet;

  // Save the workbook to a file
  try {
    XLSX.writeFile(workbook, filePath);
    res.status(200).json({ message: "Data saved to Excel successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data!" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
