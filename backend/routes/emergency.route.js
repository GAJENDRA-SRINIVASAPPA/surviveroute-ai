const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage
let emergencyRequests = [];

/**
 * POST /api/emergency
 * Create emergency request
 */
router.post('/', (req, res) => {
  try {
    const request = {
      id: uuidv4(),
      userId: req.body.userId || 'default',
      type: req.body.type, // 'fuel', 'mechanic', 'tow', 'medical'
      location: req.body.location,
      vehicleInfo: req.body.vehicleInfo,
      description: req.body.description,
      status: 'SEARCHING',
      createdAt: new Date().toISOString()
    };

    emergencyRequests.push(request);

    // Simulate finding help (in production, this would match with professionals)
    setTimeout(() => {
      const index = emergencyRequests.findIndex(r => r.id === request.id);
      if (index !== -1) {
        emergencyRequests[index].status = 'ASSIGNED';
        emergencyRequests[index].helper = {
          name: getHelperName(request.type),
          phone: '+91-9876543210',
          eta: '8-12 min',
          distance: '2.3 km'
        };
        emergencyRequests[index].assignedAt = new Date().toISOString();
      }
    }, 3000);

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/emergency
 * Get all emergency requests
 */
router.get('/', (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const userRequests = emergencyRequests.filter(r => r.userId === userId);

    res.json({
      success: true,
      data: userRequests
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/emergency/:id
 * Get specific emergency request
 */
router.get('/:id', (req, res) => {
  try {
    const request = emergencyRequests.find(r => r.id === req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Emergency request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/emergency/:id/status
 * Update emergency request status
 */
router.put('/:id/status', (req, res) => {
  try {
    const index = emergencyRequests.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Emergency request not found'
      });
    }

    emergencyRequests[index].status = req.body.status;
    emergencyRequests[index].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: emergencyRequests[index]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/emergency/:id/cancel
 * Cancel emergency request
 */
router.post('/:id/cancel', (req, res) => {
  try {
    const index = emergencyRequests.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Emergency request not found'
      });
    }

    emergencyRequests[index].status = 'CANCELLED';
    emergencyRequests[index].cancelledAt = new Date().toISOString();

    res.json({
      success: true,
      data: emergencyRequests[index]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/emergency/sos
 * Send SOS alert
 */
router.post('/sos', (req, res) => {
  try {
    const sos = {
      id: uuidv4(),
      userId: req.body.userId || 'default',
      location: req.body.location,
      contacts: req.body.contacts || [],
      message: req.body.message || 'Emergency! Need immediate help.',
      sentAt: new Date().toISOString()
    };

    // In production, this would send SMS/notifications to emergency contacts
    console.log('SOS Alert sent:', sos);

    res.status(201).json({
      success: true,
      message: 'SOS alert sent successfully',
      data: sos
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function
function getHelperName(type) {
  const helpers = {
    fuel: 'Fuel Delivery Service',
    mechanic: 'Nearby Mechanic',
    tow: 'Tow Truck Service',
    medical: 'Medical Assistance'
  };
  return helpers[type] || 'Emergency Helper';
}

module.exports = router;

// Made with Bob
