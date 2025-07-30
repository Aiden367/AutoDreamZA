import mongoose from 'mongoose';
import Nav from "../../COMPONENTS/Navbar"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondNav from "../../COMPONENTS/SecondNavbar"
import './Styles/Register.css'

const CreateAccount: React.FC = () => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const nameRegex = /^[A-Za-z]+$/;
  const usernameRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}$/;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameRegex.test(enteredFirstName)) {
      setError("First name must contain only letters");
      return;
    }
    if (!nameRegex.test(enteredLastName)) {
      setError("Last name must contain only letters");
      return;
    }
    if (!usernameRegex.test(enteredUsername)) {
      setError("Username must be at least 10 characters long and include at least one number and one special character");
      return;
    }
    if (!emailRegex.test(enteredEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(enteredPassword)) {
      setError("Password must be at least 10 characters long and include at least one number and one special character");
      return;
    }
    if (enteredPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const userData = {
      username: enteredUsername,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
      role: 'user'
    };
    const response = await fetch('http://localhost:5000/user/Register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const result = await response.json();
      setSuccessMessage('User registered successfully!');
      console.log('User registered successfully', result);
      navigate('/Login');
      setEnteredUsername('');
      setEnteredFirstName('');
      setEnteredLastName('');
      setEnteredEmail('');
      setEnteredPassword('');
      setConfirmPassword('');
      setError('');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Registration failed');
      console.error('Registration failed:', errorData);
    }
  };

  return (
    <>
      <SecondNav />
      <Nav />
      <div className="register-page">
        <div className="create-account-container">
          <div className='form-container'>
            <form onSubmit={handleRegister}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder='First Name'
                  value={enteredFirstName}
                  onChange={(e) => setEnteredFirstName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder='Last Name'
                  value={enteredLastName}
                  onChange={(e) => setEnteredLastName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder='Username'
                  value={enteredUsername}
                  onChange={(e) => setEnteredUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder='Email'
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder='Password'
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="create-account-btn">Create Account</button>
              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
            <p className="login-redirect">
              Already have an account? <Link to="/Login" className="login-link">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
