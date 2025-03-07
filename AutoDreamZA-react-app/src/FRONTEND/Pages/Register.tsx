import mongoose from 'mongoose';
import Nav from "../../COMPONENTS/Navbar"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Register.css'
const CreateAccount: React.FC = () => {
   const[enteredUsername,setEnteredUsername] = useState('');
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok){
      const result = await response.json();
      setSuccessMessage('User registered successfully!');
      console.log('User registered successfully',result)
      navigate('/Login');
      setEnteredUsername('');
      setEnteredFirstName('');
      setEnteredLastName('');
      setEnteredEmail('');
      setEnteredPassword('');
      setError('');
    }else
    {
      const errorData = await response.json();
      setError(errorData.error || 'Registration failed')
      console.error('Registration failed:', errorData)
    }
  };
  return (
    
      <div className="create-account-container">
        <div className='form-container'>
          <h1>Create Account</h1>
          <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder='First Name'
              value={enteredFirstName}
              onChange={(e) => setEnteredFirstName(e.target.value)}
            />
          </div>
          <div className="create-account-container">
            <input
              type="text"
              placeholder='Last Name'
              value={enteredLastName}
              onChange={(e) => setEnteredLastName(e.target.value)}
            />
          </div>
          <div className="create-account-container">
            <input
              type="text"
              placeholder='Username'
              value={enteredUsername}
              onChange={(e) => setEnteredUsername(e.target.value)}
            />
          </div>
          <div className="create-account-container">
            <input
              type="text"
              placeholder='Email'
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className="create-account-container">
            <input
              type="text"
              placeholder='Password'
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </div>
          <div className="create-account-container">
            <input
              type="text"
              placeholder='Confirm Password'
            />
          </div>
          <button type="submit" className="create-account-btn"> Create Account </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </div>

    


  )
}
export default CreateAccount;