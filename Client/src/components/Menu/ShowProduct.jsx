import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowProduct.css";

const ShowProductData = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProductData(response.data); // Updated to match new backend structure
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="menu">
      <h2>Product Data Report</h2>
      {productData.map((categoryData, index) => (
        <div key={index}>
          <h3>{categoryData.category}</h3>
          {categoryData.data.length > 0 ? (
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
                {categoryData.data.map((product, i) => (
                  <tr key={i}>
                    <td>{product.vendor}</td>
                    <td>{product.product}</td>
                    <td>{product.date}</td>
                    <td>{product.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available for this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowProductData;
