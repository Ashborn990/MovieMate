import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import SeatGrid from '../components/SeatGrid';
import { showtimesApi, bookingsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function SeatSelectionPage() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!showtimeId) return;

    void loadShowtimeAndSeats();

    const intervalId = setInterval(async () => {
      try {
        const response = await showtimesApi.getSeats(showtimeId);

        if (response?.success && Array.isArray(response.data)) {
          setSeats(response.data);

          // Remove seats that another user has booked.
          setSelectedSeats((previous) =>
              previous.filter((seatCode) =>
                  response.data.some(
                      (seat) =>
                          seat.seatNumber === seatCode &&
                          seat.isBooked !== true
                  )
              )
          );
        }
      } catch (error) {
        console.error('Seat refresh failed:', error);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [showtimeId]);

  const loadShowtimeAndSeats = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      // Fetch showtime details and dynamic seat layout concurrently
      const [showRes, seatsRes] = await Promise.all([
        showtimesApi.getById(showtimeId),
        showtimesApi.getSeats(showtimeId),
      ]);

      if (showRes?.success) setShowtime(showRes.data);
      if (seatsRes?.success) setSeats(seatsRes.data || []);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to load seating layout.');
    } finally {
      setLoading(false);
    }
  };

  const refreshSeats = async () => {
    try {
      const seatsRes = await showtimesApi.getSeats(showtimeId);

      if (seatsRes?.success && Array.isArray(seatsRes.data)) {
        setSeats(seatsRes.data);

        // Remove selections that have since been booked.
        setSelectedSeats((previousSeats) =>
            previousSeats.filter((seatCode) =>
                seatsRes.data.some(
                    (seat) =>
                        seat.seatNumber === seatCode && !seat.isBooked
                )
            )
        );
      }
    } catch (err) {
      console.error('Failed to refresh seat availability:', err);
    }
  };

  // Toggle seat selection
  const handleSeatToggle = (seatCode) => {
    setErrorMessage(null);
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatCode));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 tickets per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  // Calculate pricing breakdown
  const calculatePricing = () => {
    if (!showtime) return { subtotal: 0, convenienceFee: 0, total: 0 };

    let subtotal = 0;
    selectedSeats.forEach((seatCode) => {
      const seatObj = seats.find((s) => s.seatNumber === seatCode);
      if (seatObj) {
        subtotal += seatObj.price;
      } else {
        subtotal += showtime.ticketPrice;
      }
    });

    const convenienceFee = selectedSeats.length > 0 ? selectedSeats.length * 1.50 : 0;
    const total = subtotal + convenienceFee;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      convenienceFee: Math.round(convenienceFee * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  };

  const pricing = calculatePricing();

  // Booking Confirmation Handler
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      setErrorMessage('Please select at least one seat to proceed.');
      return;
    }

    // 1. Authentication Check
    if (!isAuthenticated) {
      // Redirect to login page and preserve return state so user doesn't lose chosen seats!
      navigate('/login', {
        state: {
          from: location.pathname,
          preservedSeats: selectedSeats,
          message: 'Please log in to your MovieMate account to confirm your tickets.',
        },
      });
      return;
    }

    // 2. Perform Atomic Backend Booking
    try {
      setBookingInProgress(true);
      setErrorMessage(null);

      const bookingPayload = {
        showtimeId: showtime.id,
        seats: selectedSeats,
      };

      const response = await bookingsApi.create(bookingPayload);

      if (response?.success && response.data) {
        // Successful booking! Navigate to confirmation page
        navigate(`/booking-confirmation/${response.data.bookingId}`, {
          state: { booking: response.data },
        });
      }
    } catch (err) {
      // If 409 Conflict occurred (someone just booked these seats concurrently)
      setErrorMessage(err.message || 'Booking conflict encountered. Please refresh and pick alternative seats.');
      // Refresh seat layout to show newly booked seats
      loadShowtimeAndSeats();
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container page-wrapper">
        <div className="spinner" />
        <p>Loading real-time seat availability from MongoDB...</p>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="page-wrapper">
        <div className="alert alert-error">{errorMessage || 'Showtime details not found.'}</div>
        <Link to="/movies" className="btn btn-secondary">← Back to Movies</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper seat-selection-page">
      {/* Top Header Summary */}
      <div className="seat-page-header">
        <div className="showtime-summary-card">
          <h1 className="summary-movie-title">{showtime.movieTitle}</h1>
          <p className="summary-cinema-line">
            🏢 <strong>{showtime.cinemaName}</strong> (Screen {showtime.screenNumber})
          </p>
          <div className="summary-pills">
            <span className="summary-pill">📅 {showtime.showDate}</span>
            <span className="summary-pill">⏰ {showtime.startTime}</span>
            <span className="summary-pill">📍 {showtime.city}</span>
            <span className="summary-pill">💵 Base: ${showtime.ticketPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Error Alert if double booking or validation occurs */}
      {errorMessage && (
        <div className="alert alert-error">
          <span>⚠️ {errorMessage}</span>
        </div>
      )}

      <div className="seat-booking-layout">
        {/* Left: Interactive Cinema Grid */}
        <div className="seat-grid-column">
          <SeatGrid
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
            ticketBasePrice={showtime.ticketPrice}
          />
        </div>

        {/* Right: Booking Summary & Checkout Card */}
        <div className="checkout-sidebar-column">
          <div className="checkout-card">
            <h3 className="checkout-title">Booking Summary</h3>

            {/* Selected Seats */}
            <div className="checkout-row">
              <span className="row-label">Selected Seats</span>
              <span className="row-val highlight-val">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </span>
            </div>

            {/* Ticket Count */}
            <div className="checkout-row">
              <span className="row-label">Seat Count</span>
              <span className="row-val">{selectedSeats.length} Ticket(s)</span>
            </div>

            <div className="divider-hr" />

            {/* Price Breakdown */}
            <div className="checkout-row">
              <span className="row-label">Subtotal</span>
              <span className="row-val">${pricing.subtotal.toFixed(2)}</span>
            </div>

            <div className="checkout-row">
              <span className="row-label">Convenience Fee ($1.50/seat)</span>
              <span className="row-val">${pricing.convenienceFee.toFixed(2)}</span>
            </div>

            <div className="divider-hr" />

            {/* Grand Total */}
            <div className="checkout-row grand-total-row">
              <span className="grand-label">Total Amount</span>
              <span className="grand-val">${pricing.total.toFixed(2)}</span>
            </div>

            {/* Simulated Payment Notice */}
            <div className="payment-simulation-notice">
              <span>💳 <strong>Simulated Instant Checkout:</strong> For this educational version, confirming immediately completes your booking and writes the reservation to MongoDB.</span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0 || bookingInProgress}
              className="btn btn-primary btn-lg full-width-btn confirm-btn"
            >
              {bookingInProgress ? (
                'Reserving Seats...'
              ) : !isAuthenticated ? (
                '🔑 Login to Confirm Booking'
              ) : (
                `🎟️ Confirm Booking ($${pricing.total.toFixed(2)})`
              )}
            </button>

            {!isAuthenticated && (
              <p className="auth-hint">
                You will be redirected back here automatically after logging in.
              </p>
            )}
          </div>

          {/* Academic Concurrency Insight Box */}
          <div className="academic-insight-box">
            <h4>💡 Concurrency Protection</h4>
            <p>
              When you click Confirm, Spring Boot issues an atomic <code>$nin</code> / <code>$push</code> query to MongoDB. If another person tries to reserve the same seat concurrently, the database refuses duplicate entry atomically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
