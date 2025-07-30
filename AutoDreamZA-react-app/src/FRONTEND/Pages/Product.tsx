import { useNavigate } from "react-router-dom";
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PriceFilter from "../../COMPONENTS/PriceFilter";
import { useFilter } from "../../COMPONENTS/FilterContext"; 
interface Product {
  _id: string;
  title: string;
  image: string;
  price: string;
  url: string;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { minPrice, maxPrice } = useFilter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Could not fetch products", error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice]);

  return (
    <>
      <Nav />
      <button className="login-button" onClick={() => navigate("/login")}>
        Login
      </button>

      {/* Hamburger Toggle Button */}
      <button className={`waffle-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`waffle-menu ${menuOpen ? "open" : ""}`}>
        <div className="waffle-grid">
          <a href="#" className="waffle-item" onClick={() => handleNavigation("/")}>
            Home
          </a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation("/about")}>
            About
          </a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation("/products")}>
            Products
          </a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation("/contact")}>
            Contact
          </a>
          <a href="#" className="waffle-item" onClick={() => handleNavigation("/upload")}>
            Upload
          </a>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>Discover our range of innovative offerings.</p>
        </div>
      </div>
      {/* Price Filter Component */}
      <PriceFilter />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.image} alt={product.title} className="product-image" />
              <h2>{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">
                View Details
              </a>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
};

export default Products;
