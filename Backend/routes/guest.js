const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Route for submitting guest data
router.post('/submit-guest', guestController.submitGuest);

module.exports = router;
