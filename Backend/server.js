const express = require('express');
const cors = require('cors');
const guestRoutes = require('./routes/guest');
const productRoutes = require('./routes/product');
const app = express();
const port = 5001;

app.use(express.json());
app.use(cors()); // If needed for cross-origin requests

// Use the routes
app.use('/api/guest', guestRoutes);
app.use('/api/product', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
