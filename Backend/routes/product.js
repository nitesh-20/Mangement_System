const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/submit-product', productController.submitProduct);

module.exports = router;
