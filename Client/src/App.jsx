import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Nav";
import Guest from "./components/Menu/Guest";
import Product from "./components/Menu/Product";
import Report from "./components/Menu/Report"; // Import the Report component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/guest-details" element={<Guest />} />
        <Route path="/product-details" element={<Product />} />
        <Route path="/report/*" element={<Report />} /> 
      </Routes>
    </Router>
  );
};

export default App;
