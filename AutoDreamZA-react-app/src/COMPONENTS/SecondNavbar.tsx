import React, { useState } from 'react';
import styles from './SecondNav.module.css';
import { Link } from 'react-router-dom';
import profileImage from "../FRONTEND/Images/user_icon_logo.png";
import logo from "../FRONTEND/Images/AutoDream_Logo.jpg";

const SecondNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search for:', searchQuery);
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo (Clickable) */}
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Center: Search Input and Button */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick} className={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Right: Profile Image and Cart Button */}
      <div className={styles.profileContainer} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Cart Button */}
        <Link to="/Cart" className={styles.cartButton} style={{ textDecoration: 'none', color: 'inherit' }}>
          🛒 {/* You can replace with an SVG or image icon */}
        </Link>

        {/* Profile Image */}
        <Link to="/Login">
          <img src={profileImage} alt="Profile" className={styles.profileImage} />
        </Link>
      </div>
    </nav>
  );
};

export default SecondNavbar;
