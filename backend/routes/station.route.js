const express = require('express');
const router = express.Router();

// Sample station data (in production, this would come from a database or external API)
const stations = [
  {
    id: '1',
    name: 'HP Petrol Pump',
    type: 'petrol',
    location: { lat: 28.6139, lng: 77.2090 },
    address: 'Connaught Place, New Delhi',
    distance: 2.5,
    price: { petrol: 96.72, diesel: 89.62 },
    rating: 4.2,
    amenities: ['restroom', 'atm', 'shop'],
    open24Hours: true
  },
  {
    id: '2',
    name: 'Indian Oil Station',
    type: 'petrol',
    location: { lat: 28.6304, lng: 77.2177 },
    address: 'Kashmere Gate, New Delhi',
    distance: 5.8,
    price: { petrol: 96.72, diesel: 89.62 },
    rating: 4.0,
    amenities: ['restroom', 'shop'],
    open24Hours: false
  },
  {
    id: '3',
    name: 'Shell Petrol Station',
    type: 'petrol',
    location: { lat: 28.5355, lng: 77.3910 },
    address: 'Noida Sector 18',
    distance: 12.3,
    price: { petrol: 97.50, diesel: 90.20 },
    rating: 4.5,
    amenities: ['restroom', 'atm', 'shop', 'cafe'],
    open24Hours: true
  },
  {
    id: '4',
    name: 'Tata Power EV Charging',
    type: 'ev',
    location: { lat: 28.5494, lng: 77.2501 },
    address: 'South Extension, New Delhi',
    distance: 8.1,
    price: { fast: 15, slow: 8 },
    rating: 4.3,
    amenities: ['restroom', 'cafe', 'wifi'],
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    availableChargers: 3,
    totalChargers: 4
  },
  {
    id: '5',
    name: 'BPCL Petrol Pump',
    type: 'petrol',
    location: { lat: 28.4595, lng: 77.0266 },
    address: 'Gurgaon Sector 29',
    distance: 18.5,
    price: { petrol: 96.80, diesel: 89.70 },
    rating: 3.9,
    amenities: ['restroom', 'atm'],
    open24Hours: true
  }
];

/**
 * GET /api/station/nearby
 * Get nearby fuel/EV stations
 */
router.get('/nearby', (req, res) => {
  try {
    const { lat, lng, radius = 20, type = 'all' } = req.query;

    let filteredStations = stations;

    // Filter by type
    if (type !== 'all') {
      filteredStations = filteredStations.filter(s => s.type === type);
    }

    // Filter by radius (simplified - in production use proper geospatial queries)
    if (radius) {
      filteredStations = filteredStations.filter(s => s.distance <= parseFloat(radius));
    }

    // Sort by distance
    filteredStations.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      data: filteredStations,
      count: filteredStations.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/station/safe-on-route
 * Get safe fuel stations on route based on fuel range
 */
router.get('/safe-on-route', (req, res) => {
  try {
    const { safeRange } = req.query;

    if (!safeRange) {
      return res.status(400).json({
        success: false,
        error: 'safeRange parameter is required'
      });
    }

    const range = parseFloat(safeRange);
    const safeStations = stations.filter(s => s.distance <= range);

    // Mark stations by safety level
    const categorizedStations = safeStations.map(station => ({
      ...station,
      safetyLevel: getSafetyLevel(station.distance, range)
    }));

    res.json({
      success: true,
      data: categorizedStations,
      count: categorizedStations.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/station/:id
 * Get specific station details
 */
router.get('/:id', (req, res) => {
  try {
    const station = stations.find(s => s.id === req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }

    res.json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/station/search
 * Search stations by name or location
 */
router.get('/search', (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const results = stations.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.address.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/station/cheapest
 * Find cheapest fuel stations
 */
router.get('/cheapest', (req, res) => {
  try {
    const { fuelType = 'petrol', limit = 5 } = req.query;

    const petrolStations = stations.filter(s => s.type === 'petrol' && s.price[fuelType]);
    
    petrolStations.sort((a, b) => a.price[fuelType] - b.price[fuelType]);

    res.json({
      success: true,
      data: petrolStations.slice(0, parseInt(limit)),
      count: petrolStations.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function
function getSafetyLevel(distance, safeRange) {
  const ratio = distance / safeRange;
  
  if (ratio <= 0.5) return 'SAFE';
  if (ratio <= 0.7) return 'MODERATE';
  if (ratio <= 0.9) return 'CAUTION';
  return 'RISKY';
}

module.exports = router;

// Made with Bob
