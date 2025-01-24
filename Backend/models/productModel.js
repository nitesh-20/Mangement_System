const db = require("../db"); // Import the centralized database connection

// Function to fetch all products
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Function to add a new product
const addProduct = (productData) => {
  const { vendor, product, date, amount } = productData;
  const query = `
    INSERT INTO products (vendor, product, date, amount)
    VALUES (?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [vendor, product, date, amount], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = { getAllProducts, addProduct };
