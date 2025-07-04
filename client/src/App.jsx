import React from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/RegisterForm';
import Login from './pages/LoginForm';
import LandingPage from './pages/LandingPage';
import Admin from'./pages/Admin';
import { useState, useEffect } from "react";
import API from '../api/axios';


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  

  useEffect(() => {
      const savedToken = localStorage.getItem("token"); 
      setToken(savedToken);

      if (savedToken) {
      API.get('/auth/me', {
      headers: { Authorization: `Bearer ${savedToken}` }
    })
    
    .then(res => {
      console.log("User bbbb:" , res.data);
      setUser(res.data);
    })
    .catch(err => {
      console.error("Token invalid", err);
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
    });
  }

  }, [token]);



  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home user={user} token={token} setToken={setToken} /> : <LandingPage />}
      />
      <Route
        path="/admin"
        element={token && user?.isAdmin ? (<Admin setToken={setToken} />) : (< Navigate to="/" />)}
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
