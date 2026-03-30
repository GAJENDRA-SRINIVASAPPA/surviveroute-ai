# 🚀 Deployment Guide - SurviveRoute AI

This guide covers deploying SurviveRoute AI to production environments.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Setup](#database-setup)
6. [Domain & SSL](#domain--ssl)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Prerequisites

### Required Accounts
- [ ] GitHub account
- [ ] Vercel/Netlify account (for frontend)
- [ ] Railway/Heroku/AWS account (for backend)
- [ ] MongoDB Atlas account (for database)
- [ ] Domain registrar account (optional)

### Required Tools
- Node.js v14+
- Git
- npm or yarn

---

## 🔧 Environment Setup

### 1. Environment Variables

Create production environment files:

**Backend (.env.production):**
```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surviveroute
DB_NAME=surviveroute

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
MAPBOX_API_KEY=your-mapbox-api-key

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# App URLs
FRONTEND_URL=https://surviveroute.com
BACKEND_URL=https://api.surviveroute.com

# Security
CORS_ORIGIN=https://surviveroute.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

**Frontend (.env.production):**
```env
REACT_APP_API_URL=https://api.surviveroute.com
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
REACT_APP_GOOGLE_MAPS_KEY=your-google-maps-key
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Step 1: Prepare for Deployment**
```bash
cd frontend
npm run build
```

**Step 2: Deploy via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Step 3: Configure Vercel**
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all frontend environment variables
5. Redeploy

**Vercel Configuration (vercel.json):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Option 2: Netlify

**Step 1: Build**
```bash
cd frontend
npm run build
```

**Step 2: Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  REACT_APP_API_URL = "https://api.surviveroute.com"
```

---

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

**Step 1: Prepare Backend**
```bash
# Ensure package.json has start script
"scripts": {
  "start": "node backend/server.js"
}
```

**Step 2: Deploy to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Step 3: Configure Railway**
1. Go to Railway Dashboard
2. Select your project
3. Variables → Add all backend environment variables
4. Settings → Generate Domain

**Railway Configuration (railway.json):**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Option 2: Heroku

**Step 1: Create Heroku App**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create surviveroute-api

# Add buildpack
heroku buildpacks:set heroku/nodejs
```

**Step 2: Configure**
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
# ... add all other variables

# Deploy
git push heroku main
```

**Procfile:**
```
web: node backend/server.js
```

### Option 3: AWS EC2

**Step 1: Launch EC2 Instance**
- Ubuntu 20.04 LTS
- t2.micro (free tier) or larger
- Configure security groups (ports 22, 80, 443, 5000)

**Step 2: Connect and Setup**
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/yourusername/surviveroute-ai.git
cd surviveroute-ai

# Install dependencies
npm install

# Setup environment
cp backend/.env.example backend/.env
nano backend/.env  # Edit with production values

# Start with PM2
pm2 start backend/server.js --name surviveroute-api
pm2 startup
pm2 save
```

**Step 3: Setup Nginx**
```bash
# Install Nginx
sudo apt install nginx -y

# Configure Nginx
sudo nano /etc/nginx/sites-available/surviveroute
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.surviveroute.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/surviveroute /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

**Step 1: Create Cluster**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Choose region closest to your backend
4. Wait for cluster creation

**Step 2: Configure Access**
1. Database Access → Add Database User
2. Network Access → Add IP Address (0.0.0.0/0 for production)
3. Get connection string

**Step 3: Initialize Database**
```javascript
// Run this script once to setup collections
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

// Create collections
const collections = [
  'users',
  'vehicles',
  'stations',
  'professionals',
  'emergencies',
  'requests'
];

collections.forEach(async (name) => {
  await mongoose.connection.createCollection(name);
  console.log(`Created collection: ${name}`);
});
```

### PostgreSQL (Alternative)

**Using Supabase:**
1. Create project at [Supabase](https://supabase.com)
2. Get connection string
3. Update backend to use PostgreSQL

---

## 🌍 Domain & SSL

### Domain Setup

**Step 1: Purchase Domain**
- Namecheap, GoDaddy, or Google Domains
- Recommended: surviveroute.com

**Step 2: Configure DNS**

**For Frontend (Vercel/Netlify):**
```
Type: A
Name: @
Value: [Vercel/Netlify IP]

Type: CNAME
Name: www
Value: [your-app].vercel.app
```

**For Backend:**
```
Type: A
Name: api
Value: [Your Backend IP]
```

### SSL Certificate

**Vercel/Netlify:**
- Automatic SSL (Let's Encrypt)
- No configuration needed

**AWS/Custom Server:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.surviveroute.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Maintenance

### Application Monitoring

**1. PM2 Monitoring (for Node.js)**
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart app
pm2 restart surviveroute-api
```

**2. Error Tracking**
- Use [Sentry](https://sentry.io)
- Add to both frontend and backend

**Frontend (React):**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

**Backend (Node.js):**
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

**3. Uptime Monitoring**
- Use [UptimeRobot](https://uptimerobot.com)
- Monitor both frontend and backend
- Set up alerts

### Performance Monitoring

**1. Google Analytics**
```html
<!-- Add to frontend/public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**2. Backend Metrics**
```javascript
// Add to backend/server.js
const responseTime = require('response-time');
app.use(responseTime());
```

### Backup Strategy

**1. Database Backups**
```bash
# MongoDB Atlas: Automatic backups enabled
# Manual backup:
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)
```

**2. Code Backups**
- GitHub repository (already done)
- Tag releases: `git tag v1.0.0`

### Security

**1. Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

**2. Helmet (Security Headers)**
```javascript
const helmet = require('helmet');
app.use(helmet());
```

**3. CORS Configuration**
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Maintenance Checklist

**Daily:**
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review user feedback

**Weekly:**
- [ ] Check database performance
- [ ] Review API response times
- [ ] Update dependencies (if needed)

**Monthly:**
- [ ] Security audit
- [ ] Performance optimization
- [ ] Backup verification
- [ ] Cost analysis

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

---

## 📞 Support

**Deployment Issues:**
- Check logs first
- Verify environment variables
- Test locally with production settings
- Contact platform support

**Need Help?**
- Email: devops@surviveroute.ai
- Documentation: https://docs.surviveroute.ai
- Community: https://community.surviveroute.ai

---

## ✅ Post-Deployment Checklist

- [ ] Frontend accessible at domain
- [ ] Backend API responding
- [ ] Database connected
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Monitoring tools configured
- [ ] Backups scheduled
- [ ] Error tracking active
- [ ] Performance acceptable
- [ ] Security headers enabled
- [ ] Rate limiting active
- [ ] Documentation updated

---

**🎉 Congratulations! Your app is now live!**

Monitor closely for the first 24-48 hours and be ready to respond to any issues.

---

*Last Updated: March 2026*
*Version: 1.0.0*