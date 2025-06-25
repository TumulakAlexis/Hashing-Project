import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './components/splashscreen';
import Login from './components/login-signup';
import Landing from './components/landing-page'; // Optional: if you want a landing route

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
