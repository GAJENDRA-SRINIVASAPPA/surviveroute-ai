/**
 * 🌱 GREEN ENERGY & SUSTAINABILITY SYSTEM
 * Revolutionary features for EV, Solar, and Environmental Impact
 * Makes the app essential for everyone caring about the planet
 */

class GreenEnergySystem {
  constructor() {
    this.solarData = new Map();
    this.evChargingNetwork = new Map();
    this.carbonFootprint = new Map();
    this.renewableEnergy = new Map();
    this.ecoRewards = new Map();
  }

  // ========================================
  // 1. SOLAR INTEGRATION
  // ========================================

  /**
   * Calculate solar charging potential for EVs
   * Tells users if they can charge using solar power
   */
  calculateSolarChargingPotential(location, vehicleType) {
    const sunlightHours = this.getSunlightHours(location);
    const solarPanelEfficiency = 0.20; // 20% efficiency
    const panelArea = 10; // 10 sq meters typical home installation
    
    // Calculate daily solar energy generation (kWh)
    const dailySolarEnergy = sunlightHours * panelArea * solarPanelEfficiency;
    
    // Calculate how much vehicle can be charged
    const vehicleBatteryCapacity = this.getVehicleBatteryCapacity(vehicleType);
    const chargingEfficiency = 0.90; // 90% charging efficiency
    
    const chargeablePercentage = (dailySolarEnergy * chargingEfficiency / vehicleBatteryCapacity) * 100;
    const chargeableRange = (chargeablePercentage / 100) * this.getVehicleRange(vehicleType);
    
    return {
      dailySolarEnergy: Math.round(dailySolarEnergy * 10) / 10,
      chargeablePercentage: Math.min(100, Math.round(chargeablePercentage)),
      chargeableRange: Math.round(chargeableRange),
      sunlightHours: sunlightHours,
      recommendation: this.getSolarRecommendation(chargeablePercentage),
      costSavings: this.calculateSolarSavings(dailySolarEnergy),
      environmentalImpact: this.calculateSolarEnvironmentalImpact(dailySolarEnergy)
    };
  }

  /**
   * Find nearby solar charging stations
   */
  findSolarChargingStations(location, radius = 50) {
    // Simulated solar charging stations
    const stations = [
      {
        id: 'solar_1',
        name: 'SunCharge Hub',
        location: { lat: location.lat + 0.01, lng: location.lng + 0.01 },
        distance: 2.5,
        type: 'SOLAR_POWERED',
        capacity: '100% Solar',
        chargingSpeed: 'FAST',
        price: 0, // Free solar charging
        availability: 'AVAILABLE',
        features: ['100% Renewable', 'Free Charging', 'Battery Storage']
      },
      {
        id: 'solar_2',
        name: 'Green Energy Station',
        location: { lat: location.lat + 0.02, lng: location.lng - 0.01 },
        distance: 5.8,
        type: 'HYBRID_SOLAR',
        capacity: '80% Solar + 20% Grid',
        chargingSpeed: 'ULTRA_FAST',
        price: 5, // Minimal cost
        availability: 'AVAILABLE',
        features: ['Mostly Renewable', 'Fast Charging', 'Solar Canopy']
      }
    ];

    return {
      stations: stations.filter(s => s.distance <= radius),
      totalSolarStations: stations.length,
      averageDistance: 4.15,
      recommendation: 'Use solar stations to reduce carbon footprint by 100%'
    };
  }

  /**
   * Solar panel ROI calculator for vehicle owners
   */
  calculateSolarROI(vehicleUsage, electricityCost) {
    const dailyKm = vehicleUsage.dailyKm || 50;
    const daysPerYear = 365;
    const yearlyKm = dailyKm * daysPerYear;
    
    // Energy consumption (kWh per 100km for typical EV)
    const energyPer100km = 15;
    const yearlyEnergyNeeded = (yearlyKm / 100) * energyPer100km;
    
    // Solar system cost and generation
    const solarSystemCost = 150000; // ₹1.5 lakh for 3kW system
    const yearlyGeneration = 4380; // 3kW system generates ~4380 kWh/year
    
    // Calculate savings
    const yearlySavings = Math.min(yearlyEnergyNeeded, yearlyGeneration) * electricityCost;
    const paybackPeriod = solarSystemCost / yearlySavings;
    const twentyYearSavings = (yearlySavings * 20) - solarSystemCost;
    
    return {
      solarSystemCost: solarSystemCost,
      yearlyEnergyNeeded: Math.round(yearlyEnergyNeeded),
      yearlyGeneration: yearlyGeneration,
      yearlySavings: Math.round(yearlySavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      twentyYearSavings: Math.round(twentyYearSavings),
      recommendation: paybackPeriod < 7 ? 'HIGHLY_RECOMMENDED' : 'RECOMMENDED',
      environmentalBenefit: {
        co2Saved: Math.round(yearlyGeneration * 0.82), // kg CO2 per year
        treesEquivalent: Math.round(yearlyGeneration * 0.82 / 20) // 1 tree = 20kg CO2/year
      }
    };
  }

  // ========================================
  // 2. EV OPTIMIZATION
  // ========================================

  /**
   * Smart EV charging optimizer
   * Tells when to charge for cheapest electricity and greenest energy
   */
  optimizeEVCharging(location, batteryLevel, targetLevel = 100) {
    const currentHour = new Date().getHours();
    
    // Time-of-use electricity pricing
    const pricingSchedule = [
      { hours: [0, 1, 2, 3, 4, 5], rate: 3, type: 'OFF_PEAK', renewable: 40 },
      { hours: [6, 7, 8, 9], rate: 6, type: 'MORNING_PEAK', renewable: 30 },
      { hours: [10, 11, 12, 13, 14, 15], rate: 5, type: 'DAY', renewable: 60 },
      { hours: [16, 17, 18, 19, 20, 21], rate: 8, type: 'EVENING_PEAK', renewable: 25 },
      { hours: [22, 23], rate: 4, type: 'NIGHT', renewable: 45 }
    ];
    
    // Find optimal charging window
    const optimalWindow = this.findOptimalChargingWindow(pricingSchedule, currentHour);
    
    // Calculate charging details
    const energyNeeded = ((targetLevel - batteryLevel) / 100) * 60; // 60 kWh typical battery
    const chargingTime = energyNeeded / 7.2; // 7.2 kW typical home charger
    const cost = energyNeeded * optimalWindow.rate;
    
    return {
      currentBattery: batteryLevel,
      targetBattery: targetLevel,
      energyNeeded: Math.round(energyNeeded * 10) / 10,
      chargingTime: Math.round(chargingTime * 10) / 10,
      optimalStartTime: optimalWindow.startTime,
      optimalEndTime: optimalWindow.endTime,
      cost: Math.round(cost),
      savings: Math.round((energyNeeded * 8) - cost), // vs peak rate
      renewablePercentage: optimalWindow.renewable,
      recommendation: optimalWindow.recommendation,
      carbonSaved: Math.round(energyNeeded * optimalWindow.renewable / 100 * 0.82)
    };
  }

  /**
   * EV battery health predictor
   * Predicts battery degradation and optimal charging patterns
   */
  predictBatteryHealth(vehicleData, chargingHistory) {
    const { age, totalKm, batteryCapacity, chargingCycles } = vehicleData;
    
    // Battery degradation factors
    const ageFactor = Math.max(0, 1 - (age * 0.02)); // 2% per year
    const cycleFactor = Math.max(0, 1 - (chargingCycles * 0.0001)); // 0.01% per cycle
    const usageFactor = Math.max(0, 1 - (totalKm * 0.000001)); // Minimal km impact
    
    const currentHealth = ageFactor * cycleFactor * usageFactor * 100;
    
    // Predict future health
    const predictions = [];
    for (let years = 1; years <= 10; years++) {
      const futureHealth = Math.max(70, currentHealth - (years * 2));
      predictions.push({
        year: years,
        health: Math.round(futureHealth),
        capacity: Math.round(batteryCapacity * futureHealth / 100),
        range: Math.round(400 * futureHealth / 100) // 400km base range
      });
    }
    
    return {
      currentHealth: Math.round(currentHealth),
      currentCapacity: Math.round(batteryCapacity * currentHealth / 100),
      predictions: predictions,
      recommendations: this.getBatteryHealthRecommendations(currentHealth),
      optimalChargingPattern: {
        minCharge: 20,
        maxCharge: 80,
        reason: 'Charging between 20-80% extends battery life by 50%'
      }
    };
  }

  /**
   * EV vs Petrol cost comparison
   * Shows real savings of switching to EV
   */
  compareEVvsPetrol(dailyKm, petrolPrice, electricityPrice) {
    const yearlyKm = dailyKm * 365;
    
    // Petrol vehicle
    const petrolMileage = 15; // km/liter
    const petrolConsumption = yearlyKm / petrolMileage;
    const petrolCost = petrolConsumption * petrolPrice;
    const petrolMaintenance = 15000; // Yearly maintenance
    const petrolTotal = petrolCost + petrolMaintenance;
    
    // EV
    const evEfficiency = 15; // kWh per 100km
    const evConsumption = (yearlyKm / 100) * evEfficiency;
    const evCost = evConsumption * electricityPrice;
    const evMaintenance = 5000; // Much lower maintenance
    const evTotal = evCost + evMaintenance;
    
    // Savings
    const yearlySavings = petrolTotal - evTotal;
    const fiveYearSavings = yearlySavings * 5;
    const tenYearSavings = yearlySavings * 10;
    
    return {
      petrol: {
        fuelCost: Math.round(petrolCost),
        maintenance: petrolMaintenance,
        total: Math.round(petrolTotal)
      },
      ev: {
        electricityCost: Math.round(evCost),
        maintenance: evMaintenance,
        total: Math.round(evTotal)
      },
      savings: {
        yearly: Math.round(yearlySavings),
        fiveYear: Math.round(fiveYearSavings),
        tenYear: Math.round(tenYearSavings)
      },
      environmental: {
        co2Saved: Math.round(petrolConsumption * 2.3 * 1000), // kg CO2 per year
        treesEquivalent: Math.round(petrolConsumption * 2.3 * 1000 / 20)
      },
      recommendation: 'Switch to EV and save ₹' + Math.round(yearlySavings) + ' per year!'
    };
  }

  // ========================================
  // 3. CARBON FOOTPRINT TRACKING
  // ========================================

  /**
   * Real-time carbon footprint calculator
   * Tracks environmental impact of every trip
   */
  calculateCarbonFootprint(trip) {
    const { distance, vehicleType, fuelType, speed, traffic } = trip;
    
    // Emission factors (kg CO2 per km)
    const emissionFactors = {
      PETROL: 0.192,
      DIESEL: 0.171,
      CNG: 0.157,
      EV_GRID: 0.082, // Grid electricity
      EV_SOLAR: 0.000, // Solar charging
      HYBRID: 0.096
    };
    
    const baseFactor = emissionFactors[fuelType] || 0.192;
    
    // Adjust for traffic and speed
    let adjustmentFactor = 1;
    if (traffic === 'heavy') adjustmentFactor = 1.3;
    if (speed > 100) adjustmentFactor *= 1.2;
    
    const emissions = distance * baseFactor * adjustmentFactor;
    
    return {
      distance: distance,
      emissions: Math.round(emissions * 1000) / 1000, // kg CO2
      emissionsPerKm: Math.round(baseFactor * adjustmentFactor * 1000) / 1000,
      treesNeeded: Math.round(emissions / 20 * 10) / 10, // Trees to offset
      comparison: {
        walking: 0,
        cycling: 0,
        publicTransport: Math.round(distance * 0.089 * 1000) / 1000,
        carpooling: Math.round(emissions / 4 * 1000) / 1000
      },
      offsetCost: Math.round(emissions * 50), // ₹50 per kg CO2
      recommendation: this.getCarbonRecommendation(emissions, distance)
    };
  }

  /**
   * Monthly/Yearly carbon report
   */
  generateCarbonReport(userId, period = 'MONTHLY') {
    // Simulated user data
    const trips = this.getUserTrips(userId, period);
    
    let totalEmissions = 0;
    let totalDistance = 0;
    let evTrips = 0;
    let petrolTrips = 0;
    
    trips.forEach(trip => {
      const footprint = this.calculateCarbonFootprint(trip);
      totalEmissions += footprint.emissions;
      totalDistance += trip.distance;
      
      if (trip.fuelType.startsWith('EV')) evTrips++;
      else petrolTrips++;
    });
    
    const avgEmissionPerKm = totalDistance > 0 ? totalEmissions / totalDistance : 0;
    const treesNeeded = totalEmissions / 20;
    
    return {
      period: period,
      totalTrips: trips.length,
      totalDistance: Math.round(totalDistance),
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      avgEmissionPerKm: Math.round(avgEmissionPerKm * 1000) / 1000,
      treesNeeded: Math.round(treesNeeded * 10) / 10,
      evTrips: evTrips,
      petrolTrips: petrolTrips,
      greenScore: Math.round((evTrips / trips.length) * 100),
      offsetCost: Math.round(totalEmissions * 50),
      improvements: this.suggestCarbonImprovements(totalEmissions, trips.length),
      ranking: this.getUserCarbonRanking(totalEmissions)
    };
  }

  /**
   * Carbon offset marketplace
   */
  getCarbonOffsetOptions(emissions) {
    return [
      {
        type: 'TREE_PLANTING',
        provider: 'Green India Initiative',
        cost: Math.round(emissions * 45),
        trees: Math.round(emissions / 20 * 10) / 10,
        location: 'Rajasthan Desert',
        verification: 'BLOCKCHAIN_VERIFIED',
        impact: '20-year carbon absorption'
      },
      {
        type: 'RENEWABLE_ENERGY',
        provider: 'Solar Power Cooperative',
        cost: Math.round(emissions * 55),
        capacity: Math.round(emissions * 2) + ' kWh',
        location: 'Gujarat Solar Farm',
        verification: 'GOVERNMENT_CERTIFIED',
        impact: 'Clean energy generation'
      },
      {
        type: 'WASTE_TO_ENERGY',
        provider: 'Clean City Project',
        cost: Math.round(emissions * 40),
        waste: Math.round(emissions * 10) + ' kg',
        location: 'Mumbai Waste Plant',
        verification: 'UN_CERTIFIED',
        impact: 'Waste reduction + energy'
      }
    ];
  }

  // ========================================
  // 4. RENEWABLE ENERGY INTEGRATION
  // ========================================

  /**
   * Find renewable energy sources nearby
   */
  findRenewableEnergySources(location, radius = 100) {
    return {
      solarFarms: [
        {
          name: 'Rajasthan Solar Park',
          capacity: '2255 MW',
          distance: 45,
          contribution: 'Powers 1.8M homes',
          visitorsAllowed: true
        }
      ],
      windFarms: [
        {
          name: 'Gujarat Wind Farm',
          capacity: '1064 MW',
          distance: 78,
          contribution: 'Powers 850K homes',
          visitorsAllowed: true
        }
      ],
      hydroelectric: [
        {
          name: 'Bhakra Dam',
          capacity: '1325 MW',
          distance: 120,
          contribution: 'Powers 1.1M homes',
          visitorsAllowed: true
        }
      ],
      biomass: [
        {
          name: 'Agricultural Waste Plant',
          capacity: '25 MW',
          distance: 15,
          contribution: 'Powers 20K homes',
          visitorsAllowed: false
        }
      ],
      summary: {
        totalCapacity: '4669 MW',
        renewablePercentage: 65,
        recommendation: 'Your area has excellent renewable energy infrastructure!'
      }
    };
  }

  /**
   * Home energy audit and recommendations
   */
  performEnergyAudit(homeData) {
    const { size, occupants, appliances, currentBill } = homeData;
    
    // Calculate energy consumption
    const baseConsumption = size * 8; // 8 kWh per sq ft per month
    const occupantConsumption = occupants * 150; // 150 kWh per person per month
    const applianceConsumption = this.calculateApplianceConsumption(appliances);
    
    const totalConsumption = baseConsumption + occupantConsumption + applianceConsumption;
    const efficiency = (currentBill / 6) / totalConsumption; // Assuming ₹6 per kWh
    
    return {
      currentConsumption: Math.round(totalConsumption),
      efficiency: Math.round(efficiency * 100),
      rating: this.getEfficiencyRating(efficiency),
      recommendations: [
        {
          action: 'Install LED lights',
          savings: '₹2,400/year',
          payback: '6 months',
          impact: 'Reduce consumption by 15%'
        },
        {
          action: 'Solar water heater',
          savings: '₹8,000/year',
          payback: '3 years',
          impact: 'Reduce consumption by 25%'
        },
        {
          action: 'Rooftop solar panels',
          savings: '₹25,000/year',
          payback: '6 years',
          impact: 'Generate 80% of your electricity'
        }
      ],
      solarPotential: this.calculateHomeSolarPotential(size, location),
      carbonFootprint: Math.round(totalConsumption * 0.82), // kg CO2 per month
      greenScore: Math.round(efficiency * 100)
    };
  }

  // ========================================
  // 5. ECO REWARDS & GAMIFICATION
  // ========================================

  /**
   * Eco rewards system
   * Rewards users for green choices
   */
  calculateEcoRewards(userActions) {
    let totalPoints = 0;
    const rewards = [];
    
    userActions.forEach(action => {
      let points = 0;
      let multiplier = 1;
      
      switch (action.type) {
        case 'EV_TRIP':
          points = action.distance * 2; // 2 points per km
          break;
        case 'SOLAR_CHARGING':
          points = 100;
          break;
        case 'CARPOOLING':
          points = action.distance * 1.5;
          break;
        case 'PUBLIC_TRANSPORT':
          points = action.distance * 1;
          break;
        case 'CYCLING':
          points = action.distance * 3;
          break;
        case 'CARBON_OFFSET':
          points = action.amount * 10; // 10 points per kg CO2 offset
          break;
        case 'RENEWABLE_ENERGY':
          points = 200;
          break;
      }
      
      // Bonus multipliers
      if (action.consecutive > 7) multiplier = 1.5; // Weekly streak
      if (action.consecutive > 30) multiplier = 2.0; // Monthly streak
      
      const finalPoints = Math.round(points * multiplier);
      totalPoints += finalPoints;
      
      rewards.push({
        action: action.type,
        basePoints: points,
        multiplier: multiplier,
        finalPoints: finalPoints,
        description: this.getActionDescription(action.type)
      });
    });
    
    return {
      totalPoints: totalPoints,
      rewards: rewards,
      level: this.calculateEcoLevel(totalPoints),
      badges: this.getEarnedBadges(userActions),
      leaderboard: this.getLeaderboardPosition(totalPoints),
      nextReward: this.getNextReward(totalPoints)
    };
  }

  /**
   * Green challenges and competitions
   */
  getGreenChallenges() {
    return [
      {
        id: 'zero_emission_week',
        title: 'Zero Emission Week',
        description: 'Use only EV/cycling/walking for 7 days',
        reward: '1000 points + Green Warrior badge',
        participants: 2847,
        timeLeft: '5 days',
        difficulty: 'MEDIUM'
      },
      {
        id: 'solar_champion',
        title: 'Solar Champion',
        description: 'Charge EV using solar power 10 times',
        reward: '500 points + Solar Hero badge',
        participants: 1203,
        timeLeft: '12 days',
        difficulty: 'EASY'
      },
      {
        id: 'carbon_neutral',
        title: 'Carbon Neutral Month',
        description: 'Offset all your emissions for 30 days',
        reward: '2000 points + Planet Protector badge',
        participants: 456,
        timeLeft: '18 days',
        difficulty: 'HARD'
      }
    ];
  }

  // ========================================
  // 6. SMART CITY INTEGRATION
  // ========================================

  /**
   * Smart city energy grid integration
   */
  getSmartCityData(cityId) {
    return {
      city: 'Smart City Delhi',
      energyMix: {
        renewable: 45,
        coal: 35,
        gas: 15,
        nuclear: 5
      },
      airQuality: {
        aqi: 156,
        status: 'MODERATE',
        recommendation: 'Use EV/public transport today'
      },
      trafficOptimization: {
        greenRoutes: 12,
        evPriority: true,
        carpoolLanes: 8
      },
      incentives: [
        {
          type: 'EV_PARKING',
          benefit: 'Free parking for EVs',
          locations: 'All malls and offices'
        },
        {
          type: 'TOLL_DISCOUNT',
          benefit: '50% toll discount for EVs',
          locations: 'All highways'
        },
        {
          type: 'FAST_LANE',
          benefit: 'EV fast lanes during peak hours',
          locations: 'Major roads'
        }
      ],
      futureProjects: [
        {
          name: 'Wireless EV Charging Roads',
          timeline: '2027',
          impact: 'Charge while driving'
        },
        {
          name: '100% Renewable Grid',
          timeline: '2030',
          impact: 'Zero emission electricity'
        }
      ]
    };
  }

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  getSunlightHours(location) {
    // Simplified calculation based on latitude
    const lat = Math.abs(location.lat);
    if (lat < 23.5) return 11; // Tropical
    if (lat < 35) return 9;    // Subtropical
    return 7;                  // Temperate
  }

  getVehicleBatteryCapacity(vehicleType) {
    const capacities = {
      'SMALL_EV': 30,
      'MEDIUM_EV': 60,
      'LARGE_EV': 100,
      'EV_BUS': 300
    };
    return capacities[vehicleType] || 60;
  }

  getVehicleRange(vehicleType) {
    const ranges = {
      'SMALL_EV': 200,
      'MEDIUM_EV': 400,
      'LARGE_EV': 600,
      'EV_BUS': 300
    };
    return ranges[vehicleType] || 400;
  }

  getSolarRecommendation(chargeablePercentage) {
    if (chargeablePercentage >= 100) return 'EXCELLENT - Solar can fully charge your vehicle daily';
    if (chargeablePercentage >= 50) return 'GOOD - Solar can charge 50%+ daily';
    if (chargeablePercentage >= 25) return 'MODERATE - Solar can supplement charging';
    return 'LIMITED - Consider larger solar installation';
  }

  calculateSolarSavings(dailyEnergy) {
    const electricityRate = 6; // ₹6 per kWh
    const dailySavings = dailyEnergy * electricityRate;
    return {
      daily: Math.round(dailySavings),
      monthly: Math.round(dailySavings * 30),
      yearly: Math.round(dailySavings * 365)
    };
  }

  calculateSolarEnvironmentalImpact(dailyEnergy) {
    const co2Factor = 0.82; // kg CO2 per kWh grid electricity
    const dailyCO2Saved = dailyEnergy * co2Factor;
    return {
      dailyCO2Saved: Math.round(dailyCO2Saved * 10) / 10,
      yearlyCO2Saved: Math.round(dailyCO2Saved * 365),
      treesEquivalent: Math.round(dailyCO2Saved * 365 / 20)
    };
  }

  findOptimalChargingWindow(pricingSchedule, currentHour) {
    // Find the cheapest and greenest time slot
    let bestWindow = pricingSchedule[0];
    let bestScore = 0;
    
    pricingSchedule.forEach(window => {
      // Score based on low cost and high renewable percentage
      const score = (10 - window.rate) + (window.renewable / 10);
      if (score > bestScore) {
        bestScore = score;
        bestWindow = window;
      }
    });
    
    return {
      startTime: bestWindow.hours[0] + ':00',
      endTime: bestWindow.hours[bestWindow.hours.length - 1] + ':59',
      rate: bestWindow.rate,
      renewable: bestWindow.renewable,
      recommendation: `Charge during ${bestWindow.type} for best rates and green energy`
    };
  }

  getBatteryHealthRecommendations(health) {
    if (health > 90) return ['Excellent battery health!', 'Continue current charging habits'];
    if (health > 80) return ['Good battery health', 'Avoid charging to 100% daily'];
    if (health > 70) return ['Fair battery health', 'Consider battery conditioning', 'Avoid fast charging when possible'];
    return ['Poor battery health', 'Consider battery replacement', 'Use slow charging only'];
  }

  getCarbonRecommendation(emissions, distance) {
    const emissionPerKm = emissions / distance;
    if (emissionPerKm < 0.05) return 'EXCELLENT - Very low carbon footprint';
    if (emissionPerKm < 0.1) return 'GOOD - Below average emissions';
    if (emissionPerKm < 0.2) return 'MODERATE - Consider greener options';
    return 'HIGH - Switch to EV or public transport';
  }

  getUserTrips(userId, period) {
    // Simulated trip data
    return [
      { distance: 25, vehicleType: 'CAR', fuelType: 'PETROL', speed: 60, traffic: 'moderate' },
      { distance: 15, vehicleType: 'EV', fuelType: 'EV_SOLAR', speed: 50, traffic: 'light' },
      { distance: 40, vehicleType: 'CAR', fuelType: 'PETROL', speed: 80, traffic: 'heavy' },
      { distance: 30, vehicleType: 'EV', fuelType: 'EV_GRID', speed: 70, traffic: 'moderate' }
    ];
  }

  suggestCarbonImprovements(totalEmissions, tripCount) {
    const avgEmission = totalEmissions / tripCount;
    const suggestions = [];
    
    if (avgEmission > 5) suggestions.push('Switch to EV for 70% emission reduction');
    if (avgEmission > 3) suggestions.push('Use public transport for short trips');
    if (avgEmission > 2) suggestions.push('Consider carpooling');
    suggestions.push('Offset remaining emissions through tree planting');
    
    return suggestions;
  }

  getUserCarbonRanking(emissions) {
    if (emissions < 50) return { rank: 'TOP 10%', badge: 'ECO_CHAMPION' };
    if (emissions < 100) return { rank: 'TOP 25%', badge: 'GREEN_WARRIOR' };
    if (emissions < 200) return { rank: 'AVERAGE', badge: 'ECO_CONSCIOUS' };
    return { rank: 'BOTTOM 25%', badge: 'NEEDS_IMPROVEMENT' };
  }

  calculateApplianceConsumption(appliances) {
    let total = 0;
    appliances.forEach(appliance => {
      const consumption = {
        'AC': 150,
        'REFRIGERATOR': 100,
        'WASHING_MACHINE': 50,
        'TV': 30,
        'LIGHTS': 20
      };
      total += consumption[appliance.type] || 0;
    });
    return total;
  }

  calculateHomeSolarPotential(size, location) {
    const roofArea = size * 0.7; // 70% of home size available for solar
    const solarCapacity = roofArea * 0.15; // 150W per sq ft
    const monthlyGeneration = solarCapacity * 4 * 30; // 4 hours average sun
    
    return {
      roofArea: Math.round(roofArea),
      solarCapacity: Math.round(solarCapacity / 1000 * 10) / 10, // kW
      monthlyGeneration: Math.round(monthlyGeneration),
      cost: Math.round(solarCapacity * 50), // ₹50 per watt
      payback: '5-7 years'
    };
  }

  getEfficiencyRating(efficiency) {
    if (efficiency > 0.9) return 'A+';
    if (efficiency > 0.8) return 'A';
    if (efficiency > 0.7) return 'B';
    if (efficiency > 0.6) return 'C';
    return 'D';
  }

  calculateEcoLevel(points) {
    if (points > 10000) return { level: 10, title: 'ECO_MASTER', nextLevel: 15000 };
    if (points > 5000) return { level: 8, title: 'GREEN_CHAMPION', nextLevel: 10000 };
    if (points > 2000) return { level: 5, title: 'ECO_WARRIOR', nextLevel: 5000 };
    if (points > 500) return { level: 3, title: 'GREEN_STARTER', nextLevel: 2000 };
    return { level: 1, title: 'ECO_BEGINNER', nextLevel: 500 };
  }

  getEarnedBadges(userActions) {
    const badges = [];
    const actionCounts = {};
    
    userActions.forEach(action => {
      actionCounts[action.type] = (actionCounts[action.type] || 0) + 1;
    });
    
    if (actionCounts['EV_TRIP'] >= 10) badges.push('EV_PIONEER');
    if (actionCounts['SOLAR_CHARGING'] >= 5) badges.push('SOLAR_HERO');
    if (actionCounts['CYCLING'] >= 20) badges.push('PEDAL_POWER');
    if (actionCounts['CARBON_OFFSET'] >= 3) badges.push('PLANET_PROTECTOR');
    
    return badges;
  }

  getLeaderboardPosition(points) {
    // Simulated leaderboard
    if (points > 8000) return { position: 1, percentile: 99 };
    if (points > 5000) return { position: 15, percentile: 95 };
    if (points > 2000) return { position: 150, percentile: 80 };
    return { position: 500, percentile: 50 };
  }

  getNextReward(points) {
    if (points < 500) return { reward: 'Green Starter Badge', pointsNeeded: 500 - points };
    if (points < 2000) return { reward: 'Eco Warrior Badge', pointsNeeded: 2000 - points };
    if (points < 5000) return { reward: 'Green Champion Badge', pointsNeeded: 5000 - points };
    return { reward: 'Eco Master Badge', pointsNeeded: 10000 - points };
  }

  getActionDescription(actionType) {
    const descriptions = {
      'EV_TRIP': 'Zero emission travel',
      'SOLAR_CHARGING': '100% renewable energy',
      'CARPOOLING': 'Shared mobility',
      'PUBLIC_TRANSPORT': 'Efficient mass transit',
      'CYCLING': 'Human-powered transport',
      'CARBON_OFFSET': 'Climate action',
      'RENEWABLE_ENERGY': 'Clean energy choice'
    };
    return descriptions[actionType] || 'Green action';
  }
}

module.exports = GreenEnergySystem;

// Made with Bob
