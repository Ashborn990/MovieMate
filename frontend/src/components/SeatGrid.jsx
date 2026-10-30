import React from 'react';
import '../styles/SeatGrid.css';

export default function SeatGrid({
  seats = [],
  selectedSeats = [],
  onSeatToggle,
  ticketBasePrice = 15.0,
}) {
  // Group seats by row ('A', 'B', 'C', ...)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const getSeatStatus = (seatCode, isBooked) => {
    if (isBooked) return 'booked';
    if (selectedSeats.includes(seatCode)) return 'selected';
    return 'available';
  };

  return (
    <div className="seat-grid-container">
      {/* Curved Screen Indicator */}
      <div className="screen-indicator">
        <div className="screen-curve" />
        <span className="screen-text">SCREEN (ALL EYES THIS WAY)</span>
      </div>

      {/* Seat Layout Grid */}
      <div className="seating-area">
        {rows.map((rowLetter) => {
          // Seats belonging to this row
          const rowSeats = seats.filter((s) => s.row === rowLetter || s.seatNumber.startsWith(rowLetter));

          // Determine row tier label
          let tierLabel = 'Standard';
          if (rowLetter >= 'C' && rowLetter <= 'F') tierLabel = 'Premium';
          if (rowLetter >= 'G') tierLabel = 'VIP Recliner';

          return (
            <div key={rowLetter} className="seat-row-wrapper">
              <span className="row-label">{rowLetter}</span>

              <div className="seat-row">
                {rowSeats.map((seat) => {
                  // const status = getSeatStatus(seat.seatNumber, seat.isBooked);
                  // const isClickable = !seat.isBooked;

                  const isBooked = seat.isBooked ?? seat.booked ?? false;

                  const status = getSeatStatus(seat.seatNumber, isBooked);
                  const isClickable = !isBooked;

                  console.log(seat.seatNumber, seat.isBooked);

                  return (
                    <button
                      key={seat.seatNumber}
                      type="button"
                      className={`seat-btn seat-${status}`}
                      disabled={!isClickable}
                      onClick={() => onSeatToggle(seat.seatNumber)}
                      title={`Seat ${seat.seatNumber} (${tierLabel} - $${seat.price.toFixed(2)}) - ${status.toUpperCase()}`}
                    >
                      {seat.column}
                    </button>
                  );
                })}
              </div>

              <span className="row-tier-tag">{tierLabel}</span>
            </div>
          );
        })}
      </div>

      {/* Seat Status Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <span className="legend-swatch swatch-available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-swatch swatch-selected" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <span className="legend-swatch swatch-booked" />
          <span>Already Booked</span>
        </div>
      </div>
    </div>
  );
}
