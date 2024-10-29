import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
      })
      .then((res) => {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      })
      .catch((err) => {
        setError('Registration failed. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-950 text-white py-2 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
