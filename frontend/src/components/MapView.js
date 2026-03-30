import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView({ vehicle, fuelLevel, prediction }) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center] = useState([28.6139, 77.2090]); // Default: New Delhi
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchStations();
  }, [filterType]);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/station/nearby', {
        params: {
          lat: center[0],
          lng: center[1],
          radius: 50,
          type: filterType === 'all' ? undefined : filterType
        }
      });
      setStations(response.data.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStationIcon = (station) => {
    const colors = {
      petrol: '#3182ce',
      ev: '#48bb78'
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: ${colors[station.type] || '#667eea'};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        ">
          ${station.type === 'ev' ? '⚡' : '⛽'}
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const getSafetyColor = (distance, safeRange) => {
    if (!safeRange) return '#667eea';
    const ratio = distance / safeRange;
    if (ratio <= 0.5) return '#48bb78';
    if (ratio <= 0.7) return '#ed8936';
    if (ratio <= 0.9) return '#f6ad55';
    return '#f56565';
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">🗺️ Map View</div>

        {/* Filter Controls */}
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('all')}
            className={`btn ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Stations
          </button>
          <button
            onClick={() => setFilterType('petrol')}
            className={`btn ${filterType === 'petrol' ? 'btn-primary' : 'btn-secondary'}`}
          >
            ⛽ Petrol/Diesel
          </button>
          <button
            onClick={() => setFilterType('ev')}
            className={`btn ${filterType === 'ev' ? 'btn-primary' : 'btn-secondary'}`}
          >
            ⚡ EV Charging
          </button>
        </div>

        {/* Map */}
        <div className="map-container">
          <MapContainer
            center={center}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Safe Range Circle */}
            {prediction && prediction.safeRange && (
              <Circle
                center={center}
                radius={prediction.safeRange * 1000}
                pathOptions={{
                  color: '#48bb78',
                  fillColor: '#48bb78',
                  fillOpacity: 0.1
                }}
              />
            )}

            {/* Current Location Marker */}
            <Marker position={center}>
              <Popup>
                <strong>📍 Your Location</strong>
                <br />
                {prediction && (
                  <>
                    Safe Range: {prediction.safeRange} km
                    <br />
                    Risk Level: {prediction.risk}
                  </>
                )}
              </Popup>
            </Marker>

            {/* Station Markers */}
            {stations.map(station => (
              <Marker
                key={station.id}
                position={[station.location.lat, station.location.lng]}
                icon={getStationIcon(station)}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <strong>{station.name}</strong>
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      {station.type === 'ev' ? '⚡ EV Charging' : '⛽ Fuel Station'}
                    </span>
                    <br />
                    <br />
                    <strong>Distance:</strong> {station.distance} km
                    <br />
                    {station.price && (
                      <>
                        <strong>Price:</strong>
                        <br />
                        {station.price.petrol && `Petrol: ₹${station.price.petrol}/L`}
                        {station.price.diesel && <br />}
                        {station.price.diesel && `Diesel: ₹${station.price.diesel}/L`}
                        {station.price.fast && `Fast: ₹${station.price.fast}/kWh`}
                        <br />
                      </>
                    )}
                    <strong>Rating:</strong> ⭐ {station.rating}
                    <br />
                    {station.open24Hours && (
                      <span className="badge badge-success">Open 24/7</span>
                    )}
                    {station.availableChargers && (
                      <>
                        <br />
                        <strong>Available:</strong> {station.availableChargers}/{station.totalChargers} chargers
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {/* Stations List */}
      <div className="card">
        <div className="card-header">📍 Nearby Stations ({stations.length})</div>
        
        {stations.length === 0 ? (
          <p>No stations found in this area.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {stations.map(station => (
              <div
                key={station.id}
                style={{
                  padding: '1rem',
                  border: `2px solid ${getSafetyColor(station.distance, prediction?.safeRange)}`,
                  borderRadius: '8px',
                  background: '#f7fafc'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>
                      {station.type === 'ev' ? '⚡' : '⛽'} {station.name}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {station.address}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                      <span>📍 {station.distance} km</span>
                      <span>⭐ {station.rating}</span>
                      {station.open24Hours && (
                        <span className="badge badge-success">24/7</span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {station.price && station.price.petrol && (
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                        ₹{station.price.petrol}
                      </div>
                    )}
                    {station.availableChargers && (
                      <div style={{ fontSize: '0.9rem', color: '#48bb78' }}>
                        {station.availableChargers} available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;

// Made with Bob
