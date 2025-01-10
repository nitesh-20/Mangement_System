const fs = require('fs');
const path = require('path');
const exceljs = require('exceljs');

exports.submitProduct = async (req, res) => {
  const productData = req.body;

  // Path to the Excel file
  const directoryPath = '/Users/niteshsahu/Desktop/Management_System/Backend/Data/ProductData';
  const filePath = path.join(directoryPath, 'productData.xlsx');

  try {
    // Ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created: ${directoryPath}`);
    }

    const workbook = new exceljs.Workbook();
    let sheet;

    // Check if the Excel file exists
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath); // Load existing file
      sheet = workbook.getWorksheet('ProductData');
      if (!sheet) {
        sheet = workbook.addWorksheet('ProductData'); // Create worksheet if not found
        sheet.columns = [
          { header: 'Vendor', key: 'vendor' },
          { header: 'Product', key: 'product' },
          { header: 'Date', key: 'date' },
          { header: 'Amount', key: 'amount' },
        ];
      }
    } else {
      sheet = workbook.addWorksheet('ProductData'); // Create a new file and worksheet
      sheet.columns = [
        { header: 'Vendor', key: 'vendor' },
        { header: 'Product', key: 'product' },
        { header: 'Date', key: 'date' },
        { header: 'Amount', key: 'amount' },
      ];
    }

    // Append new data to the worksheet
    console.log('Adding row:', productData);
    sheet.addRow(productData);

    // Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);
    console.log(`File updated successfully: ${filePath}`);

    return res.status(200).json({ message: 'Product details saved successfully!' });
  } catch (error) {
    console.error('Error saving product data:', error);
    return res.status(500).json({ message: 'Error saving product details!' });
  }
};
