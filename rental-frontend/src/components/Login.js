import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/token/', {
        username,
        password,
      })
      .then((res) => {
        setToken(res.data.access);
        localStorage.setItem('token', res.data.access);
        navigate('/');
      })
      .catch((err) => {
        setError('Invalid credentials');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        /><br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        /><br/>
        <button type="submit" className="bg-cyan-950	 text-white w-full py-2 rounded-sm hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
