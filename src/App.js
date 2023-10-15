import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImageCrypt from "./pages/ImageCrypt";
import ImageDecrypt from "./pages/ImageDecrypt";
import About from "./pages/About";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const closeMobileMenu = () => {
    document.getElementById("burger").checked =
      !document.getElementById("burger").checked;
  };

  return (
    <Router>
      <nav className="navbar">
        <a href="/" className="BrandName">
          Stegano
        </a>
        <input id="burger" type="checkbox" />

        <label for="burger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="nav">
          <ul>
            <li>
              <Link to="/" className="MenuItem" onClick={closeMobileMenu}>
                Encode
              </Link>
            </li>
            <li>
              <Link to="/decode" className="MenuItem" onClick={closeMobileMenu}>
                Decode
              </Link>
            </li>
            <li>
              <Link to="/about" className="MenuItem" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
          </ul>
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
