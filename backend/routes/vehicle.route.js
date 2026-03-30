const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let vehicles = [];

/**
 * POST /api/vehicle
 * Add a new vehicle
 */
router.post('/', (req, res) => {
  try {
    const vehicle = {
      id: uuidv4(),
      userId: req.body.userId || 'default',
      type: req.body.type || 'car',
      fuelType: req.body.fuelType || 'petrol',
      mileage: req.body.mileage || 15,
      tankCapacity: req.body.tankCapacity || 40,
      drivingStyle: req.body.drivingStyle || 'normal',
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      createdAt: new Date().toISOString()
    };

    vehicles.push(vehicle);

    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/vehicle
 * Get all vehicles for a user
 */
router.get('/', (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const userVehicles = vehicles.filter(v => v.userId === userId);

    res.json({
      success: true,
      data: userVehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/vehicle/:id
 * Get a specific vehicle
 */
router.get('/:id', (req, res) => {
  try {
    const vehicle = vehicles.find(v => v.id === req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/vehicle/:id
 * Update a vehicle
 */
router.put('/:id', (req, res) => {
  try {
    const index = vehicles.findIndex(v => v.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    vehicles[index] = {
      ...vehicles[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: vehicles[index]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/vehicle/:id
 * Delete a vehicle
 */
router.delete('/:id', (req, res) => {
  try {
    const index = vehicles.findIndex(v => v.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    vehicles.splice(index, 1);

    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/vehicle/presets/:type
 * Get preset vehicle configurations
 */
router.get('/presets/:type', (req, res) => {
  const presets = {
    bike: {
      type: 'bike',
      mileage: 45,
      tankCapacity: 12,
      fuelType: 'petrol'
    },
    car: {
      type: 'car',
      mileage: 15,
      tankCapacity: 40,
      fuelType: 'petrol'
    },
    suv: {
      type: 'suv',
      mileage: 12,
      tankCapacity: 60,
      fuelType: 'diesel'
    },
    truck: {
      type: 'truck',
      mileage: 5,
      tankCapacity: 200,
      fuelType: 'diesel'
    },
    bus: {
      type: 'bus',
      mileage: 4,
      tankCapacity: 250,
      fuelType: 'diesel'
    },
    ev: {
      type: 'ev',
      mileage: 120,
      tankCapacity: 50,
      fuelType: 'electric'
    }
  };

  const preset = presets[req.params.type];

  if (!preset) {
    return res.status(404).json({
      success: false,
      error: 'Preset not found'
    });
  }

  res.json({
    success: true,
    data: preset
  });
});

module.exports = router;

// Made with Bob
