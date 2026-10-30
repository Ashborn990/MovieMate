import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { moviesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function HomePage() {
  const { selectedCity } = useAuth();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch movies and genres concurrently
      const [moviesRes, genresRes] = await Promise.all([
        moviesApi.getAll(),
        moviesApi.getGenres(),
      ]);

      if (moviesRes && moviesRes.success) {
        setMovies(moviesRes.data || []);
      }
      if (genresRes && genresRes.success) {
        setGenres(['All', ...(genresRes.data || [])]);
      }
    } catch (err) {
      setError('Unable to reach server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Filter movies based on the selected genre
  const filteredMovies = selectedGenre === 'All'
    ? movies
    : movies.filter((m) => m.genre?.toLowerCase() === selectedGenre.toLowerCase());

  const nowShowing = filteredMovies.filter((m) => m.status === 'NOW_SHOWING');
  const upcoming = filteredMovies.filter((m) => m.status === 'UPCOMING');
  const popular = movies.filter((m) => m.isPopular);

  return (
    <div className="page-wrapper home-page">
      {/* Top Blockbuster Carousel */}
      <HeroBanner featuredMovies={popular.length ? popular : movies.slice(0, 3)} />

      {/* Quick City & Search Status */}
      <div className="home-top-bar">
        <div className="location-callout">
          <span className="pulse-dot" />
          <span>Showing movies in <strong>{selectedCity}</strong></span>
        </div>

        {/* Genre Filter Chips */}
        <div className="genre-chips-container">
          {genres.map((g) => (
            <button
              key={g}
              className={`genre-chip ${selectedGenre === g ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner" />
          <p>Discovering blockbuster movies in {selectedCity}...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>⚠️ {error}</span>
          <button onClick={loadHomeData} className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Section: Now Showing */}
          <section className="movie-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">🎥 Now Showing in Theatres</h2>
                <p className="section-subtitle">Book tickets for today's hottest cinematic releases</p>
              </div>
              <Link to="/movies" className="view-all-link">View All ({nowShowing.length}) →</Link>
            </div>

            {nowShowing.length === 0 ? (
              <div className="empty-state">No movies found in "{selectedGenre}" genre.</div>
            ) : (
              <div className="grid-cards">
                {nowShowing.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>

          {/* Section: Upcoming Releases */}
          <section className="movie-section upcoming-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">🚀 Coming Soon to Cinemas</h2>
                <p className="section-subtitle">Exciting blockbusters releasing in coming weeks</p>
              </div>
              <Link to="/movies?status=UPCOMING" className="view-all-link">Browse Upcoming →</Link>
            </div>

            <div className="grid-cards">
              {upcoming.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>


        </>
      )}
    </div>
  );
}
