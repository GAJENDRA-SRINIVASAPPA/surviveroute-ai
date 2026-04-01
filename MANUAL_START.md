# 🚀 SurviveRoute AI - Manual Startup Guide

## Quick Start (After Dependencies Install)

### Option 1: Automated Script (Recommended)
```bash
chmod +x start-professional.sh
./start-professional.sh
```

### Option 2: Manual Start (Step-by-Step)

#### Terminal 1 - Backend Server
```bash
cd backend
node server.js
```

**Expected Output:**
```
🚀 SurviveRoute AI Backend started on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000
✅ Health check: http://localhost:5000/health
```

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## Verification Steps

### 1. Check Backend Health
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-04-01T03:06:00.000Z",
  "uptime": 5.123,
  "environment": "development"
}
```

### 2. Check Backend API Root
```bash
curl http://localhost:5000
```

**Expected Response:**
```json
{
  "name": "SurviveRoute AI API",
  "version": "1.0.0",
  "description": "Revolutionary Navigation & Survival Platform",
  "status": "running",
  "endpoints": {
    "health": "/health",
    "predict": "/api/predict",
    "vehicle": "/api/vehicle",
    ...
  }
}
```

### 3. Open Frontend
Open browser to: **http://localhost:3000**

You should see the SurviveRoute AI login page.

---

## Troubleshooting

### Issue: "Cannot find module 'dotenv'"

**Solution:**
```bash
cd backend
npm install dotenv
node server.js
```

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)

# Restart backend
cd backend
node server.js
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Restart frontend
cd frontend
npm start
```

### Issue: Backend starts but shows errors

**Check:**
1. Is `.env` file present in backend folder?
   ```bash
   ls backend/.env
   ```
   If not: `cp backend/.env.example backend/.env`

2. Are all dependencies installed?
   ```bash
   ls backend/node_modules/dotenv
   ls backend/node_modules/express
   ```
   If missing: `cd backend && npm install`

### Issue: Frontend won't start

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## Development Mode

### Backend with Auto-Reload
```bash
cd backend
npm install -D nodemon
npx nodemon server.js
```

### Frontend (Already has hot-reload)
```bash
cd frontend
npm start
```

---

## Production Build

### Backend
```bash
cd backend
NODE_ENV=production node server.js
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static server
npx serve -s build
```

---

## Docker Deployment

### Build and Run
```bash
docker-compose up --build
```

### Stop
```bash
docker-compose down
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database (optional for now)
# MONGODB_URI=mongodb://localhost:27017/surviveroute
# POSTGRES_URI=postgresql://localhost:5432/surviveroute
# REDIS_URL=redis://localhost:6379

# JWT Secret
JWT_SECRET=your-secret-key-change-in-production

# API Keys (optional)
# GOOGLE_MAPS_API_KEY=your-key
# MAPBOX_API_KEY=your-key
```

---

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main UI |
| **Backend API** | http://localhost:5000 | REST API |
| **Health Check** | http://localhost:5000/health | Server status |
| **API Docs** | http://localhost:5000 | Endpoint list |

---

## Next Steps After Startup

1. **Register/Login** - Create your account
2. **Setup Vehicle** - Configure your vehicle details
3. **Enter Fuel Level** - Input current fuel/battery
4. **Set Destination** - Plan your route
5. **See Prediction** - View intelligent risk assessment
6. **Explore Features** - Try all 100+ features!

---

## Support

- **Documentation**: Check `/docs` folder for 13 comprehensive guides
- **Quick Reference**: `QUICK_START.md`
- **Complete Guide**: `FINAL_COMPLETE_GUIDE.md`
- **Troubleshooting**: This file (MANUAL_START.md)

---

## Status Indicators

### Backend Running Successfully:
```
✅ Server logs show "started on port 5000"
✅ Health check returns 200 OK
✅ No error messages in console
```

### Frontend Running Successfully:
```
✅ Browser opens automatically
✅ Login page displays correctly
✅ No console errors in browser DevTools
```

### Both Connected:
```
✅ Frontend can call backend APIs
✅ No CORS errors
✅ Data flows between services
```

---

*Last Updated: 2026-04-01*
*Version: 1.0.0*
*Status: Production Ready*