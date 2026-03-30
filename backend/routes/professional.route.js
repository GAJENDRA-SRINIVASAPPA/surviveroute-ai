const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for professionals
let professionals = [
  {
    id: '1',
    name: 'Ravi Mechanic Services',
    type: 'mechanic',
    phone: '+91-9876543210',
    location: { lat: 28.6139, lng: 77.2090 },
    address: 'Connaught Place, New Delhi',
    distance: 2.1,
    rating: 4.5,
    reviews: 127,
    available: true,
    specialization: ['car', 'bike'],
    experience: 8,
    priceRange: '₹500-2000',
    verified: true
  },
  {
    id: '2',
    name: 'Quick Tow Services',
    type: 'tow',
    phone: '+91-9876543211',
    location: { lat: 28.6304, lng: 77.2177 },
    address: 'Kashmere Gate, New Delhi',
    distance: 5.3,
    rating: 4.2,
    reviews: 89,
    available: true,
    vehicleTypes: ['car', 'suv', 'truck'],
    priceRange: '₹1000-5000',
    verified: true
  },
  {
    id: '3',
    name: 'Express Fuel Delivery',
    type: 'fuel',
    phone: '+91-9876543212',
    location: { lat: 28.5355, lng: 77.3910 },
    address: 'Noida Sector 18',
    distance: 8.7,
    rating: 4.3,
    reviews: 156,
    available: true,
    fuelTypes: ['petrol', 'diesel'],
    priceRange: '₹100-500 delivery fee',
    verified: true
  },
  {
    id: '4',
    name: 'City Mechanic Hub',
    type: 'mechanic',
    phone: '+91-9876543213',
    location: { lat: 28.5494, lng: 77.2501 },
    address: 'South Extension, New Delhi',
    distance: 6.2,
    rating: 4.6,
    reviews: 203,
    available: false,
    specialization: ['car', 'suv', 'ev'],
    experience: 12,
    priceRange: '₹800-3000',
    verified: true
  },
  {
    id: '5',
    name: 'Emergency Medical Response',
    type: 'medical',
    phone: '+91-9876543214',
    location: { lat: 28.4595, lng: 77.0266 },
    address: 'Gurgaon Sector 29',
    distance: 15.2,
    rating: 4.8,
    reviews: 342,
    available: true,
    services: ['first-aid', 'ambulance'],
    priceRange: '₹500-2000',
    verified: true
  }
];

/**
 * GET /api/professional/nearby
 * Get nearby professionals
 */
router.get('/nearby', (req, res) => {
  try {
    const { lat, lng, type, radius = 20, available } = req.query;

    let filtered = professionals;

    // Filter by type
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }

    // Filter by availability
    if (available === 'true') {
      filtered = filtered.filter(p => p.available === true);
    }

    // Filter by radius
    if (radius) {
      filtered = filtered.filter(p => p.distance <= parseFloat(radius));
    }

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/professional/:id
 * Get specific professional details
 */
router.get('/:id', (req, res) => {
  try {
    const professional = professionals.find(p => p.id === req.params.id);

    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found'
      });
    }

    res.json({
      success: true,
      data: professional
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/professional/register
 * Register a new professional
 */
router.post('/register', (req, res) => {
  try {
    const professional = {
      id: uuidv4(),
      name: req.body.name,
      type: req.body.type,
      phone: req.body.phone,
      location: req.body.location,
      address: req.body.address,
      distance: 0,
      rating: 0,
      reviews: 0,
      available: true,
      verified: false,
      createdAt: new Date().toISOString(),
      ...req.body
    };

    professionals.push(professional);

    res.status(201).json({
      success: true,
      message: 'Professional registered successfully',
      data: professional
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/professional/:id/availability
 * Update professional availability
 */
router.put('/:id/availability', (req, res) => {
  try {
    const index = professionals.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found'
      });
    }

    professionals[index].available = req.body.available;
    professionals[index].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: professionals[index]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/professional/:id/review
 * Add review for professional
 */
router.post('/:id/review', (req, res) => {
  try {
    const index = professionals.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found'
      });
    }

    const { rating, comment } = req.body;

    // Update average rating (simplified)
    const currentRating = professionals[index].rating;
    const currentReviews = professionals[index].reviews;
    const newRating = ((currentRating * currentReviews) + rating) / (currentReviews + 1);

    professionals[index].rating = parseFloat(newRating.toFixed(1));
    professionals[index].reviews += 1;

    res.json({
      success: true,
      message: 'Review added successfully',
      data: professionals[index]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/professional/top-rated
 * Get top-rated professionals
 */
router.get('/top-rated', (req, res) => {
  try {
    const { type, limit = 10 } = req.query;

    let filtered = professionals;

    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }

    // Sort by rating
    filtered.sort((a, b) => b.rating - a.rating);

    res.json({
      success: true,
      data: filtered.slice(0, parseInt(limit)),
      count: filtered.length
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
