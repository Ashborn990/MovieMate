import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">Movie<span className="logo-accent">Mate</span></span>
          </div>
          <p className="footer-desc">
            Your next movie experience starts here. Discover the latest movies, explore cinemas, choose your favourite seats, and book your tickets with ease.
          </p>
          <div className="tech-pills">
            <span className="pill">Movies</span>
            <span className="pill">Cinemas</span>
            <span className="pill">Showtimes</span>
            <span className="pill">Easy Booking</span>
            <span className="pill">Entertainment</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Now Showing</Link></li>
            <li><Link to="/movies?status=UPCOMING">Upcoming Releases</Link></li>
            <li><Link to="/cinemas">Cinema Theatres</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support & Info</h4>
          <ul>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); alert('MovieMate: Academic Capstone Project built for Full-Stack Java Demonstration.'); }}>About Us</a></li>
            <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('MovieMate is a demonstration project for educational use.'); }}>Terms & Privacy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Helpdesk</h4>
          <p className="contact-item">📧 support@moviemate.org</p>
          <p className="contact-item">📞 +1 (800) XXXX-555</p>
          <p className="contact-item">🏢 Whitefield, Bengaluru, Karnataka</p>
          <p className="contact-hours">⏰ Mon - Sun: 8:00 AM - Midnight</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MovieMate – Movie Ticket Booking System. All rights reserved.</p>
      </div>
    </footer>
  );
}
