import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TorusBackground from './components/TorusBackground';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Thoughts from './pages/Thoughts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onAuthenticate={handleAuthenticate} />;
  }

  return (
    <Router>
      <div className='bg-white w-screen min-h-screen flex-col relative'>
        <TorusBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/thoughts" element={<Thoughts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
