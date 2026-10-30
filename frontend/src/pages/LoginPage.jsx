import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If redirected from seat selection, preserved path will be in location.state.from
  const redirectTarget = location.state?.from || '/';
  const redirectMessage = location.state?.message || null;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleQuickDemoFill = () => {
    setFormData({
      email: 'john.doe@example.com',
      password: 'Password@123',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    try {
      setLoading(true);
      await login(formData);
      // Navigate back to the page the user was trying to access (e.g. seat selection)
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-header">
          <div className="auth-logo">🎬 MovieMate</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Log in to book tickets, choose your seats, and manage bookings.</p>
        </div>

        {redirectMessage && (
          <div className="alert alert-info">{redirectMessage}</div>
        )}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g., john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg full-width-btn"
          >
            {loading ? 'Verifying Credentials...' : 'Log In'}
          </button>

          {/* Quick Fill for College Demo */}
          <div className="demo-helper-box">
            <span>🎓 College Demo Quick-Fill:</span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="btn btn-outline btn-sm"
            >
              Fill Demo User (john.doe@example.com)
            </button>
          </div>
        </form>

        <div className="auth-card-footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/signup" className="auth-switch-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
