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

                // Save token to localStorage (optional)
                localStorage.setItem('token', result.token);

                // **Add this line to update your userId in context**
                setUserId(result.user.id);

                // Optionally save userId in localStorage too (for persistence on refresh)
                localStorage.setItem('userId', result.user.id);

                // Navigate after setting userId
                navigate('/Home');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login Failed');
            }
        } catch (error) {
            console.error('Cannot login', error);
        }
    };


    return (
          <>

      <SecondNav />
      <Nav />
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
        </div>
        </>
    );


}
export default Login;