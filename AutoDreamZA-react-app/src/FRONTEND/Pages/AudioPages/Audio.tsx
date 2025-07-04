import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../../Styles/CarMats.css';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar"

type Product = {
  _id: string;
  title: string;
  image: string;
  type: string;
  available: boolean;
  manufacturer: string;
  price: number;
};


const Audio: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [availability, setAvailability] = useState('All');
  const [manufacturer, setManufacturer] = useState('All');
  const [priceSort, setPriceSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [matType, setMatType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productCategory, setProductCategory] = useState<'mat' | 'roofrack'>('mat');


  useEffect(() => {
  const scrapeAndFetch = async () => {
    try {
      // Trigger conditional scrape
      await axios.get('http://localhost:5000/product/scrape-if-needed');

      // Correct request with query parameters
      const res = await axios.get('http://localhost:5000/product/products', {
        params: {
          type: productCategory,  // either 'mat' or 'roofrack'
          page: currentPage,
          limit: 20,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error scraping or fetching products", error);
    }
  };

  scrapeAndFetch();
}, [currentPage, productCategory]);


  const filteredProducts = products.filter(product => {
    const matchesAvailability =
      availability === 'All' ||
      (availability === 'InStock' && product.available) ||
      (availability === 'OutOfStock' && !product.available);

    const matchesManufacturer =
      manufacturer === 'All' || product.manufacturer === manufacturer;

    const matchesType =
      matType === 'All'
        ? ['boot mat', 'floor mat', 'bin mat', 'carpet mat', 'rubber mat'].includes(
          product.type.trim().toLowerCase()
        )
        : product.type.trim().toLowerCase() === matType.trim().toLowerCase();




    const matchesPrice =
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice));

    const matchesSearch =
      (product.title ?? '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAvailability && matchesManufacturer && matchesType && matchesPrice && matchesSearch;
  });


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price;
    if (priceSort === 'desc') return b.price - a.price;
    return 0;
  });

  return (
    <>
      <SecondNav />
      <Nav />
      <div className="car-mats-page">
        {/* Filter Sidebar */}
        <div className="filter-section">
          <h2>Filters</h2>

          <div className="filter-group">
            <label>Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="All">All</option>
              <option value="InStock">In Stock</option>
              <option value="OutOfStock">Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Manufacturer</label>
            <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
              <option value="All">All</option>
              <option value="Renault">Renault</option>
              <option value="Ford">Ford</option>
              <option value="BMW">BMW</option>
              <option value="Toyota">Toyota</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Mat Type</label>
            <select value={matType} onChange={(e) => setMatType(e.target.value)}>
              <option value="All">All</option>
              <option value="Boot Mat">Boot Mat</option>
              <option value="Floor Mat">Floor Mat</option>
              <option value="Bin Mat">Bin Mat</option>
              <option value="Carpet Mat">Carpet Mat</option>
              <option value="Rubber Mat">Rubber Mat</option>
            </select>
          </div>


          <div className="filter-group">
            <label>Sort by Price</label>
            <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
              <option value="">None</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>

          {/* Optional: Min/Max price input */}
          <div className="filter-group">
            <label>Min Price</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <label>Max Price</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={productCategory} onChange={e => setProductCategory(e.target.value as 'mat' | 'roofrack')}>
            <option value="mat">Car Mats</option>
            <option value="roofrack">Roof Racks</option>
          </select>
        </div>


        {/* Product Section */}
        <div className="product-section">
          <h1>Car Mats</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="product-grid">
            {sortedProducts.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.title} />
                <div className="product-info">
                  <h2>{product.title}</h2>
                  <p>{product.manufacturer}</p>
                  <p>R{product.price}</p>
                  <p className={product.available ? 'in-stock' : 'out-stock'}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Audio;
