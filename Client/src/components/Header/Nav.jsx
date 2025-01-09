import React from "react";
import { useNavigate } from "react-router-dom";
import "../Header/Nav.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Sarhi Trail Manager.AI</h1>
      <div className="navbar-buttons">
        <button
          onClick={() => navigate("/guest-details")}
          className="navbar-button"
        >
          Guest Details
        </button>
        <button
          onClick={() => navigate("/product-details")}
          className="navbar-button"
        >
          Product Details
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
