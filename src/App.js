import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import React from "react";
import ImageCrypt from "./pages/ImageCrypt";
import ImageDecrypt from "./pages/ImageDecrypt";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <a href="/" className="BrandName">
          Stegano
        </a>
        <ul className="nav">
          <li>
            <Link to="/">Encode</Link>
          </li>
          <li>
            <Link to="/decode">Decode</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
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
