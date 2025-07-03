import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/RegisterForm';
import Login from './pages/LoginForm';
import LandingPage from './pages/LandingPage';
import { useState, useEffect } from "react";


function App() {
  const [token, setToken] = useState(null);
  

  useEffect(() => {
      const savedToken = localStorage.getItem("token"); 
      setToken(savedToken);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home token={token} setToken={setToken} /> : <LandingPage />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/" /> : <Register setToken={setToken} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
