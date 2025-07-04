import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../BACKEND/context/UserContext';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import CheckoutSteps from '../../../COMPONENTS/CheckoutSteps';
import '../Styles/Checkout.css';

type CartItem = {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
};

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

    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

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

    return (
        <>
            <CheckoutSteps />
            <SecondNav />
            <Nav />

            <div className="checkout-container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-grid">
                    {/* Cart Items */}
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

                    {/* Shipping Address */}
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

                    {/* Payment Method */}
                    <div className="checkout-section">
                        <h2>Payment Method</h2>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="EFT">EFT</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>

                    {/* Summary */}
                    <div className="checkout-section summary-section">
                        <h2>Order Summary</h2>
                        {shippingAddress.address && (
                            <>
                                <p><strong>Shipping:</strong> {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.city}</p>
                            </>
                        )}
                        <p><strong>Payment:</strong> {paymentMethod}</p>
                        <p><strong>Total:</strong> R{total.toFixed(2)}</p>
                        <button className="checkout-btn">Place Order</button>
                    </div>
                </div>
            </div>

            {/* 🔲 Popup Modal for Shipping Address */}
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