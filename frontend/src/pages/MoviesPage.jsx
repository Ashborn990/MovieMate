import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { moviesApi } from '../services/api';
import '../styles/Pages.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || 'ALL';

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCatalog();
  }, []);

  // Update searchTerm if URL changes
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) setSearchTerm(urlSearch);
  }, [searchParams]);

  const loadCatalog = async () => {
    try {
      setLoading(true);
      const [movRes, genRes, langRes] = await Promise.all([
        moviesApi.getAll(),
        moviesApi.getGenres(),
        moviesApi.getLanguages(),
      ]);

      if (movRes?.success) setMovies(movRes.data || []);
      if (genRes?.success) setGenres(['All', ...(genRes.data || [])]);
      if (langRes?.success) setLanguages(['All', ...(langRes.data || [])]);
    } catch (err) {
      setError('Failed to load movie catalog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Client-side instant multi-filtering
  const filteredMovies = movies.filter((movie) => {
    // 1. Title/Description/Genre Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        movie.title?.toLowerCase().includes(q) ||
        movie.genre?.toLowerCase().includes(q) ||
        movie.description?.toLowerCase().includes(q);
      if (!match) return false;
    }

    // 2. Genre Filter
    if (selectedGenre !== 'All' && movie.genre?.toLowerCase() !== selectedGenre.toLowerCase()) {
      return false;
    }

    // 3. Language Filter
    if (selectedLanguage !== 'All' && movie.language?.toLowerCase() !== selectedLanguage.toLowerCase()) {
      return false;
    }

    // 4. Status Filter
    if (selectedStatus !== 'ALL' && movie.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedStatus('ALL');
    setSearchParams({});
  };

  return (
    <div className="page-wrapper movies-catalog-page">
      <div className="catalog-header">
        <h1 className="page-title">Explore Movies</h1>
        <p className="page-subtitle">Find movies by title, filter by genre, language, and release status.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-toolbar">
        {/* Search Input */}
        <div className="filter-group search-filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Type movie title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Genre Selector */}
        <div className="filter-group">
          <label>Genre</label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Language Selector */}
        <div className="filter-group">
          <label>Language</label>
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Status Tab / Selector */}
        <div className="filter-group">
          <label>Status</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="ALL">All Movies</option>
            <option value="NOW_SHOWING">Now Showing</option>
            <option value="UPCOMING">Upcoming Only</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="filter-actions">
          <button onClick={clearFilters} className="btn btn-outline btn-sm clear-btn">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-status-bar">
        <span>Showing <strong>{filteredMovies.length}</strong> movies</span>
        {searchTerm && <span>for "<em>{searchTerm}</em>"</span>}
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="loader-container">
          <div className="spinner" />
          <p>Filtering cinema releases...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : filteredMovies.length === 0 ? (
        <div className="empty-results-box">
          <div className="empty-icon">🎞️</div>
          <h3>No matching movies found</h3>
          <p>Try clearing your search terms or selecting a different genre/language.</p>
          <button onClick={clearFilters} className="btn btn-primary" style={{ marginTop: '16px' }}>
            Show All Movies
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
