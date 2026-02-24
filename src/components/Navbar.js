import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-mono font-bold text-purple-950" onClick={closeMenu}>
              Poofy Hair
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
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
            <Link
              to="/4d"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/4d'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              4D
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-purple-950 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/gallery'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/thoughts"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/thoughts'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              Thoughts
            </Link>
            <Link
              to="/4d"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/4d'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              4D
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
