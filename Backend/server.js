const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Route for handling form submission
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  const filePath = "/path/to/your/data.xlsx"; // Ensure this path is correct

  try {
    let workbook;
    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
    } else {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "Form Data";
    let worksheet = workbook.Sheets[sheetName];
    let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];

    data.push(formData);
    worksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = worksheet;

    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data", error: error.message });
  }
});

// Generate product-wise report
app.get("/generate-product-report", (req, res) => {
  try {
    const filePath = "/path/to/your/data.xlsx"; // Ensure this path is correct
    if (fs.existsSync(filePath)) {
      const workbook = XLSX.readFile(filePath);
      const sheetName = "Form Data";
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const productReport = data.reduce((acc, item) => {
        if (!acc[item.product]) {
          acc[item.product] = [];
        }
        acc[item.product].push(item);
        return acc;
      }, {});

      res.status(200).json(productReport);
    } else {
      res.status(404).json({ message: "Excel file not found" });
    }
  } catch (error) {
    console.error("Error generating product report:", error);
    res.status(500).json({ message: "Error generating product report", error: error.message });
  }
});

// Generate monthly report
app.get("/generate-monthly-report", (req, res) => {
    try {
      const filePath = "/path/to/your/data.xlsx"; // Ensure this path is correct
      if (fs.existsSync(filePath)) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = "Form Data";
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
  
        const monthlyReport = data.reduce((acc, item) => {
          const month = new Date(item.date).getMonth() + 1; // Month is 0-indexed
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(item);
          return acc;
        }, {});
  
        res.status(200).json(monthlyReport);
      } else {
        res.status(404).json({ message: "Excel file not found" });
      }
    } catch (error) {
      console.error("Error generating monthly report:", error);
      res.status(500).json({ message: "Error generating monthly report", error: error.message });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
