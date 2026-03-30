# 🚗 SurviveRoute AI

**Never get stranded. Smart navigation & emergency assistance.**

SurviveRoute AI is a comprehensive survival navigation system that combines intelligent fuel prediction, offline maps, emergency assistance, and a professional marketplace to ensure you never get stranded on the road.

---

## 🌟 Key Features

### 1. **Intelligent Fuel Prediction Engine**
- Real-time fuel range calculation based on multiple factors
- Considers traffic, terrain, driving style, vehicle load, and weather
- Provides safe range with 30% safety buffer
- Confidence score for journey completion
- Risk level indicators (SAFE, CAUTION, WARNING, DANGER)

### 2. **Offline Navigation**
- Works without internet connectivity
- Downloadable map regions
- Cached fuel/EV station data
- Dead zone warnings
- Smart rerouting suggestions

### 3. **Emergency Assistance System**
- One-tap SOS alerts
- Emergency service requests (fuel, mechanic, tow, medical)
- Real-time helper tracking
- SMS fallback for low connectivity
- Emergency contact management

### 4. **Professional Marketplace**
- Verified mechanics, tow services, fuel delivery
- Rating and review system
- Distance-based sorting
- Direct calling and service requests
- Professional registration portal

### 5. **AI Travel Assistant**
- Conversational interface
- Context-aware recommendations
- Quick question templates
- Safety tips and guidance
- Route planning assistance

### 6. **Multi-Vehicle Support**
- Bikes, Cars, SUVs, Trucks, Buses, EVs
- Custom mileage settings
- Driving style profiles (Eco, Normal, Aggressive, Sport)
- Vehicle-specific predictions

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/surviveroute-ai.git
cd surviveroute-ai
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Set up environment variables**
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

4. **Start the application**

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Or run separately:**

Backend:
```bash
npm run server
```

Frontend:
```bash
npm run client
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📁 Project Structure

```
surviveroute-ai/
├── backend/
│   ├── routes/           # API route handlers
│   │   ├── predict.route.js
│   │   ├── vehicle.route.js
│   │   ├── emergency.route.js
│   │   ├── station.route.js
│   │   ├── professional.route.js
│   │   └── auth.route.js
│   ├── utils/
│   │   └── fuelEngine.js # Core prediction algorithm
│   ├── server.js         # Express server
│   └── .env.example      # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── VehicleSetup.js
│   │   │   ├── MapView.js
│   │   │   ├── Emergency.js
│   │   │   ├── Marketplace.js
│   │   │   ├── AIAssistant.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── package.json          # Root package.json
└── README.md
```

---

## 🔧 API Documentation

### Prediction API

**POST /api/predict**
Calculate fuel range and risk prediction

Request:
```json
{
  "fuelLevel": 50,
  "vehicle": {
    "type": "car",
    "fuelType": "petrol",
    "mileage": 15,
    "tankCapacity": 40,
    "drivingStyle": "normal"
  },
  "distance": 120,
  "traffic": "moderate",
  "terrain": "uphill"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "baseRange": 300,
    "adjustedRange": 240,
    "safeRange": 168,
    "risk": "CAUTION",
    "riskScore": 70,
    "confidence": 0.74,
    "recommendations": [...]
  }
}
```

### Vehicle API

**POST /api/vehicle** - Add vehicle
**GET /api/vehicle** - Get user vehicles
**GET /api/vehicle/:id** - Get specific vehicle
**PUT /api/vehicle/:id** - Update vehicle
**DELETE /api/vehicle/:id** - Delete vehicle

### Emergency API

**POST /api/emergency** - Create emergency request
**GET /api/emergency/:id** - Get request status
**POST /api/emergency/sos** - Send SOS alert

### Station API

**GET /api/station/nearby** - Get nearby stations
**GET /api/station/safe-on-route** - Get safe stations on route
**GET /api/station/:id** - Get station details

### Professional API

**GET /api/professional/nearby** - Get nearby professionals
**POST /api/professional/register** - Register as professional
**PUT /api/professional/:id/availability** - Update availability

---

## 🎯 Usage Guide

### 1. First Time Setup

1. **Register/Login**
   - Create an account or use demo mode
   - No credit card required

2. **Set Up Your Vehicle**
   - Go to Vehicle Setup
   - Select vehicle type (bike, car, SUV, truck, bus, EV)
   - Enter mileage and tank capacity
   - Choose driving style

3. **Configure Dashboard**
   - Set current fuel level
   - Enter destination distance
   - Select traffic and terrain conditions

### 2. Daily Usage

**Check Fuel Range:**
- Dashboard shows real-time predictions
- Safe range with confidence score
- Risk level indicators

**Find Fuel Stations:**
- Map View shows nearby stations
- Filter by type (petrol/EV)
- See prices and ratings

**Emergency Situations:**
- Press SOS for immediate alerts
- Request fuel delivery, mechanic, or tow
- Track helper arrival

**Get AI Assistance:**
- Ask questions about your journey
- Get personalized recommendations
- Safety tips and guidance

### 3. Professional Features

**For Service Providers:**
- Register as a professional
- Set availability status
- Receive service requests
- Build reputation through ratings

---

## 🧠 Fuel Prediction Algorithm

The core prediction engine considers:

1. **Base Calculation**
   - Fuel Level × Tank Capacity × Mileage

2. **Adjustment Factors**
   - Traffic: -30% to +5%
   - Terrain: -25% to +5%
   - Driving Style: -35% to +10%
   - Vehicle Load: -40% to 0%
   - Weather: -15% to 0%
   - AC Usage: -8%
   - Vehicle Type: -15% to +10%

3. **Safety Buffer**
   - Safe Range = Adjusted Range × 0.7

4. **Risk Assessment**
   - SAFE: Safe range > 1.5× distance
   - CAUTION: Safe range > 1.0× distance
   - WARNING: Safe range > 0.8× distance
   - DANGER: Safe range < 0.8× distance

---

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'build' folder
```

### Backend Deployment (Railway/Heroku/AWS)

```bash
# Set environment variables
PORT=5000
NODE_ENV=production

# Start server
npm start
```

### Environment Variables

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🔐 Security Features

- Password hashing (bcrypt)
- JWT authentication
- Input validation
- Rate limiting (recommended)
- CORS configuration
- Environment variable protection

---

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Fuel prediction engine
- ✅ Offline navigation
- ✅ Emergency assistance
- ✅ Professional marketplace
- ✅ AI assistant

### Phase 2 (Next 3 months)
- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Real-time GPS tracking
- [ ] Push notifications
- [ ] Payment integration
- [ ] Mobile app (React Native)

### Phase 3 (6-12 months)
- [ ] Government API integrations
- [ ] Highway toll integration
- [ ] Insurance partnerships
- [ ] Fleet management features
- [ ] Analytics dashboard

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

- **Product Lead**: [Your Name]
- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Your Name]
- **AI/ML Engineer**: [Your Name]

---

## 📞 Support

- **Email**: support@surviveroute.ai
- **Website**: https://surviveroute.ai
- **Documentation**: https://docs.surviveroute.ai
- **Community**: https://community.surviveroute.ai

---

## 🙏 Acknowledgments

- OpenStreetMap for map data
- Leaflet for map rendering
- React community for amazing tools
- All contributors and testers

---

## ⚠️ Disclaimer

This application provides estimates based on various factors. Actual fuel consumption may vary. Always maintain adequate fuel levels and plan your journeys responsibly. In case of emergency, contact local emergency services immediately.

---

**Made with ❤️ for safer journeys**

🚗 **SurviveRoute AI** - Never get stranded again!