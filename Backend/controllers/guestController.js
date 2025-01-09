const fs = require('fs');
const path = require('path');
const exceljs = require('exceljs');

// Controller for submitting guest data
exports.submitGuest = async (req, res) => {
  const guestData = req.body;

  // Use your specified path
  const directoryPath = '/Users/niteshsahu/Desktop/Management_System/Backend/Data/xlxl';
  const filePath = path.join(directoryPath, 'guestData.xlsx');

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
      sheet = workbook.getWorksheet('GuestData');
    } else {
      sheet = workbook.addWorksheet('GuestData');
      sheet.columns = [
        { header: 'Name', key: 'name' },
        { header: 'Room Number', key: 'roomNumber' },
        { header: 'Check-In', key: 'checkIn' },
        { header: 'Check-Out', key: 'checkOut' },
        { header: 'Children', key: 'children' },
        { header: 'Contact', key: 'contact' },
      ];
    }

    // Add the new guest data
    sheet.addRow({
      name: guestData.name,
      roomNumber: guestData.roomNumber,
      checkIn: guestData.checkIn,
      checkOut: guestData.checkOut,
      children: guestData.children,
      contact: guestData.contact,
    });

    // Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).json({ message: 'Guest details saved successfully!' });
  } catch (error) {
    console.error('Error saving guest data:', error);
    return res.status(500).json({ message: 'Error saving guest details!' });
  }
};
