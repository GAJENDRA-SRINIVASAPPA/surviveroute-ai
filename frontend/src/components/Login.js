import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      onLogin(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    onLogin({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@surviveroute.com'
    });
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
          <h2 style={{ color: '#667eea', marginBottom: '0.5rem' }}>SurviveRoute AI</h2>
          <p style={{ color: '#666' }}>Never get stranded. Smart navigation & emergency assistance.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

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
            <label className="form-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-secondary"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            🎯 Try Demo (No Registration)
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#667eea', fontWeight: 600 }}>
                Register here
              </Link>
            </p>
          </div>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>✨ Features</h4>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', lineHeight: '1.8', color: '#666' }}>
            <li>Smart fuel prediction with AI</li>
            <li>Offline navigation capability</li>
            <li>Emergency assistance network</li>
            <li>Professional marketplace</li>
            <li>Real-time station finder</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Made with Bob
