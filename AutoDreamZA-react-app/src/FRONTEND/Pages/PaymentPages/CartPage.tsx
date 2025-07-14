import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../BACKEND/context/UserContext';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import '../Styles/Cart.css';
import CheckoutSteps from '../../../COMPONENTS/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../Images/bin.png';
import PlusIcon from '../../Images/plus.png';

type CartItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

const CartPage: React.FC = () => {
  const { userId } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // you can adjust this

  // Calculate displayed items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };


  const handleRemoveOne = async (productId: string) => {
    try {
      // Create new cart with quantity decreased by 1 for the matching item
      const updatedItems = cartItems
        .map(item => {
          if (item.productId === productId) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]; // remove null items where quantity was 0

      // Update cart on backend
      const res = await axios.post('http://localhost:5000/user/cart/update', {
        userId,
        cartItems: updatedItems
      });

      setCartItems(res.data.cart); // update state with backend response
    } catch (error) {
      console.error("Error removing one item", error);
      alert("Failed to update cart.");
    }
  };


  const handleIncreaseQuantity = async (productId: string) => {
    try {
      const updatedItems = cartItems.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      const res = await axios.post('http://localhost:5000/user/cart/update', {
        userId,
        cartItems: updatedItems
      });

      setCartItems(res.data.cart); // Update cart with latest from backend
    } catch (error) {
      console.error("Error increasing item quantity", error);
      alert("Failed to update item quantity.");
    }
  };


  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/user/cart/${userId}`);
        setCartItems(res.data || []);  // <-- Set cartItems here!
      } catch (error) {
        console.error("Failed to fetch cart", error);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  if (!userId) return <p>Please log in to view your cart.</p>;
  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p>{error}</p>;

  if (cartItems.length === 0) {
    return (
      <>
        <SecondNav />
        <Nav />
        <div className="empty-cart-container">
          <h1 className="empty-cart-title">Your AutoDream Cart is Empty</h1>
          <p className="empty-cart-description">
            You haven’t added any products to your cart yet. Once you do, they’ll appear here.
          </p>
          <p className="empty-cart-link">
            <a href="/" className="link-to-home">Continue shopping on AutoDreamZA</a>
          </p>
        </div>
      </>
    );
  }


  return (
    <>
      <CheckoutSteps />
      <SecondNav />
      <Nav />

      <div className="cart-container">
      

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is currently empty.</p>
              {/* Optional: Add an image or link to go back shopping */}
              {/* <img src="/assets/empty-cart.png" alt="Empty cart" className="empty-cart-img" /> */}
              <button className="checkout-btn" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-section">
                {currentItems.map(item => (
                  <div key={item.productId} className="cart-item-card">
                    <img src={item.image} alt={item.title} className="cart-item-image" />

                    <div className="cart-item-details">
                      {/* Header: title on left, price on right */}
                      <div className="cart-item-header">
                        <h2 className="item-title">{item.title}</h2>
                        <p className="item-price">R{item.price.toFixed(2)}</p>
                      </div>

                      {/* Show quantity controls at bottom */}
                      <div className="quantity-controls">
                        <button
                          className="remove-one-btn-cart"
                          onClick={() => handleRemoveOne(item.productId)}
                          aria-label={`Remove one ${item.title}`}
                        >
                          <img src={TrashIcon} alt="Remove item" className="icon-btn" />
                        </button>

                        <span className="quantity-number">{item.quantity}</span>

                        <button
                          className="add-btn"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                          aria-label={`Add one ${item.title}`}
                        >
                          <img src={PlusIcon} alt="Add item" className="icon-btn" />
                        </button>
                      </div>
                    </div>
                  </div>



                ))}
                <div className="pagination-controls">
                  <button onClick={goToPrevPage} disabled={currentPage === 1}>
                    Previous
                  </button>

                  <span>Page {currentPage} of {totalPages}</span>

                  <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </div>


              {/* Right: Summary */}
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <p className="summary-line">
                  Total Items: <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
                </p>
                <p className="summary-total">
                  Total: <strong>R{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
                </p>
                <button className="checkout-btn" onClick={() => navigate('/Checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

};
export default CartPage;