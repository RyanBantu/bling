import React, { useState, useEffect } from 'react';

const Auth = ({ onAuthenticate }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
      onAuthenticate();
    }
  }, [onAuthenticate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim().toLowerCase();
    
    if (trimmedName === 'poof') {
      localStorage.setItem('authenticated', 'true');
      onAuthenticate();
      setError('');
    } else {
      setError('Sorry, that name doesn\'t match. Please try again.');
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-6">
            Hi This is Dummy, welcome to 4D
          </h1>
          <p className="text-xl md:text-2xl text-purple-800 mb-8">
            what do I call you ?
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
              autoFocus
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium text-lg"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
