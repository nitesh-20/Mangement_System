const express = require("express");
const router = express.Router();
const { getAllGuests, addGuest } = require("../models/guestModel");

// Route to get all guest data
router.get("/get-guest-data", async (req, res) => {
  try {
    const guests = await getAllGuests(); // Fetching all guests from DB
    res.json(guests); // Sending data as response
  } catch (error) {
    console.error("Error fetching guests:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching guests", error: error.message }); // Error handling
  }
});

// Route to add a new guest
router.post("/add", async (req, res) => {
  try {
    await addGuest(req.body); // Adding new guest to DB
    res.status(200).json({ message: "Guest added successfully" }); // Successful response
  } catch (error) {
    console.error("Error adding guest:", error); // Log error for debugging
    res.status(500).json({ message: "Error adding guest", error: error.message }); // Error handling
  }
});

module.exports = router;
