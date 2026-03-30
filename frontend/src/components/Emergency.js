import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Emergency({ user, vehicle }) {
  const [activeRequest, setActiveRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Services', phone: '112' },
    { name: 'Police', phone: '100' },
    { name: 'Ambulance', phone: '108' }
  ]);

  const emergencyTypes = [
    {
      type: 'fuel',
      icon: '⛽',
      title: 'Fuel Delivery',
      description: 'Request emergency fuel delivery to your location',
      color: '#3182ce'
    },
    {
      type: 'mechanic',
      icon: '🔧',
      title: 'Mechanic',
      description: 'Get a mechanic to fix your vehicle',
      color: '#ed8936'
    },
    {
      type: 'tow',
      icon: '🚛',
      title: 'Tow Service',
      description: 'Request a tow truck to transport your vehicle',
      color: '#805ad5'
    },
    {
      type: 'medical',
      icon: '🏥',
      title: 'Medical Help',
      description: 'Request medical assistance',
      color: '#f56565'
    }
  ];

  const requestEmergency = async (type) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/emergency', {
        userId: user.id,
        type,
        location: {
          lat: 28.6139,
          lng: 77.2090
        },
        vehicleInfo: vehicle,
        description: `Emergency ${type} request`
      });

      setActiveRequest(response.data.data);

      // Poll for updates
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await axios.get(`/api/emergency/${response.data.data.id}`);
          setActiveRequest(statusResponse.data.data);

          if (statusResponse.data.data.status === 'ASSIGNED') {
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling status:', error);
        }
      }, 2000);

      // Clear interval after 30 seconds
      setTimeout(() => clearInterval(pollInterval), 30000);

    } catch (error) {
      console.error('Error requesting emergency:', error);
      alert('Failed to send emergency request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async () => {
    if (!activeRequest) return;

    try {
      await axios.post(`/api/emergency/${activeRequest.id}/cancel`);
      setActiveRequest(null);
      alert('Emergency request cancelled');
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  };

  const sendSOS = async () => {
    try {
      await axios.post('/api/emergency/sos', {
        userId: user.id,
        location: {
          lat: 28.6139,
          lng: 77.2090
        },
        contacts: emergencyContacts,
        message: 'Emergency! Need immediate help.'
      });

      alert('SOS alert sent to emergency contacts!');
    } catch (error) {
      console.error('Error sending SOS:', error);
      alert('Failed to send SOS. Please call emergency services directly.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'SEARCHING': '#ed8936',
      'ASSIGNED': '#48bb78',
      'CANCELLED': '#718096'
    };
    return colors[status] || '#667eea';
  };

  return (
    <div className="container">
      {/* SOS Button */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</h1>
          <h2 style={{ marginBottom: '1rem' }}>Emergency SOS</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            Press this button to send emergency alerts to your contacts and emergency services
          </p>
          <button
            onClick={sendSOS}
            className="btn"
            style={{
              background: 'white',
              color: '#e53e3e',
              fontSize: '1.2rem',
              padding: '1rem 2rem'
            }}
          >
            🚨 SEND SOS ALERT
          </button>
        </div>
      </div>

      {/* Active Request Status */}
      {activeRequest && (
        <div className="card">
          <div className="card-header">📍 Active Emergency Request</div>
          
          <div
            style={{
              padding: '1.5rem',
              background: '#f7fafc',
              borderRadius: '8px',
              borderLeft: `4px solid ${getStatusColor(activeRequest.status)}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  {emergencyTypes.find(t => t.type === activeRequest.type)?.icon}{' '}
                  {emergencyTypes.find(t => t.type === activeRequest.type)?.title}
                </h3>
                <span
                  className="badge"
                  style={{ background: getStatusColor(activeRequest.status), color: 'white' }}
                >
                  {activeRequest.status}
                </span>
              </div>
            </div>

            {activeRequest.status === 'SEARCHING' && (
              <div className="alert alert-warning">
                <div className="loading">
                  <div className="spinner"></div>
                </div>
                <p style={{ marginTop: '1rem' }}>Searching for available help nearby...</p>
              </div>
            )}

            {activeRequest.status === 'ASSIGNED' && activeRequest.helper && (
              <div className="alert alert-success">
                <h4 style={{ marginBottom: '0.5rem' }}>✓ Help is on the way!</h4>
                <p><strong>Helper:</strong> {activeRequest.helper.name}</p>
                <p><strong>Phone:</strong> {activeRequest.helper.phone}</p>
                <p><strong>ETA:</strong> {activeRequest.helper.eta}</p>
                <p><strong>Distance:</strong> {activeRequest.helper.distance}</p>
              </div>
            )}

            <button
              onClick={cancelRequest}
              className="btn btn-danger"
              style={{ marginTop: '1rem' }}
            >
              Cancel Request
            </button>
          </div>
        </div>
      )}

      {/* Emergency Services */}
      {!activeRequest && (
        <div className="card">
          <div className="card-header">🚨 Request Emergency Help</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {emergencyTypes.map(service => (
              <div
                key={service.type}
                style={{
                  padding: '1.5rem',
                  border: `2px solid ${service.color}`,
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => requestEmergency(service.type)}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  {service.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: service.color }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Sending emergency request...</p>
            </div>
          )}
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="card">
        <div className="card-header">📞 Emergency Contacts</div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f7fafc',
                borderRadius: '8px'
              }}
            >
              <div>
                <strong>{contact.name}</strong>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                📞 {contact.phone}
              </a>
            </div>
          ))}
        </div>

        <button
          className="btn btn-secondary"
          style={{ marginTop: '1rem' }}
          onClick={() => {
            const name = prompt('Enter contact name:');
            const phone = prompt('Enter phone number:');
            if (name && phone) {
              setEmergencyContacts([...emergencyContacts, { name, phone }]);
            }
          }}
        >
          + Add Emergency Contact
        </button>
      </div>

      {/* Safety Tips */}
      <div className="card">
        <div className="card-header">💡 Safety Tips</div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Always keep your phone charged when traveling</li>
          <li>Share your location with family/friends before long trips</li>
          <li>Keep emergency numbers saved in your phone</li>
          <li>Stay in your vehicle if it's safe to do so</li>
          <li>Turn on hazard lights if stopped on the road</li>
          <li>Keep a first aid kit and basic tools in your vehicle</li>
        </ul>
      </div>
    </div>
  );
}

export default Emergency;

// Made with Bob
