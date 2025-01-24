import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowGuestData.css";

const ShowGuestData = () => {
  const [guestData, setGuestData] = useState([]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        // Ensure the correct endpoint is used
        const response = await axios.get("http://localhost:5001/api/guests");
        setGuestData(response.data);
      } catch (error) {
        console.error("Error fetching guest data:", error);
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
                <td>{guest.room_number}</td>
                <td>{new Date(guest.check_in).toLocaleString()}</td>
                <td>{new Date(guest.check_out).toLocaleString()}</td>
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
