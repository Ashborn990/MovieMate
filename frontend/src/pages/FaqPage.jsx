import React, { useState } from 'react';
import '../styles/Pages.css';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0); // Default first question open

  const faqs = [
    {
      q: 'How do I book movie tickets on MovieMate?',
      a: 'Browse the movie catalog, click "Book Tickets" on any movie, select your desired date and cinema showtime, pick your seats from the interactive seat map, and confirm your booking. If you are not logged in, you will be prompted to log in or create a quick account before the booking is confirmed.',
    },
    {
      q: 'Do I need an account to browse movies?',
      a: 'No! You can freely browse all currently showing movies, upcoming films, cinema halls, and check showtimes without logging in or signing up. An account is only required when you are ready to reserve seats and generate your ticket.',
    },
    {
      q: 'How do I select seats on the visual seat layout?',
      a: 'On the Seat Selection page, you will see an 8x10 grid of cinema seats. Grey/dark outline seats are Available, neon red seats are Selected by you, and muted dark-red seats are already Booked by others. Simply click any available seat to select or deselect it.',
    },
    {
      q: 'How can I download or print my ticket?',
      a: 'Immediately after confirming your booking (and at any time from the "My Bookings" page), click the "Print / Download Ticket (PDF)" button. Your browser\'s print dialog will open with print-optimized CSS, allowing you to print to a physical printer or save as a PDF document.',
    },
    {
      q: 'What happens if a seat becomes unavailable while I am booking?',
      a: 'MovieMate employs atomic concurrency checks in MongoDB. If another user reserves your selected seat a fraction of a second before you confirm, the backend atomically rejects duplicate reservations and prompts you to select alternate available seats without charging you.',
    },
    {
      q: 'How can I view my past bookings?',
      a: 'Log in to your account and click the "My Bookings" button in the navigation bar. You will see a list of all your confirmed reservations along with cinema addresses, seat numbers, and a button to re-print your ticket stub.',
    },
    {
      q: 'How can I contact customer support?',
      a: 'You can reach our student project support team via email at support@moviemate.dev or by calling +1 (800) 555-FILM between 8:00 AM and Midnight.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-wrapper faq-page">
      <div className="catalog-header">
        <h1 className="page-title">Frequently Asked Questions</h1>
        <p className="page-subtitle">
          Everything you need to know about booking tickets, selecting seats, and the MovieMate system.
        </p>
      </div>

      <div className="faq-accordion-container">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
              <button
                className="faq-question-btn"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.q}</span>
                <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="faq-answer-panel">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
