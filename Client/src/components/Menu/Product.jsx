import React, { useState } from 'react';
import axios from 'axios';
import './Product.css'; // Using the provided Product.css for styling

const Product = () => {
  const [productData, setProductData] = useState({
    vendor: '',
    product: '',
    date: '',
    amount: '',
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/products/add', productData);
      alert(response.data.message);
      setProductData({
        vendor: '',
        product: '',
        date: '',
        amount: '',
      });
    } catch (error) {
      console.error('Error submitting product details:', error);
      alert('Failed to submit product details.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Product Details</h2>
      <form className="form-container-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="vendor">Vendor Name</label>
          <input
            type="text"
            name="vendor"
            id="vendor"
            placeholder="Vendor Name"
            value={productData.vendor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product">Product Name</label>
          <input
            type="text"
            name="product"
            id="product"
            placeholder="Product Name"
            value={productData.product}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={productData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount"
            value={productData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Product;
