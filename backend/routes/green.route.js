/**
 * 🌱 GREEN ENERGY & SUSTAINABILITY API ROUTES
 * Revolutionary sustainability features for everyone
 */

const express = require('express');
const router = express.Router();
const GreenEnergySystem = require('../utils/greenEnergySystem');

const greenSystem = new GreenEnergySystem();

// ========================================
// SOLAR INTEGRATION ROUTES
// ========================================

/**
 * Calculate solar charging potential
 * POST /api/green/solar/charging-potential
 */
router.post('/solar/charging-potential', (req, res) => {
  try {
    const { location, vehicleType } = req.body;
    
    if (!location || !vehicleType) {
      return res.status(400).json({ error: 'Location and vehicle type required' });
    }
    
    const result = greenSystem.calculateSolarChargingPotential(location, vehicleType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Find nearby solar charging stations
 * GET /api/green/solar/stations
 */
router.get('/solar/stations', (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Location required' });
    }
    
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const result = greenSystem.findSolarChargingStations(location, parseInt(radius) || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Calculate solar panel ROI
 * POST /api/green/solar/roi
 */
router.post('/solar/roi', (req, res) => {
  try {
    const { vehicleUsage, electricityCost } = req.body;
    
    if (!vehicleUsage || !electricityCost) {
      return res.status(400).json({ error: 'Vehicle usage and electricity cost required' });
    }
    
    const result = greenSystem.calculateSolarROI(vehicleUsage, electricityCost);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// EV OPTIMIZATION ROUTES
// ========================================

/**
 * Optimize EV charging schedule
 * POST /api/green/ev/optimize-charging
 */
router.post('/ev/optimize-charging', (req, res) => {
  try {
    const { location, batteryLevel, targetLevel } = req.body;
    
    if (!location || batteryLevel === undefined) {
      return res.status(400).json({ error: 'Location and battery level required' });
    }
    
    const result = greenSystem.optimizeEVCharging(location, batteryLevel, targetLevel);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Predict EV battery health
 * POST /api/green/ev/battery-health
 */
router.post('/ev/battery-health', (req, res) => {
  try {
    const { vehicleData, chargingHistory } = req.body;
    
    if (!vehicleData) {
      return res.status(400).json({ error: 'Vehicle data required' });
    }
    
    const result = greenSystem.predictBatteryHealth(vehicleData, chargingHistory || []);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Compare EV vs Petrol costs
 * POST /api/green/ev/compare-costs
 */
router.post('/ev/compare-costs', (req, res) => {
  try {
    const { dailyKm, petrolPrice, electricityPrice } = req.body;
    
    if (!dailyKm || !petrolPrice || !electricityPrice) {
      return res.status(400).json({ error: 'All parameters required' });
    }
    
    const result = greenSystem.compareEVvsPetrol(dailyKm, petrolPrice, electricityPrice);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// CARBON FOOTPRINT ROUTES
// ========================================

/**
 * Calculate trip carbon footprint
 * POST /api/green/carbon/calculate
 */
router.post('/carbon/calculate', (req, res) => {
  try {
    const trip = req.body;
    
    if (!trip.distance || !trip.vehicleType || !trip.fuelType) {
      return res.status(400).json({ error: 'Trip details required' });
    }
    
    const result = greenSystem.calculateCarbonFootprint(trip);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate carbon report
 * GET /api/green/carbon/report/:userId
 */
router.get('/carbon/report/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { period } = req.query;
    
    const result = greenSystem.generateCarbonReport(userId, period || 'MONTHLY');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get carbon offset options
 * POST /api/green/carbon/offset-options
 */
router.post('/carbon/offset-options', (req, res) => {
  try {
    const { emissions } = req.body;
    
    if (!emissions) {
      return res.status(400).json({ error: 'Emissions amount required' });
    }
    
    const result = greenSystem.getCarbonOffsetOptions(emissions);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// RENEWABLE ENERGY ROUTES
// ========================================

/**
 * Find renewable energy sources
 * GET /api/green/renewable/sources
 */
router.get('/renewable/sources', (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Location required' });
    }
    
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const result = greenSystem.findRenewableEnergySources(location, parseInt(radius) || 100);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Perform home energy audit
 * POST /api/green/renewable/energy-audit
 */
router.post('/renewable/energy-audit', (req, res) => {
  try {
    const homeData = req.body;
    
    if (!homeData.size || !homeData.occupants) {
      return res.status(400).json({ error: 'Home size and occupants required' });
    }
    
    const result = greenSystem.performEnergyAudit(homeData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// ECO REWARDS ROUTES
// ========================================

/**
 * Calculate eco rewards
 * POST /api/green/rewards/calculate
 */
router.post('/rewards/calculate', (req, res) => {
  try {
    const { userActions } = req.body;
    
    if (!userActions || !Array.isArray(userActions)) {
      return res.status(400).json({ error: 'User actions array required' });
    }
    
    const result = greenSystem.calculateEcoRewards(userActions);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get green challenges
 * GET /api/green/rewards/challenges
 */
router.get('/rewards/challenges', (req, res) => {
  try {
    const result = greenSystem.getGreenChallenges();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// SMART CITY ROUTES
// ========================================

/**
 * Get smart city data
 * GET /api/green/smart-city/:cityId
 */
router.get('/smart-city/:cityId', (req, res) => {
  try {
    const { cityId } = req.params;
    const result = greenSystem.getSmartCityData(cityId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// COMPREHENSIVE SUSTAINABILITY DASHBOARD
// ========================================

/**
 * Get complete sustainability overview
 * GET /api/green/dashboard/:userId
 */
router.get('/dashboard/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { lat, lng } = req.query;
    
    const location = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : { lat: 28.6139, lng: 77.2090 };
    
    // Compile comprehensive dashboard
    const dashboard = {
      carbonReport: greenSystem.generateCarbonReport(userId, 'MONTHLY'),
      solarPotential: greenSystem.calculateSolarChargingPotential(location, 'MEDIUM_EV'),
      evComparison: greenSystem.compareEVvsPetrol(50, 100, 6),
      ecoRewards: greenSystem.calculateEcoRewards([
        { type: 'EV_TRIP', distance: 25, consecutive: 5 },
        { type: 'SOLAR_CHARGING', consecutive: 3 }
      ]),
      challenges: greenSystem.getGreenChallenges(),
      smartCity: greenSystem.getSmartCityData('delhi'),
      renewableSources: greenSystem.findRenewableEnergySources(location, 100)
    };
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// Made with Bob
