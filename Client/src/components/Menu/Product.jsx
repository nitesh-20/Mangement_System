import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Menu/Product.css";  // Import the updated CSS

const Product = () => {
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
      console.log("Submitting data:", formData);

      // Send data to backend
      const response = await axios.post("http://localhost:5001/api/product/submit-product", {
        ...formData,
        date: formData.date ? formData.date.toISOString().split("T")[0] : null,
      });

      alert(response.data.message);  // Success message
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving product data!");  // Error message
    }
  };

  return (
    <div className="menu">
      <form className="menu-form" onSubmit={handleSubmit}>
        <h2>Product List</h2> {/* Product List heading */}
        <label htmlFor="vendor">Vendor Name:</label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          placeholder="Enter Vendor Name"
          value={formData.vendor}
          onChange={handleChange}
          className="vendor-name"
          required
        />

        <label htmlFor="product">Select Product:</label>
        <select
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="product-list"
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

export default Product;
