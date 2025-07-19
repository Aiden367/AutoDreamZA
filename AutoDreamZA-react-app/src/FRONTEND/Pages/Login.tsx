import mongoose from 'mongoose';
import Nav from "../../COMPONENTS/Navbar"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../BACKEND/context/UserContext';
import SecondNav from "../../COMPONENTS/SecondNavbar"
import './Styles/Login.css'
const Login: React.FC = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useUser();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = {
            email: enteredEmail,
            password: enteredPassword,
        };



        try {
            const response = await fetch('http://localhost:5000/user/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Login Successful');
                localStorage.setItem('token', result.token);
                setUserId(result.user.id);
                localStorage.setItem('userId', result.user.id);
                navigate('/Home');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login Failed');
            }
        } catch (error) {
            console.error('Cannot login', error);
        }
    };

    const handleSendResetLink = async () => {
        try {
            const res = await fetch('http://localhost:5000/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });

            const data = await res.json();
            if (res.ok) {
                setResetMessage(data.message);
            } else {
                setResetMessage(data.error || 'Failed to send reset link.');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setResetMessage('An error occurred. Please try again.');
        }
    };


    return (
        <>
            <Nav />
            <SecondNav />
            <div className="login-container">

                <form onSubmit={handleLogin} className="login-form" noValidate>
                    <label htmlFor="email" className="input-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="input-field"
                    />

                    <label htmlFor="password" className="input-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="input-field"
                    />

                    <button type="submit" className="login-btn">Login</button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <p className="register-message">
                    Don't have an account? <Link to="/Register" className="register-link">Register here</Link>
                </p>

                <p
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    style={{ color: '#007bff', cursor: 'pointer', marginTop: '10px' }}
                >
                    Forgot your password?
                </p>

                {showForgotPassword && (
                    <div className="modal-overlay-forgot-password">
                        <div className="modal-content-forgot-password">
                            <h3>Reset Password</h3>
                            <label htmlFor="resetEmail" className="input-label">Enter your email address</label>
                            <input
                                id="resetEmail"
                                type="email"
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                                className="input-field"
                                style={{ marginBottom: '10px' }}
                            />

                            <div className="modal-buttons-forgot-password">
                                <button onClick={handleSendResetLink} className="login-btn">
                                    Send Reset Link
                                </button>
                                <button onClick={() => setShowForgotPassword(false)} className="login-btn">
                                    Cancel
                                </button>
                            </div>

                            {resetMessage && (
                                <p
                                    style={{
                                        marginTop: '10px',
                                        color: resetMessage.includes('sent') ? 'green' : 'red',
                                        fontSize: '0.9rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    {resetMessage}
                                </p>
                            )}
                        </div>
                    </div>
                )}



            </div>
        </>
    );


}
export default Login;