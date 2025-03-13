import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import SecondNav from "../../COMPONENTS/SecondNavbar"
import "./Styles/Home.css";
import AccessoriesImage from "../Images/Accesories_image.jpg";
import HeadingImage from "../Images/yearone-GOkHtbgloRs-unsplash.jpg";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>

      <SecondNav />
      <Nav />
      <div className="just-launched-heading"
        style={{ backgroundImage: `url(${HeadingImage})` }}>
        <h1>We Just Launched !</h1>
        <p>Welcome to the next generation of shopping for motor vehicle parts!</p>
      </div>

      {/* Hero Section */}
      <div className="hero">

        <div className="hero-content">
          <p className="category-heading">Categories</p>
          <div className="categories-container">
            <div className="category" onClick={() => handleNavigation('/Accessory')}>

              <img src={AccessoriesImage} alt="Accessories" />
              <p>Accessories</p>
            </div>
            <div className="category" onClick={() => handleNavigation('/Audio')}>

              <img src={AccessoriesImage} alt="Aduio" />
              <p>Audio</p>
            </div>
            <div className="category" onClick={() => handleNavigation('/Batteries')}>
              <img src={AccessoriesImage} alt="Batteries" />
              <p>Batteries and Battery Products</p>
            </div>
            <div className="category" onClick={() => handleNavigation('/Electrical')}>
              <img src={AccessoriesImage} alt="Electrical" />
              <p>Electrical</p>
            </div>
            <div className="category" onClick={() => handleNavigation('/Engine')}>

              <img src={AccessoriesImage} alt="Engine" />
              <p>Engine</p>
            </div>
            <div className="category" onClick={() => handleNavigation('/Services')}>

              <img src={AccessoriesImage} alt="Services" />
              <p>Services</p>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <h2>Contact Us</h2>
          <p>0767751685</p>
        </div>
        <div className="feature">
          <h2>Customer Service</h2>
          <p>Contact us</p>
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