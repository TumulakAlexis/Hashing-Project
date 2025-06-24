import { useState } from 'react';
import './login-signup.css';
import { FiMail, FiLock } from 'react-icons/fi';
import axios from 'axios';
import OtpVerification from './otpscreen'; // ✅ Make sure the path is correct

function Login() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showOtpPage, setOtpPage] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('🔐 Attempting login...');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('✅ Login successful:', res.data);
      alert(res.data.message);
      // Optional: Redirect to landing page
    } catch (err) {
      console.error('❌ Login Error:', err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // ✅ Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log('📝 Register Form Submitted');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('🔑 Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      console.log('📤 Sending registration request...');
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      console.log('✅ Backend response:', res.data);

      setOtpPage(true); // Show OTP screen
    } catch (err) {
      console.error('❌ Registration Error:', err);
      console.log('Error Details:', err.response);
      alert(err.response?.data?.message || 'Registration failed');
    }

    debugger; // Stop here for inspection if needed
  };

  // ✅ Show OTP page when required
  if (showOtpPage) {
    return (
      <OtpVerification
        email={email}
        password={password}
        onSuccess={() => {
          alert('✅ Account verified! You may now log in.');
          setOtpPage(false);
          setShowSignIn(true);
        }}
      />
    );
  }

  // ✅ Login or Signup Form
  return (
    <div className={`login-page ${showSignIn ? '' : 'slide-left'}`}>
      {/* LEFT CONTAINER */}
      <div className="left-container">
        <div className="text">
          <h1>{showSignIn ? 'Welcome!' : 'Hello, Friend!'}</h1>
          <p>
            {showSignIn
              ? 'Welcome! If you don’t have an account yet, please create one.'
              : 'Enter your details to start your journey with us.'}
          </p>
          <button onClick={() => setShowSignIn((prev) => !prev)}>
            {showSignIn ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>

      {/* RIGHT CONTAINER */}
      <div className="right-container">
        {showSignIn ? (
          <>
            <h1>Sign In</h1>
            <form className="form-signup" onSubmit={handleLogin}>
              <div className="input-icon">
                <FiMail className="icon-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-icon">
                <FiLock className="icon-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="submit">
                <button type="submit">Login</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>Create Account</h1>
            <form className="form-signup" onSubmit={handleRegister}>
              <div className="input-icon">
                <FiMail className="icon-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-icon">
                <FiLock className="icon-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-icon">
                <FiLock className="icon-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="submit">
                <button type="submit">Register</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
