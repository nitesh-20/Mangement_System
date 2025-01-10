import React, { useState } from "react";
import axios from "axios";
import "../Menu/Guest.css";

const Guest = () => {
  const [guestData, setGuestData] = useState({
    name: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
    children: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate formData before sending
      if (!guestData.name || !guestData.roomNumber || !guestData.checkIn || !guestData.checkOut) {
        alert("Please fill all required fields.");
        return;
      }

      const response = await axios.post("http://localhost:5001/api/guest/submit-guest", guestData);
      alert(response.data.message); // Success message
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error saving guest details! Ensure the backend is running and accessible.");
    }
  };

  return (
    <div className="menu">
      <h2>Guest Details</h2>
      <form className="menu-form" onSubmit={handleSubmit}>
        <label>
          Guest Name:
          <input
            type="text"
            name="name"
            value={guestData.name}
            onChange={handleChange}
            placeholder="Enter guest name"
            required
          />
        </label>
        <label>
          Room Number:
          <input
            type="text"
            name="roomNumber"
            value={guestData.roomNumber}
            onChange={handleChange}
            placeholder="Enter room number"
            required
          />
        </label>
        <label>
          Check-In Date:
          <input
            type="date"
            name="checkIn"
            value={guestData.checkIn}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Check-Out Date:
          <input
            type="date"
            name="checkOut"
            value={guestData.checkOut}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Number of Guests:
          <input
            type="number"
            name="children"
            value={guestData.children}
            onChange={handleChange}
            placeholder="Enter number of children"
            min="0"
          />
        </label>
        <label>
          Contact:
          <input
            type="tel"
            name="contact"
            value={guestData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Guest;
