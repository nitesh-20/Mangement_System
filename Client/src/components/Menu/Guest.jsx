import React, { useState } from "react";
import axios from "axios";
import "./Guest.css"; // Assuming the CSS is saved as Guest.css in the same directory

const Guest = () => {
  const [guestData, setGuestData] = useState({
    name: "",
    room_number: "",
    check_in: "",
    check_out: "",
    children: "",
    contact: "",
  });

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (
      !guestData.name ||
      !guestData.room_number ||
      !guestData.check_in ||
      !guestData.check_out ||
      !guestData.contact
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/guests/add",
        guestData
      );
      alert(response.data.message);
      setGuestData({
        name: "",
        room_number: "",
        check_in: "",
        check_out: "",
        children: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error submitting guest details:", error);
      alert("Failed to submit guest details. Please try again.");
    }
  };

  return (
    <div className="guest-form-container">
      <h2>Submit Guest Details</h2>
      <form className="guest-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={guestData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="room_number">Room Number</label>
        <input
          type="number"
          name="room_number"
          id="room_number"
          placeholder="Room Number"
          value={guestData.room_number}
          onChange={handleChange}
          required
        />
        <label htmlFor="check_in">Check-In</label>
        <input
          type="date"
          name="check_in"
          id="check_in"
          value={guestData.check_in}
          onChange={handleChange}
          required
        />
        <label htmlFor="check_out">Check-Out</label>
        <input
          type="date"
          name="check_out"
          id="check_out"
          value={guestData.check_out}
          onChange={handleChange}
          required
        />
        <label htmlFor="children">Number of Children</label>
        <input
          type="number"
          name="children"
          id="children"
          placeholder="Number of Children"
          value={guestData.children}
          onChange={handleChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="tel"
          name="contact"
          id="contact"
          placeholder="Contact Number"
          value={guestData.contact}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Guest;
