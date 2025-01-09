import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../Menu/Report.css"

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to show Product-wise Report
  const ProductWiseReport = () => (
    <div>
      <h2>Product-wise Report</h2>
      {/* Add logic here to display the product-wise report */}
      <p>List of products with their details...</p>
    </div>
  );

  // Function to show Overall Report
  const OverallReport = () => (
    <div>
      <h2>Overall Report</h2>
      {/* Add logic here to display the overall report */}
      <p>Total expense breakdown and summary...</p>
    </div>
  );

  return (
    <div className="report-container">
      <h1>Reports</h1>
      <div className="report-navigation">
        <button onClick={() => navigate("/report/product-wise")}>Product-wise Report</button>
        <button onClick={() => navigate("/report/overall")}>Overall Report</button>
      </div>

      {/* Render content based on the current route */}
      {location.pathname === "/report/product-wise" && <ProductWiseReport />}
      {location.pathname === "/report/overall" && <OverallReport />}
    </div>
  );
};

export default Report;
