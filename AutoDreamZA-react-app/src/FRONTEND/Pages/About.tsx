import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";

const About: React.FC = () => {
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
          <h1>About Us</h1>
          <p>Learn more about our journey and values.</p>
        </div>
      </div>

      {/* About Content Section */}
      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            We began our adventure with a passion for innovation and exploration.
            Our journey is fueled by a commitment to deliver extraordinary experiences.
          </p>
        </section>
        <section>
          <h2>Our Mission</h2>
          <p>
            To inspire and empower people through our products and services,
            creating moments of excitement and discovery.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
