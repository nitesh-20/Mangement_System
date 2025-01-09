const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.post('/submit-guest', guestController.submitGuest);

module.exports = router;
