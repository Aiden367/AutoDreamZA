import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../Styles/ResetPassword.css'
const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (!token) {
      setMessage('Reset token is missing from URL');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/user/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Password reset successful. Redirecting to login...');
        setTimeout(() => navigate('/Login'), 3000);
      } else {
        setMessage(data.error || 'Reset failed');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setMessage('Server error');
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Your Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleReset} className="login-btn">Submit</button>
      {message && <p className={`reset-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
