const express = require('express');
const router = express.Router();
const fuelEngine = require('../utils/fuelEngine');

/**
 * POST /api/predict
 * Calculate fuel range and risk prediction
 */
router.post('/', (req, res) => {
  try {
    const result = fuelEngine(req.body);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/predict/route
 * Predict fuel needs for entire route with multiple stops
 */
router.post('/route', (req, res) => {
  try {
    const { stops, vehicle, fuelLevel } = req.body;
    
    if (!stops || !Array.isArray(stops)) {
      return res.status(400).json({
        success: false,
        error: 'Stops array is required'
      });
    }

    let currentFuel = fuelLevel;
    const predictions = [];
    let totalDistance = 0;

    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i];
      totalDistance += stop.distance || 0;

      const prediction = fuelEngine({
        fuelLevel: currentFuel,
        vehicle,
        distance: stop.distance,
        traffic: stop.traffic,
        terrain: stop.terrain
      });

      predictions.push({
        stopName: stop.name,
        distance: stop.distance,
        prediction
      });

      // Simulate fuel consumption
      const fuelUsed = (stop.distance / vehicle.mileage / vehicle.tankCapacity) * 100;
      currentFuel = Math.max(0, currentFuel - fuelUsed);
    }

    res.json({
      success: true,
      data: {
        totalDistance,
        predictions,
        finalFuelLevel: currentFuel
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

// Made with Bob
