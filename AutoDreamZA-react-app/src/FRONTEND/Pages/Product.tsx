import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <Nav />

      {/* Waffle Menu Toggle Button */}
      <button className="waffle-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Waffle Menu */}
      <nav className={`waffle-menu ${menuOpen ? 'open' : ''}`}>
        <div className="waffle-grid">
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/')}>Home</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/about')}>About</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/products')}>Products</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/contact')}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Discover our range of innovative offerings.</p>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="product-grid">
        <div className="product-item">
          <h2>Product 1</h2>
          <p>High-quality product designed to amaze.</p>
        </div>
        <div className="product-item">
          <h2>Product 2</h2>
          <p>Innovative features meet sleek design.</p>
        </div>
        <div className="product-item">
          <h2>Product 3</h2>
          <p>Engineered for performance and style.</p>
        </div>
      </div>
    </>
  );
};

export default Products;
