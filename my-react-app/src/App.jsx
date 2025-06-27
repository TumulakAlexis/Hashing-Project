import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login-signup.jsx";
import ResetPassword from "./components/reset-password.jsx";
import Landing from "./components/landing-page.jsx";
import SplashScreen from "./components/splashscreen.jsx";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return showSplash ? (
    <SplashScreen onFinish={handleSplashFinish} />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  );
}

export default App;
