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

  // Sample product data – update as needed
  const products = [
    {
      id: 1,
      name: "Mountain Bike",
      image: "/images/mountain-bike.jpg",
      price: "R5000",
      description: "A high-performance mountain bike for rugged trails.",
    },
    {
      id: 2,
      name: "Road Bike",
      image: "/images/road-bike.jpg",
      price: "R7000",
      description: "Lightweight and fast, perfect for road cycling.",
    },
    {
      id: 3,
      name: "Hybrid Bike",
      image: "/images/hybrid-bike.jpg",
      price: "R6000",
      description: "Versatile bike ideal for city commuting and leisure rides.",
    },
  ];

  return (
    <>
      <Nav />

      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>

      {/* Hamburger Toggle Button */}
      <button 
        className={`waffle-toggle ${menuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`waffle-menu ${menuOpen ? 'open' : ''}`}>
        <div className="waffle-grid">
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/')}>Home</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/about')}>About</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/products')}>Products</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/contact')}>Contact</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/upload')}>Upload</a>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Discover our range of innovative offerings.</p>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <button
              className="product-button"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
