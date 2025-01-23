import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowProduct.css'; // Reusing the same CSS for styling

const ShowProductData = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-product-data');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="menu">
      <h2>Product Data Report</h2>
      {productData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={index}>
                <td>{product.vendor}</td>
                <td>{product.product}</td>
                <td>{product.date}</td>
                <td>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No product data available.</p>
      )}
    </div>
  );
};

export default ShowProductData;
