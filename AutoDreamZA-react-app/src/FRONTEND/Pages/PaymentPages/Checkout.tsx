//import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../BACKEND/context/UserContext';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import CheckoutSteps from '../../../COMPONENTS/CheckoutSteps';
import '../Styles/Checkout.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

type CartItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CheckoutPage: React.FC = () => {
  const { userId } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    suburb: '',
    city: '',
    province: '',
    postalCode: '',
    deliveryInstructions: '',
  });

  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/user/cart/${userId}`);
        setCartItems(res.data || []);
      } catch (error) {
        console.error("Failed to fetch cart", error);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const PaymentForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [localError, setLocalError] = useState('');
    const [cardName, setCardName] = useState(''); // <-- New state

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!stripe || !elements) return;

      setProcessing(true);
      setLocalError('');

      try {
        const res = await axios.post('http://localhost:5000/payment/create-payment-intent', {
          amount: Math.round(total * 100),
        });

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: cardName || 'Unknown',
            },
          },
        });

        if (result.error) {
          setLocalError(result.error.message || 'Payment failed');
          setProcessing(false);
        } else if (result.paymentIntent?.status === 'succeeded') {
          setProcessing(false);
          setPaymentSuccess(true);
          onSuccess();
        }
      } catch (error) {
        setLocalError('Payment processing error');
        setProcessing(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="payment-form">
        <label htmlFor="card-name">Name on Card</label>
        <input
          id="card-name"
          type="text"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
          className="card-name-input"
        />

        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '20px',
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Arial, sans-serif',
                '::placeholder': { color: '#aab7c4' },
                padding: '15px 20px',
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />

        <div className="accepted-cards-message">
          <p><strong>Accepted Cards:</strong> Visa, MasterCard, American Express</p>
        </div>

        <button type="submit" disabled={!stripe || processing} className="checkout-btn">
          {processing ? 'Processing...' : `Pay R${total.toFixed(2)}`}
        </button>

        {localError && <div className="error-message">{localError}</div>}
      </form>
    );
  };


  return (
    <>
      <CheckoutSteps />
      <SecondNav />
      <Nav />

      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">
          <div className="checkout-section">
            <h2>Cart Items</h2>
            {cartItems.length === 0 && <p>Your cart is empty.</p>}
            {cartItems.map(item => (
              <div key={item.productId} className="cart-item-card">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>R{item.price} × {item.quantity}</p>
                  <p><strong>Subtotal:</strong> R{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <h2>Shipping Address</h2>
            {shippingAddress.address ? (
              <div>
                <p><strong>{shippingAddress.fullName}</strong></p>
                <p>{shippingAddress.address}, {shippingAddress.suburb}</p>
                <p>{shippingAddress.province}, {shippingAddress.postalCode}</p>
                <p>{shippingAddress.mobileNumber}</p>
                <button onClick={() => setShowAddressModal(true)}>Edit Address</button>
              </div>
            ) : (
              <button onClick={() => setShowAddressModal(true)} className="checkout-btn">Add Delivery Address</button>
            )}
          </div>

          {/* INLINE CREDIT CARD PAYMENT SECTION */}
          <div className="checkout-section">
            <h2>Credit Card Details</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm onSuccess={() => setPaymentSuccess(true)} />
            </Elements>
          </div>

          <div className="checkout-section summary-section">
            <h2>Order Summary</h2>
            {shippingAddress.address && (
              <>
                <p><strong>Shipping:</strong> {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.city}</p>
              </>
            )}
            <p><strong>Total:</strong> R{total.toFixed(2)}</p>
          </div>
        </div>

        {paymentSuccess && (
          <div className="success-message">
            Payment successful! Thank you for your order.
          </div>
        )}
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Enter Shipping Address</h2>
            <input name="fullName" placeholder="Full Name" value={shippingAddress.fullName} onChange={handleAddressChange} />
            <input name="mobileNumber" placeholder="Mobile Number" value={shippingAddress.mobileNumber} onChange={handleAddressChange} />
            <input name="address" placeholder="Address" value={shippingAddress.address} onChange={handleAddressChange} />
            <input name="suburb" placeholder="Suburb" value={shippingAddress.suburb} onChange={handleAddressChange} />
            <input name="city" placeholder="City" value={shippingAddress.city} onChange={handleAddressChange} />
            <input name="province" placeholder="Province" value={shippingAddress.province} onChange={handleAddressChange} />
            <input name="postalCode" placeholder="Postal Code" value={shippingAddress.postalCode} onChange={handleAddressChange} />
            <input name="deliveryInstructions" placeholder="Delivery Instructions" value={shippingAddress.deliveryInstructions} onChange={handleAddressChange} />
            <div className="modal-buttons">
              <button onClick={() => setShowAddressModal(false)} className="checkout-btn">Save</button>
              <button onClick={() => setShowAddressModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
