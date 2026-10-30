import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookingsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TicketView from '../components/TicketView';
import '../styles/Pages.css';

export default function MyBookingsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTicketModal, setActiveTicketModal] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login', { state: { from: '/my-bookings', message: 'Please log in to view your bookings.' } });
      } else {
        loadMyBookings();
      }
    }
  }, [isAuthenticated, authLoading]);

  const loadMyBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await bookingsApi.getMyBookings();
      if (res?.success) {
        setBookings(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Unable to load your booking history.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="loader-container page-wrapper">
        <div className="spinner" />
        <p>Retrieving your ticket history...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper my-bookings-page">
      <div className="catalog-header">
        <h1 className="page-title">My Ticket Bookings</h1>
        <p className="page-subtitle">
          View your confirmed reservations, download tickets as PDF, or print passes.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {bookings.length === 0 ? (
        <div className="empty-results-box">
          <div className="empty-icon">🎟️</div>
          <h3>No movie tickets booked yet</h3>
          <p>You haven't reserved any cinema tickets yet. Explore movies showing right now!</p>
          <Link to="/movies" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Browse Movies & Book Now
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id || b.bookingId} className="booking-card-item">
              <div className="booking-item-header">
                <div>
                  <span className="booking-ref-badge">REF: {b.bookingId}</span>
                  <span className="booking-date-stamp">Booked on {b.bookingTimestamp}</span>
                </div>
                <span className="booking-status-tag">{b.status}</span>
              </div>

              <div className="booking-item-body">
                <div className="b-movie-info">
                  <h3 className="b-movie-title">{b.movieTitle}</h3>
                  <p className="b-cinema-name">📍 {b.cinemaName} (Screen {b.screenNumber})</p>
                </div>

                <div className="b-meta-details">
                  <div className="b-meta-group">
                    <span className="b-label">SHOW DATE & TIME</span>
                    <span className="b-val">{b.showDate} at {b.startTime}</span>
                  </div>
                  <div className="b-meta-group">
                    <span className="b-label">SEATS ({b.seatCount})</span>
                    <span className="b-val highlight-val">{b.seats?.join(', ')}</span>
                  </div>
                  <div className="b-meta-group">
                    <span className="b-label">TOTAL PAID</span>
                    <span className="b-val grand-val">${b.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="b-actions">
                  <button
                    onClick={() => setActiveTicketModal(b)}
                    className="btn btn-primary btn-sm"
                  >
                    🖨️ View & Print Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Viewer Modal */}
      {activeTicketModal && (
        <div className="modal-backdrop" onClick={() => setActiveTicketModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn no-print"
              onClick={() => setActiveTicketModal(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <TicketView booking={activeTicketModal} />
          </div>
        </div>
      )}
    </div>
  );
}
