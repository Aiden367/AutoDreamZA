import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import SecondNav from "../../COMPONENTS/SecondNavbar"
import "./Styles/Home.css";
import AccessoriesImage from "../Images/Accesories_image.jpg";
import HeadingImage from "../Images/yearone-GOkHtbgloRs-unsplash.jpg";
import AudioImage from "../Images/Audiio_car.jpeg";
import BatteryImage from "../Images/Batteries_car.jpg";
import ElectricalImage from "../Images/Electrical_image.jpg";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';




const Home: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState<any>(null);
  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get('http://localhost:5000/product/products', {
          params: {
            limit: 15 // or however many "popular" products you want to show
          }
        });
        setPopularProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch popular products", error);
      }
    };

    fetchPopular();
  }, []);

  // Add product to cart function
  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        // Increase quantity if already in cart
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new product with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Show popup
    setPopupProduct(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <>
  <SecondNav />
  <Nav />

  {showPopup && popupProduct && (
    <div className="cart-popup">
      <img src={popupProduct.image} alt={popupProduct.title} />
      <div className="cart-popup-text">
        <strong>{popupProduct.title}</strong> added to cart
      </div>
    </div>
  )}

  <div className="just-launched-heading" style={{ backgroundImage: `url(${HeadingImage})` }}>
    <h1>We Just Launched !</h1>
    <p>Welcome to the next generation of shopping for motor vehicle parts!</p>
  </div>

  {/* 🔄 Moved Categories ABOVE Popular Products */}
  <div className="hero">
    <div className="hero-content">
      
      <div className="categories-container">
        <div className="category" onClick={() => handleNavigation('/Accessory')}>
          <img src={AccessoriesImage} alt="Accessories" />
          <p>Accessories</p>
        </div>
        <div className="category" onClick={() => handleNavigation('/Audio')}>
          <img src={AudioImage} alt="Audio" />
          <p>Audio</p>
        </div>
        <div className="category" onClick={() => handleNavigation('/Batteries')}>
          <img src={BatteryImage} alt="Batteries" />
          <p>Batteries and Battery Products</p>
        </div>
        <div className="category" onClick={() => handleNavigation('/Electrical')}>
          <img src={ElectricalImage} alt="Electrical" />
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

  {/* ↓↓↓ Popular Products comes below Categories now ↓↓↓ */}
  <section className="popular-products-section">
    
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={1}
      slidesPerView={Math.min(6, popularProducts.length)}
      navigation={popularProducts.length > 6}
      pagination={popularProducts.length > 6 ? { clickable: true } : false}
      loop={false}
      watchOverflow={true}
      breakpoints={{
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
    >
      {popularProducts.map(product => (
        <SwiperSlide key={product._id}>
          <div className="popular-product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>R{product.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>

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