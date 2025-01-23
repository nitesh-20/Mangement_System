import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Nav";
import Guest from "./components/Menu/Guest";
import Product from "./components/Menu/Product";
import ShowGuestData from "./components/Menu/ShowGuestData";  
import ShowProductData from "./components/Menu/ShowProduct";  

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/guest-details" element={<Guest />} />
        <Route path="/product-details" element={<Product />} />
        <Route path="/show-guest-data" element={<ShowGuestData />} />  
        <Route path="/show-product" element={<ShowProductData />} /> 
      </Routes>
    </Router>
  );
};

export default App;
