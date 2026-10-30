import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import TicketView from '../components/TicketView';
import { bookingsApi } from '../services/api';
import '../styles/Pages.css';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const location = useLocation();

  // Try retrieving booking from location state first (instant), or fetch via API
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!booking && bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  const loadBooking = async () => {
    try {
      setLoading(true);
      const res = await bookingsApi.getById(bookingId);
      if (res?.success) {
        setBooking(res.data);
      }
    } catch (err) {
      setError(err.message || 'Unable to retrieve ticket details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper booking-confirmation-page">
      {/* Success Notification Banner */}
      <div className="confirmation-banner no-print">
        <div className="conf-icon">🎉</div>
        <h1 className="conf-heading">Booking Confirmed!</h1>
        <p className="conf-sub">
          Your cinema seats have been successfully reserved and recorded in MongoDB.
        </p>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner" />
          <p>Generating your printable ticket pass...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
          <Link to="/" className="btn btn-secondary btn-sm" style={{ marginLeft: '12px' }}>
            Return Home
          </Link>
        </div>
      ) : (
        <>
          {/* Printable Ticket Component */}
          <TicketView booking={booking} />

          {/* Quick Navigation Footer */}
          <div className="confirmation-actions no-print">
            <Link to="/my-bookings" className="btn btn-secondary">
              🎟️ View My Bookings
            </Link>
            <Link to="/" className="btn btn-outline">
              ← Return to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
