import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroBanner.css';

export default function HeroBanner({ featuredMovies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies]);

  if (!featuredMovies.length) return null;

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="hero-banner">
      <div
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11, 15, 25, 0.95) 20%, rgba(11, 15, 25, 0.6) 60%, rgba(11, 15, 25, 0.3) 100%), url(${currentMovie.bannerUrl || currentMovie.posterUrl})`,
        }}
      />
      <div className="hero-content">
        <div className="hero-badge">🔥 Featured Premiere</div>
        <h1 className="hero-title">{currentMovie.title}</h1>
        <div className="hero-meta">
          <span className="badge-rating">⭐ {currentMovie.rating.toFixed(1)}</span>
          <span className="hero-genre">{currentMovie.genre}</span>
          <span className="hero-dot">•</span>
          <span className="hero-lang">{currentMovie.language}</span>
          <span className="hero-dot">•</span>
          <span className="hero-duration">{currentMovie.duration}</span>
        </div>
        <p className="hero-description">{currentMovie.description}</p>
        <div className="hero-actions">
          <Link to={`/movies/${currentMovie.id}`} className="btn btn-primary btn-lg">
            🎟️ Book Tickets Now
          </Link>
          <Link to="/movies" className="btn btn-outline btn-lg">
            Explore All Movies
          </Link>
        </div>

        {/* Carousel Indicators */}
        {featuredMovies.length > 1 && (
          <div className="hero-indicators">
            {featuredMovies.map((m, idx) => (
              <button
                key={m.id || idx}
                className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide to movie ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
