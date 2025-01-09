import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Nav";
import Guest from "./components/Menu/Guest";
import Product from "./components/Menu/Hero";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Guest />} /> {/* Default route for Guest form */}
        <Route path="/guest-details" element={<Guest />} />
        <Route path="/product-details" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
