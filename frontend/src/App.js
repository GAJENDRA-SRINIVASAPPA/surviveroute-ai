import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Dashboard from './components/Dashboard';
import VehicleSetup from './components/VehicleSetup';
import MapView from './components/MapView';
import Emergency from './components/Emergency';
import Marketplace from './components/Marketplace';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Onboarding from './components/Onboarding';

function App() {
  const [user, setUser] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [fuelLevel, setFuelLevel] = useState(50);
  const [prediction, setPrediction] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedVehicle = localStorage.getItem('vehicle');
    const savedFuelLevel = localStorage.getItem('fuelLevel');
    const onboardingComplete = localStorage.getItem('onboardingComplete');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedVehicle) setVehicle(JSON.parse(savedVehicle));
    if (savedFuelLevel) setFuelLevel(parseFloat(savedFuelLevel));
    
    // Show onboarding for first-time users
    if (!onboardingComplete && savedUser) {
      setShowOnboarding(true);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (vehicle) localStorage.setItem('vehicle', JSON.stringify(vehicle));
    localStorage.setItem('fuelLevel', fuelLevel.toString());
  }, [user, vehicle, fuelLevel]);

  const handleLogin = (userData) => {
    setUser(userData);
    // Show onboarding for new users
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setVehicle(null);
    localStorage.clear();
  };

  const handleVehicleUpdate = (vehicleData) => {
    setVehicle(vehicleData);
  };

  const handleFuelUpdate = (newFuelLevel) => {
    setFuelLevel(newFuelLevel);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Show onboarding for first-time users */}
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
        
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <Dashboard 
                  vehicle={vehicle}
                  fuelLevel={fuelLevel}
                  onFuelUpdate={handleFuelUpdate}
                  prediction={prediction}
                  setPrediction={setPrediction}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/vehicle-setup" 
            element={
              user ? (
                <VehicleSetup 
                  vehicle={vehicle}
                  onVehicleUpdate={handleVehicleUpdate}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/map" 
            element={
              user ? (
                <MapView 
                  vehicle={vehicle}
                  fuelLevel={fuelLevel}
                  prediction={prediction}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/emergency" 
            element={
              user ? (
                <Emergency 
                  user={user}
                  vehicle={vehicle}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/marketplace" 
            element={
              user ? <Marketplace /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/assistant" 
            element={
              user ? (
                <AIAssistant 
                  vehicle={vehicle}
                  fuelLevel={fuelLevel}
                  prediction={prediction}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Made with Bob
