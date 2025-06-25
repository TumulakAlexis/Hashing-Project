import { useEffect, useState } from 'react';
import axios from 'axios';
import './otpscreen.css';

function OtpVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes

  // Countdown timer effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (timer <= 0) {
      alert('OTP expired. Please request a new one.');
      return;
    }

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
      <p className='description'>Please enter OTP sent to your registered email to complete your verification</p>
      <p>Time left: <strong>{formatTime(timer)}</strong></p>
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
