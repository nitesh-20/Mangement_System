const fs = require('fs');
const path = require('path');
const exceljs = require('exceljs');

// Controller for generating the Product Report
exports.getProductReport = async (req, res) => {
  const filePath = path.join(__dirname, '../data/ProductData/productData.xlsx'); // Path to your product data file

  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet('ProductData');
    const productData = [];
    
    // Loop through each row to collect product and its amount
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) {
        const product = row.getCell(2).value;  // Product name (Column 2)
        const amount = parseFloat(row.getCell(4).value) || 0;  // Amount (Column 4)

        // Ensure amount is a number and add to product data
        if (product && !isNaN(amount)) {
          productData.push({
            product,
            amount,
          });
        }
      }
    });

    // Aggregate expenses by product
    const report = productData.reduce((acc, item) => {
      acc[item.product] = (acc[item.product] || 0) + item.amount;
      return acc;
    }, {});

    res.json(report); // Return aggregated product data
  } catch (error) {
    console.error('Error generating product report:', error);
    res.status(500).json({ message: 'Error generating product report' });
  }
};

// Controller for generating the Monthly Report
exports.getMonthlyReport = async (req, res) => {
  const filePath = path.join(__dirname, '../data/ProductData/productData.xlsx'); // Path to your product data file

  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet('ProductData');
    const monthlyReport = [];

    // Loop through each row to collect date and amount
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) {
        const date = row.getCell(3).value;  // Date (Column 3)
        const amount = parseFloat(row.getCell(4).value) || 0;  // Amount (Column 4)

        // Ensure date and amount are valid
        if (date && !isNaN(amount)) {
          monthlyReport.push({
            date,
            amount,
          });
        }
      }
    });

    // Aggregate expenses by month (assuming date format is dd/mm/yyyy)
    const report = monthlyReport.reduce((acc, item) => {
      const month = item.date.split('/')[1]; // Extract month from the date (e.g., "dd/mm/yyyy")
      acc[month] = (acc[month] || 0) + item.amount; // Sum up the expenses for the month
      return acc;
    }, {});

    res.json(report); // Return aggregated monthly data
  } catch (error) {
    console.error('Error generating monthly report:', error);
    res.status(500).json({ message: 'Error generating monthly report' });
  }
};
