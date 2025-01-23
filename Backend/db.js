// db.js
const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost", // Hostname of your database server
  user: "root", // Your MySQL username
  password: "Nitesh@2005", // Your MySQL root password
  database: "hotel_manager", // Make sure the database exists
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message); // Log error
    process.exit(1); // Exit if there's an error
  } else {
    console.log("Database connected successfully!");
  }
});

module.exports = db;
