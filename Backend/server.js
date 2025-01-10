const express = require('express');
const cors = require('cors');
const guestRoutes = require('./routes/guest');
const productRoutes = require('./routes/product');
const reportRoutes = require('./routes/report');

const app = express();
const port = 5001;

app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS for cross-origin requests

// API Routes
app.use('/api/guest', guestRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reports', reportRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
