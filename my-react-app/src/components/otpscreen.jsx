import { useState } from 'react';
import axios from 'axios';
import './otpscreen.css';

function OtpVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify', {
        email,
        otp,
        password,
      });
      alert(res.data.message);
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className='otp-page'>
      <h1>Verify Your Email</h1>
      <form onSubmit={handleVerify} className='otp-form'>
        <input
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Re-enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Verify</button>
      </form>
    </div>
  );
}

export default OtpVerification;
