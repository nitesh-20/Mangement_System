const fs = require('fs');
const path = require('path');
const exceljs = require('exceljs');

// Controller for submitting product data
exports.submitProduct = async (req, res) => {
  const productData = req.body;

  // Use your specified path
  const directoryPath = '/Users/niteshsahu/Desktop/Management_System/Backend/Data/ProductData';
  const filePath = path.join(directoryPath, 'productData.xlsx');

  try {
    // Ensure directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const workbook = new exceljs.Workbook();
    let sheet;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      sheet = workbook.getWorksheet('ProductData');
    } else {
      sheet = workbook.addWorksheet('ProductData');
      sheet.columns = [
        { header: 'Vendor', key: 'vendor' },
        { header: 'Product', key: 'product' },
        { header: 'Date', key: 'date' },
        { header: 'Amount', key: 'amount' },
      ];
    }

    // Add the new product data
    sheet.addRow({
      vendor: productData.vendor,
      product: productData.product,
      date: productData.date,
      amount: productData.amount,
    });

    // Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).json({ message: 'Product details saved successfully!' });
  } catch (error) {
    console.error('Error saving product data:', error);
    return res.status(500).json({ message: 'Error saving product details!' });
  }
};
