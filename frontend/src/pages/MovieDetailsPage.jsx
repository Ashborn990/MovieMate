import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { moviesApi, showtimesApi, cinemasApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity, setSelectedCity } = useAuth();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [cities, setCities] = useState(['New York', 'Los Angeles', 'Chicago', 'Mumbai']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, [id, selectedCity, selectedDate]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch movie details
      const movieRes = await moviesApi.getById(id);
      if (movieRes?.success) {
        setMovie(movieRes.data);
      }

      // 2. Fetch showtimes for this movie
      const [showRes, allShowRes] = await Promise.all([
        showtimesApi.getShowtimes({
          movieId: id,
          city: selectedCity,
          date: selectedDate,
        }),
        showtimesApi.getShowtimes({
          movieId: id,
        }),
      ]);

      if (showRes?.success && showRes.data?.length > 0) {
        setShowtimes(showRes.data);
      } else if (allShowRes?.success && allShowRes.data?.length > 0) {
        // If no shows match the exact city/date combination, display all available shows for this movie!
        setShowtimes(allShowRes.data);
      } else {
        setShowtimes([]);
      }

      // 3. Fetch cinemas list
      const cinRes = await cinemasApi.getAll(selectedCity);
      if (cinRes?.success) {
        setCinemas(cinRes.data || []);
      }

      // 4. Fetch cities list
      const cityRes = await cinemasApi.getCities();
      if (cityRes?.success && cityRes.data?.length) {
        setCities(cityRes.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  };

  // Next 3 days date options for quick tab selection
  const dateOptions = [0, 1, 2].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const iso = d.toISOString().split('T')[0];
    const dayLabel = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { iso, dayLabel, formatted };
  });

  if (loading && !movie) {
    return (
      <div className="loader-container page-wrapper">
        <div className="spinner" />
        <p>Loading movie & showtimes...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="page-wrapper">
        <div className="alert alert-error">{error || 'Movie not found.'}</div>
        <Link to="/movies" className="btn btn-secondary">← Back to Movies</Link>
      </div>
    );
  }

  // Group showtimes by cinema
  const showtimesByCinema = showtimes.reduce((acc, st) => {
    if (!acc[st.cinemaId]) {
      acc[st.cinemaId] = {
        cinemaName: st.cinemaName,
        city: st.city,
        screenNumber: st.screenNumber,
        shows: [],
      };
    }
    acc[st.cinemaId].shows.push(st);
    return acc;
  }, {});

  return (
    <div className="page-wrapper movie-details-page">
      {/* Movie Hero Banner */}
      <div
        className="details-banner"
        style={{
          backgroundImage: `linear-gradient(to right, #0b0f19 30%, rgba(11, 15, 25, 0.8) 70%, rgba(11, 15, 25, 0.4) 100%), url(${movie.bannerUrl || movie.posterUrl})`,
        }}
      >
        <div className="details-banner-content">
          <div className="details-poster-box">
            <img src={movie.posterUrl} alt={movie.title} className="details-poster-img" />
          </div>

          <div className="details-text-box">
            <div className="badge-tag status-pill">{movie.status === 'UPCOMING' ? 'Coming Soon' : 'Now Screening'}</div>
            <h1 className="details-title">{movie.title}</h1>

            <div className="details-meta-row">
              {movie.rating > 0 && <span className="badge-rating">⭐ {movie.rating.toFixed(1)} / 10</span>}
              <span className="meta-badge">{movie.genre}</span>
              <span className="meta-badge">{movie.language}</span>
              <span className="meta-badge">{movie.duration}</span>
              <span className="meta-badge">Released: {movie.releaseDate}</span>
            </div>

            <div className="storyline-box">
              <h3>Storyline</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showtime Booking Section */}
      <div className="showtime-booking-section">
        <div className="showtime-section-header">
          <h2>Select Date & Cinema Hall</h2>

          <div className="filters-inline">
            {/* City Selector */}
            <div className="city-filter-wrapper">
              <span>📍 City:</span>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date Selector Tabs */}
        <div className="date-tabs-bar">
          {dateOptions.map((opt) => (
            <button
              key={opt.iso}
              className={`date-tab-btn ${selectedDate === opt.iso ? 'active' : ''}`}
              onClick={() => setSelectedDate(opt.iso)}
            >
              <span className="tab-day-label">{opt.dayLabel}</span>
              <span className="tab-date-num">{opt.formatted}</span>
            </button>
          ))}
        </div>

        {/* Cinema Halls & Showtimes List */}
        <div className="cinemas-showtimes-list">
          {Object.keys(showtimesByCinema).length === 0 ? (
            <div className="empty-showtimes-card">
              <h3>No showtimes currently scheduled</h3>
              <p>
                No screenings found for <strong>{movie.title}</strong> in <strong>{selectedCity}</strong> on <strong>{selectedDate}</strong>.
              </p>
              <p className="hint">Try selecting another date or switching the city in the dropdown above.</p>
            </div>
          ) : (
            Object.entries(showtimesByCinema).map(([cinemaId, group]) => (
              <div key={cinemaId} className="cinema-show-card">
                <div className="cinema-card-info">
                  <h3 className="cinema-card-name">🏢 {group.cinemaName}</h3>
                  <span className="cinema-city-badge">Screen {group.screenNumber} • {group.city}</span>
                </div>

                <div className="showtimes-pills-grid">
                  {group.shows.map((show) => {
                    const bookedCount = show.bookedSeats ? show.bookedSeats.length : 0;
                    const availableCount = (show.totalSeats || 80) - bookedCount;
                    const isFillingFast = availableCount < 30;

                    return (
                      <Link
                        key={show.id}
                        to={`/seat-selection/${show.id}`}
                        className={`showtime-pill ${isFillingFast ? 'filling-fast' : ''}`}
                        title={`${availableCount} seats remaining out of ${show.totalSeats || 80}`}
                      >
                        <span className="show-time">{show.startTime}</span>
                        <span className="show-price">${show.ticketPrice.toFixed(2)}</span>
                        <span className="show-availability">
                          {isFillingFast ? '🔥 Almost Full' : `${availableCount} Available`}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
