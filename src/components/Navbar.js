import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-mono font-bold text-purple-950">
              Poofy Hair
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/gallery'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/thoughts"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/thoughts'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Thoughts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
