import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VehicleSetup({ vehicle, onVehicleUpdate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'car',
    fuelType: 'petrol',
    mileage: 15,
    tankCapacity: 40,
    drivingStyle: 'normal',
    brand: '',
    model: '',
    year: new Date().getFullYear()
  });

  const [presets, setPresets] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const vehicleTypes = [
    { value: 'bike', label: '🏍️ Bike', mileage: 45, capacity: 12 },
    { value: 'car', label: '🚗 Car', mileage: 15, capacity: 40 },
    { value: 'suv', label: '🚙 SUV', mileage: 12, capacity: 60 },
    { value: 'truck', label: '🚚 Truck', mileage: 5, capacity: 200 },
    { value: 'bus', label: '🚌 Bus', mileage: 4, capacity: 250 },
    { value: 'ev', label: '⚡ Electric Vehicle', mileage: 120, capacity: 50 }
  ];

  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'cng', label: 'CNG' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const drivingStyles = [
    { value: 'eco', label: '🌱 Eco (Fuel Efficient)' },
    { value: 'normal', label: '🚗 Normal' },
    { value: 'aggressive', label: '⚡ Aggressive' },
    { value: 'sport', label: '🏎️ Sport' }
  ];

  const handleTypeChange = (type) => {
    const preset = vehicleTypes.find(v => v.value === type);
    if (preset) {
      setFormData({
        ...formData,
        type,
        mileage: preset.mileage,
        tankCapacity: preset.capacity,
        fuelType: type === 'ev' ? 'electric' : formData.fuelType
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/vehicle', formData);
      onVehicleUpdate(response.data.data);
      alert('Vehicle saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Failed to save vehicle. Please try again.');
    }
  };

  const loadPreset = async (type) => {
    try {
      const response = await axios.get(`/api/vehicle/presets/${type}`);
      setFormData({
        ...formData,
        ...response.data.data
      });
    } catch (error) {
      console.error('Error loading preset:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">🚗 Vehicle Setup</div>

        <form onSubmit={handleSubmit}>
          {/* Vehicle Type */}
          <div className="form-group">
            <label className="form-label">Vehicle Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {vehicleTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeChange(type.value)}
                  className={`btn ${formData.type === type.value ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '1rem' }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div className="form-group">
            <label className="form-label">Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              className="form-control"
              required
            >
              {fuelTypes.map(fuel => (
                <option key={fuel.value} value={fuel.value}>
                  {fuel.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mileage and Tank Capacity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                Mileage ({formData.fuelType === 'electric' ? 'km/kWh' : 'km/l'})
              </label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: parseFloat(e.target.value) })}
                className="form-control"
                min="1"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Tank Capacity ({formData.fuelType === 'electric' ? 'kWh' : 'Liters'})
              </label>
              <input
                type="number"
                value={formData.tankCapacity}
                onChange={(e) => setFormData({ ...formData, tankCapacity: parseFloat(e.target.value) })}
                className="form-control"
                min="1"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Driving Style */}
          <div className="form-group">
            <label className="form-label">Driving Style</label>
            <select
              value={formData.drivingStyle}
              onChange={(e) => setFormData({ ...formData, drivingStyle: e.target.value })}
              className="form-control"
              required
            >
              {drivingStyles.map(style => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Details */}
          <div className="card-header" style={{ fontSize: '1.2rem', marginTop: '1.5rem' }}>
            Optional Details
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="form-control"
                placeholder="e.g., Toyota, Honda"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="form-control"
                placeholder="e.g., Camry, Civic"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="form-control"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
            <strong>📊 Summary:</strong>
            <br />
            Your {formData.type} can travel approximately{' '}
            <strong>{(formData.mileage * formData.tankCapacity).toFixed(0)} km</strong> on a full tank
            with {formData.drivingStyle} driving style.
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              💾 Save Vehicle
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="card">
        <div className="card-header">💡 Tips</div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Choose the correct vehicle type for accurate predictions</li>
          <li>Enter your actual mileage for better results</li>
          <li>Eco driving style can improve fuel efficiency by 10-15%</li>
          <li>Update your vehicle details if you change driving habits</li>
        </ul>
      </div>
    </div>
  );
}

export default VehicleSetup;

// Made with Bob
