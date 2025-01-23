import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowGuestData.css'; // Reusing the same CSS for styling

const ShowGuestData = () => {
  const [guestData, setGuestData] = useState([]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-guest-data');
        setGuestData(response.data);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchGuestData();
  }, []);

  return (
    <div className="menu">
      <h2>Guest Data Report</h2>
      {guestData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room Number</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Children</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {guestData.map((guest, index) => (
              <tr key={index}>
                <td>{guest.name}</td>
                <td>{guest.roomNumber}</td>
                <td>{guest.checkIn}</td>
                <td>{guest.checkOut}</td>
                <td>{guest.children}</td>
                <td>{guest.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No guest data available.</p>
      )}
    </div>
  );
};

export default ShowGuestData;
