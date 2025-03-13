import React, { useState } from 'react';
import styles from './SecondNav.module.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// Import the logo image
import profileImage from "../FRONTEND/Images/user_icon_logo.png";
import logo from "../FRONTEND/Images/AutoDream_Logo.jpg";

const SecondNavbar: React.FC = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    console.log('Search for:', searchQuery);
    // Add the logic for search functionality here
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

      {/* Right: Profile Image */}
      <div className={styles.profileContainer}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
      </div>
    </nav>
  );
};

export default SecondNavbar;
