import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../COMPONENTS/Navbar";
import "./Styles/Home.css";

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Form state
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process your form submission here (e.g., API call)
    console.log("Uploading product:", {
      productName,
      description,
      price,
      imageFile,
    });
    // Optionally, reset the form fields after submission.
  };

  return (
    <>
      <Nav />

      {/* Waffle Menu Toggle Button (Top Left) */}
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
          <a href="#" className="waffle-item" onClick={() => handleNavigation('/upload')}>Upload</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Upload</h1>
          <p>Fill out the form below to upload a new product</p>
        </div>
      </div>

      {/* Upload Form Section */}
      <div className="upload-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">Product Name:</label><br />
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label><br />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Price:</label><br />
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required
            />
          </div>
          <div>
            <label htmlFor="imageFile">Product Image:</label><br />
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Upload;
