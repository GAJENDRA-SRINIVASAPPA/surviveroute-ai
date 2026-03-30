import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Marketplace() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    fetchProfessionals();
  }, [filterType]);

  const fetchProfessionals = async () => {
    setLoading(true);
    try {
      const params = {
        lat: 28.6139,
        lng: 77.2090,
        available: true
      };

      if (filterType !== 'all') {
        params.type = filterType;
      }

      const response = await axios.get('/api/professional/nearby', { params });
      let data = response.data.data;

      // Sort data
      if (sortBy === 'rating') {
        data.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'distance') {
        data.sort((a, b) => a.distance - b.distance);
      }

      setProfessionals(data);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const professionalTypes = [
    { value: 'all', label: 'All Services', icon: '🔧' },
    { value: 'mechanic', label: 'Mechanics', icon: '🔧' },
    { value: 'tow', label: 'Tow Services', icon: '🚛' },
    { value: 'fuel', label: 'Fuel Delivery', icon: '⛽' },
    { value: 'medical', label: 'Medical', icon: '🏥' }
  ];

  const requestService = async (professional) => {
    const confirmed = window.confirm(
      `Request service from ${professional.name}?\n\nEstimated arrival: 10-15 minutes\nContact: ${professional.phone}`
    );

    if (confirmed) {
      try {
        await axios.post('/api/emergency', {
          type: professional.type,
          professionalId: professional.id,
          location: { lat: 28.6139, lng: 77.2090 }
        });

        alert(`Service requested! ${professional.name} will contact you shortly.`);
      } catch (error) {
        console.error('Error requesting service:', error);
        alert('Failed to request service. Please try calling directly.');
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">👨‍🔧 Professional Marketplace</div>

        {/* Filters */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {professionalTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`btn ${filterType === type.value ? 'btn-primary' : 'btn-secondary'}`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{ fontWeight: 600 }}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                fetchProfessionals();
              }}
              className="form-control"
              style={{ width: 'auto' }}
            >
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Professionals List */}
        {!loading && professionals.length === 0 && (
          <div className="alert alert-info">
            No professionals found in this category. Try a different filter.
          </div>
        )}

        {!loading && professionals.length > 0 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {professionals.map(pro => (
              <div key={pro.id} className="professional-card">
                <div className="professional-header">
                  <div className="professional-info">
                    <h3>{pro.name}</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <span className={`badge ${pro.available ? 'badge-success' : 'badge-danger'}`}>
                        {pro.available ? '✓ Available' : '✗ Busy'}
                      </span>
                      {pro.verified && (
                        <span className="badge badge-primary">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="professional-rating">
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {pro.rating}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      ({pro.reviews})
                    </span>
                  </div>
                </div>

                <div className="professional-details">
                  <div>📍 {pro.distance} km away</div>
                  <div>📞 {pro.phone}</div>
                  <div>📍 {pro.address}</div>
                  {pro.specialization && (
                    <div>
                      🔧 Specialization: {pro.specialization.join(', ')}
                    </div>
                  )}
                  {pro.experience && (
                    <div>
                      📅 Experience: {pro.experience} years
                    </div>
                  )}
                  {pro.priceRange && (
                    <div>
                      💰 Price Range: {pro.priceRange}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => requestService(pro)}
                    className="btn btn-primary"
                    disabled={!pro.available}
                  >
                    📞 Request Service
                  </button>
                  <a
                    href={`tel:${pro.phone}`}
                    className="btn btn-secondary"
                    style={{ textDecoration: 'none' }}
                  >
                    📱 Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Register as Professional */}
      <div className="card">
        <div className="card-header">💼 Are you a professional?</div>
        <p style={{ marginBottom: '1rem' }}>
          Join our network and help people in need. Earn money by providing your services.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>✓ Flexible Hours</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Work when you want</p>
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>✓ Good Income</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Competitive rates</p>
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>✓ Help People</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Make a difference</p>
          </div>
        </div>
        <button
          className="btn btn-success"
          onClick={() => {
            alert('Professional registration coming soon! Contact support for early access.');
          }}
        >
          Register as Professional
        </button>
      </div>

      {/* How It Works */}
      <div className="card">
        <div className="card-header">❓ How It Works</div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h4>Browse Professionals</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Find verified professionals near you based on ratings and distance
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h4>Request Service</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Click to request service or call directly for immediate assistance
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h4>Get Help</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Professional arrives at your location and provides the service
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              4
            </div>
            <div>
              <h4>Rate & Review</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Share your experience to help others make informed decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;

// Made with Bob
