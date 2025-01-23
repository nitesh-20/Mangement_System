// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../models/productModel");

// Route to get all product data
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts(); // Function to fetch data from DB
    res.json(products); // Sending data as response
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" }); // Error handling
  }
});

// Route to add a new product
router.post("/add", async (req, res) => {
  try {
    await addProduct(req.body); // Function to add data to DB
    res.status(200).json({ message: "Product added successfully" }); // Successful response
  } catch (error) {
    res.status(500).json({ message: "Error adding product" }); // Error handling
  }
});

module.exports = router;
