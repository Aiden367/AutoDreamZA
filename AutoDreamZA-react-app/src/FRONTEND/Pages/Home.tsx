import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";
import AccessoriesImage from "../Images/Accesories_image.jpg";
const Home: React.FC = () => {
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

      {/* Login Button at Top Right */}
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

      {/* Waffle Menu */}
      <nav className={`waffle-menu ${menuOpen ? 'open' : ''}`}>
        <div className="waffle-grid">
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/')}>Home</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/about')}>About</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/products')}>Products</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/contact')}>Contact</a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/upload')}>Upload</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Adventure</h1>
          <p>Experience the thrill of discovery</p>
          <button onClick={() => navigate('/explore')}>Explore Now</button>
          <p className="category-heading">Popular Categories</p>
          <div className="categories-container">
            <div className="category" onClick={() => handleNavigation('/Accessory')}>
              <p>Accessories</p>
              <img src={AccessoriesImage} alt="Accessories" />
            </div>
            <div className="category" onClick={() => handleNavigation('/Audio')}>
              <p>Audio</p>
              <img src={AccessoriesImage} alt="Accessories" />
            </div>
            <div className="category" onClick={() => handleNavigation('/Batteries')}>
              <p>Batteries and Battery Products</p>
              <img src={AccessoriesImage} alt="Accessories" />
            </div>
            <div className="category" onClick={() => handleNavigation('/Electrical')}>
              <p>Electrical</p>
              <img src={AccessoriesImage} alt="Accessories" />
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <h2>Innovation</h2>
          <p>Cutting-edge design that inspires.</p>
        </div>
        <div className="feature">
          <h2>Experience</h2>
          <p>Every detail is designed for excitement.</p>
        </div>
        <div className="feature">
          <h2>Adventure</h2>
          <p>Join us on a journey like no other.</p>
        </div>
      </div>
    </>
  );
};

export default Home;