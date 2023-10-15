import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImageCrypt from "./pages/ImageCrypt";
import ImageDecrypt from "./pages/ImageDecrypt";
import About from "./pages/About";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Router>
      <nav className="navbar">
        <a href="/" className="BrandName">
          Stegano
        </a>
        <div className="MobileMenuToggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <i className="fa fa-times" />
          ) : (
            <i className="fa fa-bars" />
          )}
        </div>
        <div className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/" className="MenuItem" onClick={closeMobileMenu}>
            Encode
          </Link>
          <Link to="/decode" className="MenuItem" onClick={closeMobileMenu}>
            Decode
          </Link>
          <Link to="/about" className="MenuItem" onClick={closeMobileMenu}>
            About
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ImageCrypt />} />
        <Route path="/decode" element={<ImageDecrypt />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
