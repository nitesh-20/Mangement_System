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

exports.submitProduct = async (req, res) => {
  const productData = req.body;

  try {
    // Append new row to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'ProductData!A1:D', // Ensure this matches the actual sheet name
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            productData.vendor,
            productData.product,
            productData.date,
            productData.amount,
          ],
        ],
      },
    });

    console.log('Row added to ProductData:', response.data);
    res.status(200).json({ message: 'Product details saved successfully!' });
  } catch (error) {
    console.error('Error saving product data:', error);
    res.status(500).json({ message: 'Error saving product details!' });
  }
};
