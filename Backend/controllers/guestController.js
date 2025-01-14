const { google } = require('googleapis');
const path = require('path');

// Load service account credentials
const credentialsPath = path.join(__dirname, '../credentials/google-credentials.json');
const credentials = require(credentialsPath);

// Configure Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Replace with your Google Sheets ID
const SPREADSHEET_ID = '1lDXCVKOrRgZJ8tCxuwk1wTmJUYMlclaGOJNO_SSxGwM';

exports.submitGuest = async (req, res) => {
  const guestData = req.body;

  try {
    // Append new row to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:F', // Update to match the actual sheet name (default is usually "Sheet1")
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            guestData.name,
            guestData.roomNumber,
            guestData.checkIn,
            guestData.checkOut,
            guestData.children,
            guestData.contact,
          ],
        ],
      },
    });

    console.log('Row added:', response.data);
    res.status(200).json({ message: 'Guest details saved successfully!' });
  } catch (error) {
    console.error('Error saving guest data:', error);
    res.status(500).json({ message: 'Error saving guest details!' });
  }
};
