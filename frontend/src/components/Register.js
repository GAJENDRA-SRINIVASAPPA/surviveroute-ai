import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      onRegister(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚗</h1>
          <h2 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: '#666' }}>Join SurviveRoute AI today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-control"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-control"
              placeholder="+91-9876543210"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-control"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <small style={{ color: '#666', fontSize: '0.85rem' }}>
              Minimum 6 characters
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#667eea', fontWeight: 600 }}>
                Login here
              </Link>
            </p>
          </div>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>🎯 Why Join?</h4>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', lineHeight: '1.8', color: '#666' }}>
            <li>Save your vehicle preferences</li>
            <li>Track your fuel history</li>
            <li>Get personalized recommendations</li>
            <li>Access emergency services</li>
            <li>Connect with verified professionals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;

// Made with Bob
