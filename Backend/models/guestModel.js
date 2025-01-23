// models/guestModel.js
const db = require("../db"); // Import the centralized database connection

// Function to fetch all guests
const getAllGuests = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM guests", (err, results) => {
      if (err) {
        console.error("Error fetching guests from database:", err); // Log error for debugging
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to add a new guest
const addGuest = (guestData) => {
  const { name, roomNumber, checkIn, checkOut, children, contact } = guestData; // Ensure consistent field names
  const query = `
    INSERT INTO guests (name, room_number, check_in, check_out, children, contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [name, roomNumber, checkIn, checkOut, children, contact], (err, results) => {
      if (err) {
        console.error("Error inserting guest into database:", err); // Log error for debugging
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllGuests, addGuest };
