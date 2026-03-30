/**
 * Advanced Fuel Prediction Engine
 * Calculates fuel range with multiple real-world factors
 */

function fuelEngine(data) {
  const {
    fuelLevel,
    vehicle,
    distance,
    traffic = 'normal',
    terrain = 'flat',
    load = 'none',
    weather = 'clear',
    acUsage = false
  } = data;

  // Validate inputs
  if (!vehicle || !vehicle.tankCapacity || !vehicle.mileage) {
    throw new Error('Invalid vehicle data');
  }

  if (fuelLevel < 0 || fuelLevel > 100) {
    throw new Error('Fuel level must be between 0 and 100');
  }

  // Step 1: Calculate base range
  let baseRange = (fuelLevel / 100) * vehicle.tankCapacity * vehicle.mileage;

  // Step 2: Apply adjustment factors
  let factor = 1.0;

  // Traffic impact
  const trafficFactors = {
    'light': 0.05,
    'normal': 0,
    'moderate': -0.1,
    'heavy': -0.2,
    'jam': -0.3
  };
  factor += trafficFactors[traffic] || 0;

  // Terrain impact
  const terrainFactors = {
    'downhill': 0.05,
    'flat': 0,
    'slight-uphill': -0.08,
    'uphill': -0.15,
    'steep': -0.25
  };
  factor += terrainFactors[terrain] || 0;

  // Driving style impact
  const drivingStyleFactors = {
    'eco': 0.1,
    'normal': 0,
    'aggressive': -0.25,
    'sport': -0.35
  };
  factor += drivingStyleFactors[vehicle.drivingStyle] || 0;

  // Load impact (for trucks/commercial vehicles)
  const loadFactors = {
    'none': 0,
    'light': -0.1,
    'medium': -0.2,
    'full': -0.3,
    'overload': -0.4
  };
  factor += loadFactors[load] || 0;

  // Weather impact
  const weatherFactors = {
    'clear': 0,
    'rain': -0.05,
    'storm': -0.1,
    'snow': -0.15
  };
  factor += weatherFactors[weather] || 0;

  // AC usage impact
  if (acUsage) {
    factor -= 0.08;
  }

  // Vehicle type specific adjustments
  const vehicleTypeFactors = {
    'bike': 0.05,
    'car': 0,
    'suv': -0.05,
    'truck': -0.1,
    'bus': -0.15,
    'ev': 0.1
  };
  factor += vehicleTypeFactors[vehicle.type] || 0;

  // Apply all factors
  let adjustedRange = baseRange * Math.max(0.3, factor); // Minimum 30% efficiency

  // Step 3: Calculate safe range (70% of adjusted range for safety buffer)
  let safeRange = adjustedRange * 0.7;

  // Step 4: Determine risk level
  let risk = 'SAFE';
  let riskScore = 0;

  if (distance) {
    const ratio = safeRange / distance;
    
    if (ratio >= 1.5) {
      risk = 'SAFE';
      riskScore = 100;
    } else if (ratio >= 1.2) {
      risk = 'SAFE';
      riskScore = 85;
    } else if (ratio >= 1.0) {
      risk = 'CAUTION';
      riskScore = 70;
    } else if (ratio >= 0.8) {
      risk = 'WARNING';
      riskScore = 50;
    } else {
      risk = 'DANGER';
      riskScore = 30;
    }
  }

  // Step 5: Calculate confidence score
  let confidence = distance ? Math.min(1, safeRange / distance) : 1;

  // Step 6: Generate recommendations
  const recommendations = generateRecommendations({
    risk,
    safeRange,
    distance,
    fuelLevel,
    adjustedRange
  });

  return {
    baseRange: Math.round(baseRange),
    adjustedRange: Math.round(adjustedRange),
    safeRange: Math.round(safeRange),
    risk,
    riskScore,
    confidence: Number(confidence.toFixed(2)),
    factors: {
      traffic: trafficFactors[traffic] || 0,
      terrain: terrainFactors[terrain] || 0,
      drivingStyle: drivingStyleFactors[vehicle.drivingStyle] || 0,
      load: loadFactors[load] || 0,
      weather: weatherFactors[weather] || 0,
      acUsage: acUsage ? -0.08 : 0,
      vehicleType: vehicleTypeFactors[vehicle.type] || 0,
      totalFactor: factor
    },
    recommendations
  };
}

function generateRecommendations(data) {
  const { risk, safeRange, distance, fuelLevel, adjustedRange } = data;
  const recommendations = [];

  if (risk === 'DANGER') {
    recommendations.push({
      type: 'critical',
      message: 'Refuel immediately! You may not reach your destination.',
      action: 'Find nearest fuel station'
    });
  } else if (risk === 'WARNING') {
    recommendations.push({
      type: 'warning',
      message: 'Fuel level is low. Refuel at the next available station.',
      action: 'Plan fuel stop within next 20 km'
    });
  } else if (risk === 'CAUTION') {
    recommendations.push({
      type: 'caution',
      message: 'Consider refueling for safety margin.',
      action: 'Monitor fuel level closely'
    });
  }

  if (fuelLevel < 25) {
    recommendations.push({
      type: 'info',
      message: 'Fuel level below 25%. Plan your next refuel stop.',
      action: 'Check nearby stations'
    });
  }

  if (distance && safeRange < distance * 1.1) {
    recommendations.push({
      type: 'warning',
      message: 'Limited safety buffer for this journey.',
      action: 'Consider refueling before departure'
    });
  }

  return recommendations;
}

module.exports = fuelEngine;

// Made with Bob
