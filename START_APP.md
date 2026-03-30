# 🚀 How to Start SurviveRoute AI

## 📍 Option 1: Run Locally (Recommended for Testing)

### Prerequisites
- Node.js installed (v14 or higher)
- npm or yarn installed

### Step-by-Step Instructions

#### 1️⃣ Install Dependencies
```bash
# Navigate to project directory
cd /Users/gajendra/Documents/GitHub/Automation-of-All

# Install all dependencies (this will take 2-3 minutes)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

#### 2️⃣ Start the Backend Server
```bash
# Open a terminal and run:
node backend/server.js
```

You should see:
```
🚀 SurviveRoute AI Backend running on port 5000
📍 Health check: http://localhost:5000/api/health
```

#### 3️⃣ Start the Frontend (Open New Terminal)
```bash
# Open a NEW terminal window and run:
cd frontend
npm start
```

The app will automatically open in your browser at:
**http://localhost:3000**

### ✅ You're Running!

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🌐 Option 2: Deploy to Web (Free Hosting)

### A. Deploy Frontend to Vercel (Free)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy Frontend
```bash
cd frontend
vercel login
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **surviveroute-ai**
- Directory? **./build**

Your app will be live at: `https://surviveroute-ai.vercel.app`

### B. Deploy Backend to Railway (Free)

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Deploy Backend
```bash
railway login
railway init
railway up
```

Your API will be live at: `https://your-app.railway.app`

#### Step 3: Update Frontend to Use Production API
Edit `frontend/src/App.js` and update API calls to use your Railway URL.

---

## 🎯 Quick Test Commands

### Test Backend is Running
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"OK","message":"SurviveRoute AI Backend is running"}
```

### Test Prediction API
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
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
    "terrain": "flat"
  }'
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install
```

### Backend Not Starting
```bash
# Check if Node.js is installed
node --version

# Should show v14 or higher
# If not, install from: https://nodejs.org
```

### Frontend Not Starting
```bash
# Make sure you're in the frontend directory
cd frontend

# Check package.json exists
ls package.json

# Install dependencies
npm install

# Start
npm start
```

---

## 📱 Access the App

### On Your Computer
- Open browser: **http://localhost:3000**

### On Your Phone (Same WiFi)
1. Find your computer's IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. On your phone's browser, go to:
   **http://YOUR_IP_ADDRESS:3000**
   
   Example: `http://192.168.1.100:3000`

---

## 🎉 First Time Usage

1. **Open** http://localhost:3000
2. **Click** "Try Demo (No Registration)"
3. **Go to** Vehicle Setup
4. **Select** your vehicle type
5. **Return to** Dashboard
6. **Adjust** fuel level slider
7. **See** predictions!

---

## 🔄 Stopping the App

### Stop Backend
- Press `Ctrl + C` in the backend terminal

### Stop Frontend
- Press `Ctrl + C` in the frontend terminal

---

## 💾 Saving Your Work

### Create Git Repository
```bash
git init
git add .
git commit -m "Initial commit - SurviveRoute AI"
```

### Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/surviveroute-ai.git
git branch -M main
git push -u origin main
```

---

## 🌟 What's Next?

### For Local Development
- ✅ App is running on your computer
- ✅ Make changes and see them live
- ✅ Test all features
- ✅ Customize as needed

### For Production Deployment
- ✅ Follow DEPLOYMENT.md for detailed instructions
- ✅ Deploy to Vercel (frontend) + Railway (backend)
- ✅ Get your own domain
- ✅ Launch to users!

---

## 📞 Need Help?

### Check Documentation
- **README.md** - Full documentation
- **USER_GUIDE.md** - How to use the app
- **DEPLOYMENT.md** - Production deployment
- **QUICK_START.md** - Quick reference

### Common Issues
1. **Port in use**: Kill the process and restart
2. **Dependencies error**: Delete node_modules and reinstall
3. **API not responding**: Check backend is running
4. **Map not loading**: Check internet connection

---

## ✅ Verification Checklist

Before using the app, verify:

- [ ] Node.js installed (run `node --version`)
- [ ] Dependencies installed (run `npm install`)
- [ ] Backend running (check http://localhost:5000/api/health)
- [ ] Frontend running (check http://localhost:3000)
- [ ] No error messages in terminals
- [ ] Browser opens automatically

---

**🎊 Congratulations! Your app is now running!**

Enjoy using SurviveRoute AI - Never get stranded again! 🚗💨