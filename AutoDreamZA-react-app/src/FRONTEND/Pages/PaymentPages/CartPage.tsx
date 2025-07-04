import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../BACKEND/context/UserContext';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import '../Styles/Cart.css';
import CheckoutSteps from '../../../COMPONENTS/CheckoutSteps';
import { useNavigate } from 'react-router-dom';

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

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <>
      <CheckoutSteps />
      <SecondNav />
      <Nav />

      <div className="checkout-container">
        <h1 className="checkout-title">Your Cart</h1>

        <div className="checkout-content">
          {/* Left: Cart Items */}
          <div className="cart-items-section">
            {cartItems.map(item => (
              <div key={item.productId} className="cart-item-card">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2 className="item-title">{item.title}</h2>
                  <p>Price: <strong>R{item.price}</strong></p>
                  <p>Quantity: <strong>{item.quantity}</strong></p>
                  <p>Subtotal: <strong>R{(item.price * item.quantity).toFixed(2)}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="checkout-summary">
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
        </div>
      </div>
    </>
  );
};
export default CartPage;