import React, { useState } from 'react';
import axios from 'axios';
import './Guest.css'; // Assuming the CSS is saved as Guest.css in the same directory

const Guest = () => {
  const [guestData, setGuestData] = useState({
    name: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    children: '',
    contact: '',
  });

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submit-guest', guestData);
      alert(response.data.message);
      setGuestData({
        name: '',
        roomNumber: '',
        checkIn: '',
        checkOut: '',
        children: '',
        contact: '',
      });
    } catch (error) {
      console.error('Error submitting guest details:', error);
      alert('Failed to submit guest details.');
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
        <label htmlFor="roomNumber">Room Number</label>
        <input
          type="number"
          name="roomNumber"
          id="roomNumber"
          placeholder="Room Number"
          value={guestData.roomNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="checkIn">Check-In</label>
        <input
          type="datetime-local"
          name="checkIn"
          id="checkIn"
          value={guestData.checkIn}
          onChange={handleChange}
          required
        />
        <label htmlFor="checkOut">Check-Out</label>
        <input
          type="datetime-local"
          name="checkOut"
          id="checkOut"
          value={guestData.checkOut}
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
          required
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
