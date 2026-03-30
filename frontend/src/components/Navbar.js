import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span style={{ fontSize: '1.8rem' }}>🚗</span>
        <span>SurviveRoute AI</span>
      </div>

      <ul className="navbar-nav">
        <li>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/map" className={`nav-link ${isActive('/map')}`}>
            🗺️ Map
          </Link>
        </li>
        <li>
          <Link to="/emergency" className={`nav-link ${isActive('/emergency')}`}>
            🚨 Emergency
          </Link>
        </li>
        <li>
          <Link to="/marketplace" className={`nav-link ${isActive('/marketplace')}`}>
            👨‍🔧 Marketplace
          </Link>
        </li>
        <li>
          <Link to="/assistant" className={`nav-link ${isActive('/assistant')}`}>
            💬 AI Assistant
          </Link>
        </li>
        <li>
          <Link to="/vehicle-setup" className={`nav-link ${isActive('/vehicle-setup')}`}>
            🚗 Vehicle
          </Link>
        </li>
        <li>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>
              👤 {user.name}
            </span>
            <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

// Made with Bob
