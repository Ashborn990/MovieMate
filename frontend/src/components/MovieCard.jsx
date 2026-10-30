import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

export default function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);

  // Fallback poster generator if external image URL is blocked or offline
  const fallbackPoster = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450" fill="%231e293b"><rect width="300" height="450" fill="%231e293b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23e11d48">🎬 ${encodeURIComponent(movie.title)}</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2394a3b8">${encodeURIComponent(movie.genre)} • ${encodeURIComponent(movie.language)}</text></svg>`;

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img
          src={imageError || !movie.posterUrl ? fallbackPoster : movie.posterUrl}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="poster-overlay">
          <Link to={`/movies/${movie.id}`} className="btn btn-primary btn-sm overlay-btn">
            View Details
          </Link>
        </div>
        {movie.rating > 0 && (
          <div className="card-rating">
            ⭐ {movie.rating.toFixed(1)}
          </div>
        )}
        <div className="card-badge-status">
          {movie.status === 'UPCOMING' ? 'Upcoming' : 'Now Showing'}
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </h3>

        <div className="movie-meta-chips">
          <span className="meta-tag">{movie.genre}</span>
          <span className="meta-dot">•</span>
          <span className="meta-tag">{movie.language}</span>
          {movie.duration && (
            <>
              <span className="meta-dot">•</span>
              <span className="meta-duration">{movie.duration}</span>
            </>
          )}
        </div>

        <div className="movie-card-footer">
          <Link to={`/movies/${movie.id}`} className="btn btn-outline btn-sm full-width-btn">
            {movie.status === 'UPCOMING' ? 'View Details' : 'Book Tickets'}
          </Link>
        </div>
      </div>
    </div>
  );
}
