import React, { useState } from 'react';
import styles from './SecondNav.module.css';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from "../FRONTEND/Images/user_icon_logo.png";
import logo from "../FRONTEND/Images/AutoDream_Logo.jpg";
import { useUser } from '../BACKEND/context/UserContext'; // Adjust path if needed

const SecondNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userId, logout } = useUser();
  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search for:', searchQuery);
  };
  const handleLogout = () => {
    logout();          // clear user session/context
    navigate('/Login'); // redirect to login page
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
        {userId ? (
          <>
            <Link to={`/Profile/${userId}`}>
              <img src={profileImage} alt="Profile" className={styles.profileImage} />
            </Link>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              title="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/Login">
            <img src={profileImage} alt="Profile" className={styles.profileImage} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default SecondNavbar;
