import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";

const Contact: React.FC = () => {
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
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out with any inquiries.</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form">
        <form>
          <div>
            <label htmlFor="name">Name</label><br/>
            <input type="text" id="name" name="name" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email">Email</label><br/>
            <input type="email" id="email" name="email" placeholder="Your email" />
          </div>
          <div>
            <label htmlFor="message">Message</label><br/>
            <textarea id="message" name="message" placeholder="Your message" rows={4}></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default Contact;

