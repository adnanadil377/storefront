import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Home link */}
        <Link to="/" className="text-xl font-bold hover:text-gray-300">
          Home
        </Link>

        {/* Navigation links */}
        <div className="space-x-4 flex items-center">
          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
