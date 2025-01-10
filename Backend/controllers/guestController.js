const fs = require('fs');
const path = require('path');
const exceljs = require('exceljs');

exports.submitGuest = async (req, res) => {
  const guestData = req.body;

  // Path to the Excel file
  const directoryPath = '/Users/niteshsahu/Desktop/Management_System/Backend/Data/xlxl';
  const filePath = path.join(directoryPath, 'guestData.xlsx');

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
      sheet = workbook.getWorksheet('GuestData');
      if (!sheet) {
        sheet = workbook.addWorksheet('GuestData'); // Create worksheet if not found
        sheet.columns = [
          { header: 'Name', key: 'name' },
          { header: 'Room Number', key: 'roomNumber' },
          { header: 'Check-In', key: 'checkIn' },
          { header: 'Check-Out', key: 'checkOut' },
          { header: 'Children', key: 'children' },
          { header: 'Contact', key: 'contact' },
        ];
      }
    } else {
      sheet = workbook.addWorksheet('GuestData'); // Create a new file and worksheet
      sheet.columns = [
        { header: 'Name', key: 'name' },
        { header: 'Room Number', key: 'roomNumber' },
        { header: 'Check-In', key: 'checkIn' },
        { header: 'Check-Out', key: 'checkOut' },
        { header: 'Children', key: 'children' },
        { header: 'Contact', key: 'contact' },
      ];
    }

    // Append new data to the worksheet
    console.log('Adding row:', guestData);
    sheet.addRow(guestData);

    // Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);
    console.log(`File updated successfully: ${filePath}`);

    return res.status(200).json({ message: 'Guest details saved successfully!' });
  } catch (error) {
    console.error('Error saving guest data:', error);
    return res.status(500).json({ message: 'Error saving guest details!' });
  }
};
