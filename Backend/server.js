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

  // Log the incoming form data to verify it's correct
  console.log("Received form data:", formData);

  // Update file path to the full path of your xlxl folder on desktop
  const filePath = "/Users/niteshsahu/Desktop/xlxl/data.xlsx"; // <-- Your path here

  // Log the file path to check if it's correct
  console.log("Saving to Excel file:", filePath);

  try {
    // Check if the file exists, or create a new workbook
    let workbook;
    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
    } else {
      workbook = XLSX.utils.book_new();
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
    XLSX.writeFile(workbook, filePath);

    // Send success response
    res.status(200).json({ message: "Data saved to Excel successfully!" });
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error saving data:", error);

    // Send failure response with error message
    res.status(500).json({ message: "Error saving data!", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
