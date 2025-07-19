import React, { useState, useEffect } from 'react';
import Nav from "../../../COMPONENTS/Navbar";
import SecondNav from "../../../COMPONENTS/SecondNavbar";
import { useUser } from '../../../BACKEND/context/UserContext';
import '../Styles/AccountSettings.css'; 

const AccountSettings: React.FC = () => {
  const { userId } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:5000/user/${userId}`);
      const data = await res.json();
      setEmail(data.email || '');
      setPhoneNumber(data.phoneNumber || '');
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('You must verify the OTP before updating your account.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/user/update-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, phoneNumber, currentPassword, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setError(data.error || 'Failed to update account');
        setMessage('');
      }
    } catch (err) {
      console.error('Update account error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) 
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage(data.message);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpVerified(true);
        setMessage('OTP verified. You may now update your account.');
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError('Failed to verify OTP');
    }
  };

  return (
    <>
      <SecondNav />
      <Nav />
      <div className="change-password-container">
        <h2>Update Account Info</h2>
        <form onSubmit={handleUpdateAccount}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {!otpSent ? (
            <button type="button" onClick={handleSendOtp}>
              Send OTP to Email
            </button>
          ) : !otpVerified ? (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="button" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          ) : (
            <p className="success">✅ OTP Verified</p>
          )}

          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label>New Password (optional)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit" disabled={!otpVerified}>Update Account</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default AccountSettings;
