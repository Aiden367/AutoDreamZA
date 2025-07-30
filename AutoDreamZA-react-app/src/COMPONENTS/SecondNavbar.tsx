import React, { useState, useEffect } from 'react';
import styles from './SecondNav.module.css';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from "../FRONTEND/Images/user_icon_logo.png";
import logo from "../FRONTEND/Images/AutoDream_Logo.jpg";
import { useUser } from '../BACKEND/context/UserContext'; 
import { useCart } from '../BACKEND/context/CartContext';

import axios from 'axios';

const SecondNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(0);
  const { userId, logout } = useUser();
  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  useEffect(() => {
    const fetchCartCount = async () => {
      if (!userId) return;
      try {
       const res = await axios.get(`http://localhost:5000/user/cart/${userId}`);
        setCartCount(res.data.length || 0);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCartCount();
  }, [userId]); 
  const handleSearchClick = () => {
    console.log('Search for:', searchQuery);
  };
  const handleLogout = () => {
    logout();         
    navigate('/Login');
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
        <Link to="/Cart" className={styles.cartButton} title="View Cart">
          🛒
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
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
