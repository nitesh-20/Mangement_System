const express = require('express');
const reportController = require('../controllers/reportController'); // Ensure this path is correct
const router = express.Router();

router.get('/product', reportController.getProductReport); // Make sure this is pointing to the right controller
router.get('/monthly', reportController.getMonthlyReport);

module.exports = router;
