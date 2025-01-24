const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Apply CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Import routes
const guestRoutes = require("./routes/guestRoutes");
const productRoutes = require("./routes/productRoutes");

// Use the routes
app.use("/api/guests", guestRoutes);
app.use("/api/products", productRoutes); // Add this route for products

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
