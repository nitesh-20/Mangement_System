// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../models/productModel");

// Route to get all product data (Updated path)
router.get("/get-product-data", async (req, res) => {
  try {
    const products = await getAllProducts(); // Fetching all products from DB
    res.json(products); // Sending data as response
  } catch (error) {
    console.error("Error fetching products:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching products", error: error.message }); // Error handling
  }
});

// Route to add a new product
router.post("/add", async (req, res) => {
  try {
    await addProduct(req.body); // Adding new product to DB
    res.status(200).json({ message: "Product added successfully" }); // Successful response
  } catch (error) {
    console.error("Error adding product:", error); // Log error for debugging
    res.status(500).json({ message: "Error adding product", error: error.message }); // Error handling
  }
});

module.exports = router;
