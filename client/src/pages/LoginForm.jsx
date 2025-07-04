import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

function LoginForm( {setToken} ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5009/api/auth/login', {
        username,
        password,
      });
      localStorage.removeItem("token");
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      console.log(res.data.token);
      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
      localStorage.removeItem('token');
      setToken(null);
      setUsername('');
      setPassword('');
    }
  };

  return (
  <div className="w-screen h-screen bg-gradient-to-r from-blue-500 via-orange-400 to-red-500 px-6 py-12">
    <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-xl p-10 flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Log In 🔐</h2>
      <p className="text-md text-gray-600 mb-6">Welcome back! Join the vibe again.</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            className="w-full bg-orange-400 text-black text-lg px-4 py-3 rounded-lg hover:bg-orange-500 transition"
          >
            Log In
          </button>
        {message && (
          <p className="text-red-500 text-sm mt-2">{message}</p>
        )}
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  </div>
);


}

export default LoginForm;


