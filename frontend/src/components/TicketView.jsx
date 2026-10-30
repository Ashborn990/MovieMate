import React from 'react';
import '../styles/Ticket.css';

export default function TicketView({ booking }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ticket-container">
      <div className="ticket-card" id="printable-ticket">
        {/* Ticket Left: Main Pass */}
        <div className="ticket-main">
          <div className="ticket-header">
            <span className="ticket-brand">🎬 MovieMate Pass</span>
            <span className="ticket-status-badge">Confirmed</span>
          </div>

          <div className="ticket-movie-details">
            <h2 className="ticket-title">{booking.movieTitle}</h2>
            <div className="ticket-cinema-info">
              <p className="cinema-name">📍 {booking.cinemaName}</p>
              <p className="cinema-addr">{booking.cinemaAddress}</p>
            </div>
          </div>

          <div className="ticket-grid-meta">
            <div className="meta-box">
              <span className="label">DATE</span>
              <span className="value">{booking.showDate}</span>
            </div>
            <div className="meta-box">
              <span className="label">TIME</span>
              <span className="value">{booking.startTime}</span>
            </div>
            <div className="meta-box">
              <span className="label">SCREEN</span>
              <span className="value">Screen {booking.screenNumber || 1}</span>
            </div>
            <div className="meta-box">
              <span className="label">SEATS ({booking.seatCount || booking.seats?.length})</span>
              <span className="value highlight-seats">{booking.seats?.join(', ')}</span>
            </div>
          </div>

          <div className="ticket-user-meta">
            <span>Booked by: <strong>{booking.userName}</strong> ({booking.userEmail})</span>
            <span>Total Paid: <strong>${booking.totalAmount?.toFixed(2)}</strong></span>
          </div>
        </div>

        {/* Perforation Divider */}
        <div className="ticket-divider">
          <div className="notch notch-top" />
          <div className="dashed-line" />
          <div className="notch notch-bottom" />
        </div>

        {/* Ticket Right: Barcode Stub */}
        <div className="ticket-stub">
          <div className="stub-brand">ENTRY STUB</div>
          <div className="stub-ref">
            <span className="label">BOOKING ID</span>
            <span className="ref-code">{booking.bookingId}</span>
          </div>

          {/* Barcode Graphic */}
          <div className="barcode-box">
            <div className="barcode-bars">
              <span className="bar w1"></span><span className="bar w2"></span>
              <span className="bar w3"></span><span className="bar w1"></span>
              <span className="bar w2"></span><span className="bar w1"></span>
              <span className="bar w3"></span><span className="bar w2"></span>
              <span className="bar w1"></span><span className="bar w3"></span>
              <span className="bar w2"></span><span className="bar w1"></span>
              <span className="bar w2"></span><span className="bar w3"></span>
            </div>
            <span className="barcode-num">{booking.bookingId}</span>
          </div>

          <p className="stub-instruction">Show this barcode at the cinema turnstile for entry.</p>
        </div>
      </div>

      {/* Action Buttons (Hidden when printing via @media print) */}
      <div className="ticket-actions no-print">
        <button onClick={handlePrint} className="btn btn-primary btn-lg">
          🖨️ Print / Download Ticket (PDF)
        </button>
      </div>
    </div>
  );
}
