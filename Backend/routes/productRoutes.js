const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../models/productModel");

// Predefined product categories
const predefinedCategories = [
  "kirana",
  "milk",
  "vegetables",
  "bakery",
  "egg",
  "chicken",
  "gas",
  "petrol",
  "electric-bill",
  "water",
  "medicine",
];

// Route to get all product data grouped by category
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts(); // Fetch all products from the database

    // Group products by category
    const groupedProducts = products.reduce((groups, product) => {
      if (!groups[product.product]) {
        groups[product.product] = [];
      }
      groups[product.product].push(product);
      return groups;
    }, {});

    // Add empty arrays for predefined categories that are missing in the data
    const completeGroupedProducts = predefinedCategories.map((category) => {
      return {
        category,
        data: groupedProducts[category] || [], // Use empty array if no data
      };
    });

    res.json(completeGroupedProducts); // Send grouped data as an array
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Route to add a new product
router.post("/add", async (req, res) => {
  try {
    await addProduct(req.body); // Add new product to the database
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

module.exports = router;
