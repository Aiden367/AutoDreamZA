import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/RoofRacks.css';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar"
import { useUser } from '../../../BACKEND/context/UserContext';
type Product = {
    _id: string;
    title: string;
    image: string;
    type: string;
    available: boolean;
    manufacturer: string;
    price: number;
};

type CartItem = {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
};


const Rims: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [availability, setAvailability] = useState('All');
    const [manufacturer, setManufacturer] = useState('All');
    const [priceSort, setPriceSort] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const { userId } = useUser();
    const [showPopup, setShowPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState<Product | null>(null);


    useEffect(() => {
        const scrapeAndFetchProducts = async () => {
            try {
                // Optional: scrape only if needed
                await axios.get('http://localhost:5000/product/scrape-if-needed');

                // ✅ Fetch only RoofRackProduct items
                const res = await axios.get('http://localhost:5000/product/products', {
                    params: {
                        type: 'rims',   // 👈 this is crucial
                        page: 1,
                        limit: 50
                    }
                });

                setProducts(res.data.products); // ✅ Make sure you're using .products
            } catch (error) {
                console.error("Error fetching roof rack products:", error);
            }
        };

        scrapeAndFetchProducts();
    }, []);


    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/cart/${userId}`);
                setCart(res.data || []);
            } catch (error) {
                console.error("Failed to load cart", error);
            }
        };

        fetchCart();
    }, [userId]);

    useEffect(() => {
        if (!userId || cart.length === 0) return;

        const updateCart = async () => {
            try {
                await axios.post('http://localhost:5000/user/cart/update', {
                    userId,
                    cartItems: cart,
                });
            } catch (error) {
                console.error("Failed to update cart", error);
            }
        };

        updateCart();
    }, [cart, userId]);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.productId === product._id);
            if (existing) {
                return prevCart.map(item =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        productId: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1
                    }
                ];
            }
        });

        setPopupProduct(product);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };
    const filteredProducts = products.filter(product => {
        const matchesAvailability =
            availability === 'All' ||
            (availability === 'InStock' && product.available) ||
            (availability === 'OutOfStock' && !product.available);

        const matchesManufacturer =
            manufacturer === 'All' || product.manufacturer === manufacturer;


        const matchesPrice =
            (!minPrice || product.price >= parseFloat(minPrice)) &&
            (!maxPrice || product.price <= parseFloat(maxPrice));

        const matchesSearch =
            (product.title ?? '').toLowerCase().includes(searchTerm.toLowerCase());

        return matchesAvailability && matchesManufacturer && matchesPrice && matchesSearch;
    });


    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (priceSort === 'asc') return a.price - b.price;
        if (priceSort === 'desc') return b.price - a.price;
        return 0;
    });

    return (
        <>
            {showPopup && popupProduct && (
                <div className="cart-popup">
                    <img src={popupProduct.image} alt={popupProduct.title} />
                    <div className="cart-popup-text">
                        <strong>{popupProduct.title}</strong>
                        <p>added to cart</p>
                    </div>
                </div>
            )}
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

                {/* Product Section */}
                <div className="product-section">
                    <h1>Rims</h1>

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
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={!product.available}
                                        className="add-to-cart-btn"
                                    >
                                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
export default Rims;