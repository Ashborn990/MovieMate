import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cinemasApi, showtimesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function CinemasPage() {
  const { selectedCity, setSelectedCity } = useAuth();
  const [cinemas, setCinemas] = useState([]);
  const [cities, setCities] = useState(['New York', 'Los Angeles', 'Chicago', 'Mumbai']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCinemas();
  }, [selectedCity]);

  const loadCinemas = async () => {
    try {
      setLoading(true);
      setError(null);

      const [cinRes, citRes] = await Promise.all([
        cinemasApi.getAll(selectedCity),
        cinemasApi.getCities(),
      ]);

      if (cinRes?.success) setCinemas(cinRes.data || []);
      if (citRes?.success && citRes.data?.length) setCities(['All', ...citRes.data]);
    } catch (err) {
      setError('Unable to load cinemas for ' + selectedCity);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper cinemas-page">
      <div className="catalog-header">
        <h1 className="page-title">Cinema Theatres & Multiplexes</h1>
        <p className="page-subtitle">Experience movies on cutting-edge IMAX, Dolby Atmos, and 4K digital screens.</p>
      </div>

      {/* City Filter Pills */}
      <div className="cinema-city-filter-bar">
        <span className="filter-label">Filter by City:</span>
        <div className="city-pill-buttons">
          {cities.map((city) => (
            <button
              key={city}
              className={`city-pill-btn ${selectedCity === city ? 'active' : ''}`}
              onClick={() => setSelectedCity(city)}
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner" />
          <p>Locating cinema halls in {selectedCity}...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : cinemas.length === 0 ? (
        <div className="empty-results-box">
          <h3>No cinemas listed for {selectedCity}</h3>
          <p>Please select another city from the tabs above.</p>
        </div>
      ) : (
        <div className="cinemas-grid">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="cinema-detail-card">
              <div className="cinema-card-top">
                <span className="cinema-icon-badge">🏢 Multiplex</span>
                <span className="cinema-price-badge">{cinema.priceRange || '$14 - $18'}</span>
              </div>

              <h2 className="cinema-name-heading">{cinema.name}</h2>
              <p className="cinema-address-line">📍 {cinema.address}, {cinema.city}</p>

              <div className="cinema-amenities-row">
                <span className="amenity-tag">📽️ {cinema.screens} Digital Screens</span>
                <span className="amenity-tag">🔊 Dolby Atmos</span>
                <span className="amenity-tag">🍿 Recliner Seating</span>
              </div>

              <div className="cinema-card-actions">
                <Link to="/movies" className="btn btn-primary btn-sm full-width-btn">
                  View Movies & Book Tickets
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
