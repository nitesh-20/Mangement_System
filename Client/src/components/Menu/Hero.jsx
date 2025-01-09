import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Menu/Hero.css";  // Import the updated CSS

const Hero = () => {
  const [formData, setFormData] = useState({
    vendor: "",
    product: "",
    date: null,
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Log the form data before sending it
      console.log("Submitting data:", formData);

      const response = await axios.post("http://localhost:5001/submit-form", {
        ...formData,
        date: formData.date ? formData.date.toISOString().split("T")[0] : null,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving data!");
    }
  };

  return (
    <div className="menu">
      <form className="menu-form" onSubmit={handleSubmit}>
        <h2>Product List</h2> {/* Moved Product List heading here */}
        <label htmlFor="vendor">Vendor Name:</label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          placeholder="Enter Vendor Name"
          value={formData.vendor}
          onChange={handleChange}
          className="vendor-name"  // New class for styling
          required
        />

        <label htmlFor="product">Select Product:</label>
        <select
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="product-list"  // New class for styling
          required
        >
          <option value="">Select Product</option>
          <option value="kirana">Kirana Shop</option>
          <option value="milk">Milk</option>
          <option value="vegetables">Vegetables</option>
          <option value="bakery">Bakery</option>
          <option value="egg">Egg</option>
          <option value="chicken">Chicken</option>
          <option value="gas">Gas</option>
          <option value="petrol">Petrol</option>
          <option value="electric-bill">Electric Bill</option>
          <option value="water">Water</option>
          <option value="medicine">Medicine</option>
        </select>

        <label htmlFor="date">Date:</label>
        <div className="date-picker-wrapper">
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select a date"
            required
          />
        </div>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Enter Amount"
          value={formData.amount}
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

export default Hero;
