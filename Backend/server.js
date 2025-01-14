const express = require('express');
const cors = require('cors');
const guestRoutes = require('./routes/guest');
const productRoutes = require('./routes/product');
const reportRoutes = require('./routes/report');

const app = express();
const port = 5001;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use('/api/guest', guestRoutes);
app.use('/api/product', productRoutes); // Add product routes here
app.use('/api/reports', reportRoutes); // Add report routes if applicable

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
