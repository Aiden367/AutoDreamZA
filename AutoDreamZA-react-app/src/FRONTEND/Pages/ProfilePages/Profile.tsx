import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";


const myOrdersImg = "https://img.icons8.com/ios-filled/64/000000/purchase-order.png";
const loginSecurityImg = "https://img.icons8.com/ios-filled/64/000000/lock--v1.png";
const purchasesImg = "https://img.icons8.com/ios-filled/64/000000/shopping-cart.png";

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleMyOrdersClick = () => {
    navigate(`/orders/${userId}`);  
  };

  const handleLoginSecurityClick = () => {
     navigate(`/AccountSettings?userId=${userId}`); 
  };

  const handlePurchasesClick = () => {
    navigate(`/Purchases`);  
  };

  const blockStyle: React.CSSProperties = {
    flex: '1 1 280px',
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#222',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.4,
  };

  const imgStyle: React.CSSProperties = {
    width: '64px',
    height: '64px',
  };

  return (
    <>
      <SecondNav />
      <Nav />
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#1565c0', marginBottom: '24px' }}>User Profile</h1>
        {/* Buttons container */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* My Orders */}
          <div
            onClick={handleMyOrdersClick}
            style={blockStyle}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
          >
            <img src={myOrdersImg} alt="My Orders" style={imgStyle} />
            <div style={titleStyle}>My Orders</div>
            <div style={subtitleStyle}>Track, return, or buy things again.</div>
          </div>
          {/* Login Security */}
          <div
            onClick={handleLoginSecurityClick}
            style={blockStyle}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
          >
            <img src={loginSecurityImg} alt="Login Security" style={imgStyle} />
            <div style={titleStyle}>Login Security</div>
            <div style={subtitleStyle}>Edit login, name, and mobile number.</div>
          </div>
          {/* Purchases */}
          <div
            onClick={handlePurchasesClick}
            style={blockStyle}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
          >
            <img src={purchasesImg} alt="Purchases" style={imgStyle} />
            <div style={titleStyle}>Purchases</div>
            <div style={subtitleStyle}>View purchases and manage your items.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
