import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ vehicle, fuelLevel, onFuelUpdate, prediction, setPrediction }) {
  const [distance, setDistance] = useState(120);
  const [traffic, setTraffic] = useState('normal');
  const [terrain, setTerrain] = useState('flat');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle && fuelLevel) {
      calculatePrediction();
    }
  }, [vehicle, fuelLevel, distance, traffic, terrain]);

  const calculatePrediction = async () => {
    if (!vehicle) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/predict', {
        fuelLevel,
        vehicle,
        distance,
        traffic,
        terrain
      });

      setPrediction(response.data.data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    const colors = {
      'SAFE': 'safe',
      'CAUTION': 'caution',
      'WARNING': 'warning',
      'DANGER': 'danger'
    };
    return colors[risk] || 'safe';
  };

  const getRiskIcon = (risk) => {
    const icons = {
      'SAFE': '✓',
      'CAUTION': '⚠',
      'WARNING': '⚠',
      'DANGER': '⚠'
    };
    return icons[risk] || '✓';
  };

  if (!vehicle) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">🚗 Welcome to SurviveRoute AI</div>
          <p style={{ marginBottom: '1rem' }}>
            Please set up your vehicle first to start using the app.
          </p>
          <Link to="/vehicle-setup" className="btn btn-primary">
            Set Up Vehicle
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">📊 Dashboard</div>

        {/* Fuel Input */}
        <div className="form-group">
          <label className="form-label">Current Fuel Level (%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={fuelLevel}
            onChange={(e) => onFuelUpdate(parseFloat(e.target.value))}
            className="form-control"
            style={{ cursor: 'pointer' }}
          />
          <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginTop: '0.5rem' }}>
            {fuelLevel}%
          </div>
        </div>

        {/* Trip Parameters */}
        <div className="stats-grid">
          <div className="form-group">
            <label className="form-label">Distance to Destination (km)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Traffic Condition</label>
            <select
              value={traffic}
              onChange={(e) => setTraffic(e.target.value)}
              className="form-control"
            >
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
              <option value="jam">Traffic Jam</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Terrain Type</label>
            <select
              value={terrain}
              onChange={(e) => setTerrain(e.target.value)}
              className="form-control"
            >
              <option value="downhill">Downhill</option>
              <option value="flat">Flat</option>
              <option value="slight-uphill">Slight Uphill</option>
              <option value="uphill">Uphill</option>
              <option value="steep">Steep</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Prediction Results */}
        {prediction && !loading && (
          <>
            {/* Risk Meter */}
            <div className={`risk-meter ${getRiskColor(prediction.risk)}`}>
              <h2>{getRiskIcon(prediction.risk)} {prediction.risk}</h2>
              <p>Confidence Score: {(prediction.confidence * 100).toFixed(0)}%</p>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{prediction.safeRange} km</div>
                <div className="stat-label">Safe Range</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{prediction.adjustedRange} km</div>
                <div className="stat-label">Adjusted Range</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{prediction.baseRange} km</div>
                <div className="stat-label">Base Range</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{prediction.riskScore}</div>
                <div className="stat-label">Risk Score</div>
              </div>
            </div>

            {/* Recommendations */}
            {prediction.recommendations && prediction.recommendations.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>📋 Recommendations</h3>
                {prediction.recommendations.map((rec, index) => (
                  <div key={index} className={`alert alert-${rec.type}`}>
                    <strong>{rec.message}</strong>
                    <br />
                    <small>{rec.action}</small>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a href="/map" className="btn btn-primary">
                🗺️ View Map
              </a>
              <a href="/emergency" className="btn btn-danger">
                🚨 Emergency
              </a>
              <a href="/marketplace" className="btn btn-success">
                👨‍🔧 Find Help
              </a>
              <a href="/assistant" className="btn btn-secondary">
                💬 AI Assistant
              </a>
            </div>
          </>
        )}
      </div>

      {/* Vehicle Info Card */}
      <div className="card">
        <div className="card-header">🚗 Current Vehicle</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Type:</strong> {vehicle.type}
          </div>
          <div>
            <strong>Fuel Type:</strong> {vehicle.fuelType}
          </div>
          <div>
            <strong>Mileage:</strong> {vehicle.mileage} km/l
          </div>
          <div>
            <strong>Tank Capacity:</strong> {vehicle.tankCapacity} L
          </div>
          <div>
            <strong>Driving Style:</strong> {vehicle.drivingStyle}
          </div>
        </div>
        <a href="/vehicle-setup" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Edit Vehicle
        </a>
      </div>
    </div>
  );
}

export default Dashboard;

// Made with Bob
