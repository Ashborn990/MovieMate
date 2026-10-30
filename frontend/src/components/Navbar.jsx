import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout, selectedCity, setSelectedCity, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-icon">🎬</span>
          <span className="logo-text">Movie<span className="logo-accent">Mate</span></span>
        </Link>

        {/* Location Selector */}
        <div className="navbar-city-selector">
          <span className="city-icon">📍</span>
          <select value={selectedCity} onChange={handleCityChange} className="city-dropdown" title="Select your city">
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search movies, genres, or languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links & Auth Actions */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/movies" onClick={() => setMobileMenuOpen(false)}>Movies</Link>
          <Link to="/cinemas" onClick={() => setMobileMenuOpen(false)}>Cinemas</Link>
          <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>

          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/my-bookings" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>
                  🎟️ My Bookings
                </Link>
                <div className="user-badge" title={user?.email}>
                  👤 {user?.fullName?.split(' ')[0] || 'User'}
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-actions">
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
