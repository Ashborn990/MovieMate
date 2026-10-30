// ==============================================================
// MovieMate - API Service Layer
// Communicates with Spring Boot Backend via standard Fetch API
// ==============================================================

const API_BASE_URL = '/api';

/**
 * Standard fetch wrapper that passes JSON headers and includes credentials (session cookies).
 */
async function apiRequest(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Transmits and receives HTTP session cookies!
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = result?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (error) {
    // If the network request fails (e.g. backend not running yet),
    // we log an informative error to assist local development.
    console.warn(`[MovieMate API] ${endpoint} -> ${error.message}`);
    throw error;
  }
}

// --------------------------------------------------------------
// Authentication APIs
// --------------------------------------------------------------
export const authApi = {
  signup: (userData) => apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),

  getCurrentUser: () => apiRequest('/auth/me'),
};

// --------------------------------------------------------------
// Movies APIs
// --------------------------------------------------------------
export const moviesApi = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.genre && filters.genre !== 'All') params.append('genre', filters.genre);
    if (filters.language && filters.language !== 'All') params.append('language', filters.language);
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/movies${query}`);
  },

  getById: (id) => apiRequest(`/movies/${encodeURIComponent(id)}`),

  getGenres: () => apiRequest('/movies/genres'),

  getLanguages: () => apiRequest('/movies/languages'),
};

// --------------------------------------------------------------
// Cinemas APIs
// --------------------------------------------------------------
export const cinemasApi = {
  getAll: (city) => {
    const query = city && city !== 'All' ? `?city=${encodeURIComponent(city)}` : '';
    return apiRequest(`/cinemas${query}`);
  },

  getById: (id) => apiRequest(`/cinemas/${id}`),

  getCities: () => apiRequest('/cinemas/cities'),
};

// --------------------------------------------------------------
// Showtimes APIs
// --------------------------------------------------------------
export const showtimesApi = {
  getShowtimes: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.movieId) params.append('movieId', filters.movieId);
    if (filters.city && filters.city !== 'All') params.append('city', filters.city);
    if (filters.date) params.append('date', filters.date);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/showtimes${query}`);
  },

  getById: (id) => apiRequest(`/showtimes/${id}`),

  getSeats: (id) => apiRequest(`/showtimes/${id}/seats`),
};

// --------------------------------------------------------------
// Bookings APIs
// --------------------------------------------------------------
export const bookingsApi = {
  create: (bookingData) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),

  getMyBookings: () => apiRequest('/bookings/my'),

  getById: (id) => apiRequest(`/bookings/${id}`),
};


