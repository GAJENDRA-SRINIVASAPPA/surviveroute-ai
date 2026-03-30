# 🏢 PROFESSIONAL SETUP GUIDE
## Enterprise-Grade Multi-Repository Architecture

---

## 📋 Repository Structure

### **Monorepo vs Multi-Repo Decision**

For SurviveRoute AI's scale, we use a **hybrid approach**:
- **Main Monorepo:** Core application (faster development)
- **Separate Repos:** Independent services (better scalability)

---

## 🗂️ Repository Organization

```
SurviveRoute-AI-Platform/
│
├── 📦 surviveroute-core/              # Main application monorepo
│   ├── backend/                       # Node.js backend
│   ├── frontend/                      # React frontend
│   ├── shared/                        # Shared types/utils
│   └── docs/                          # Documentation
│
├── 📦 surviveroute-ai-engine/         # AI/ML microservice
│   ├── models/                        # ML models
│   ├── training/                      # Training scripts
│   └── api/                           # ML API
│
├── 📦 surviveroute-blockchain/        # Blockchain service
│   ├── contracts/                     # Smart contracts
│   ├── nodes/                         # Blockchain nodes
│   └── api/                           # Blockchain API
│
├── 📦 surviveroute-iot/               # IoT integration service
│   ├── device-sdk/                    # Device SDK
│   ├── gateway/                       # IoT gateway
│   └── api/                           # IoT API
│
├── 📦 surviveroute-green-energy/      # Green energy service
│   ├── solar/                         # Solar calculations
│   ├── carbon/                        # Carbon tracking
│   └── api/                           # Green API
│
├── 📦 surviveroute-adaptive/          # Adaptive system service
│   ├── plugins/                       # Plugin system
│   ├── evolution/                     # Self-evolution
│   └── api/                           # Adaptive API
│
├── 📦 surviveroute-mobile/            # Mobile apps
│   ├── ios/                           # iOS app
│   ├── android/                       # Android app
│   └── shared/                        # Shared code
│
├── 📦 surviveroute-infrastructure/    # Infrastructure as Code
│   ├── terraform/                     # Terraform configs
│   ├── kubernetes/                    # K8s manifests
│   └── monitoring/                    # Monitoring setup
│
└── 📦 surviveroute-sdk/               # Developer SDK
    ├── javascript/                    # JS SDK
    ├── python/                        # Python SDK
    └── docs/                          # SDK docs
```

---

## 🔧 Core Repository Setup

### **1. surviveroute-core/**

```
surviveroute-core/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Continuous Integration
│   │   ├── cd.yml                    # Continuous Deployment
│   │   └── security.yml              # Security scanning
│   └── CODEOWNERS                    # Code ownership
│
├── backend/
│   ├── src/
│   │   ├── config/                   # Configuration
│   │   │   ├── database.config.js
│   │   │   ├── redis.config.js
│   │   │   └── app.config.js
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── rateLimit.middleware.js
│   │   │   └── logging.middleware.js
│   │   │
│   │   ├── routes/                   # API routes
│   │   │   ├── v1/                   # API v1
│   │   │   │   ├── predict.route.js
│   │   │   │   ├── vehicle.route.js
│   │   │   │   └── ...
│   │   │   └── v2/                   # API v2 (future)
│   │   │
│   │   ├── controllers/              # Business logic
│   │   │   ├── predict.controller.js
│   │   │   ├── vehicle.controller.js
│   │   │   └── ...
│   │   │
│   │   ├── services/                 # Service layer
│   │   │   ├── fuel.service.js
│   │   │   ├── ai.service.js
│   │   │   └── ...
│   │   │
│   │   ├── models/                   # Database models
│   │   │   ├── user.model.js
│   │   │   ├── vehicle.model.js
│   │   │   └── ...
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   ├── logger.js
│   │   │   ├── validator.js
│   │   │   ├── encryption.js
│   │   │   └── ...
│   │   │
│   │   ├── validators/               # Input validation
│   │   │   ├── predict.validator.js
│   │   │   ├── vehicle.validator.js
│   │   │   └── ...
│   │   │
│   │   ├── types/                    # TypeScript types
│   │   │   ├── api.types.ts
│   │   │   ├── models.types.ts
│   │   │   └── ...
│   │   │
│   │   └── server.js                 # Main server file
│   │
│   ├── tests/                        # Tests
│   │   ├── unit/                     # Unit tests
│   │   ├── integration/              # Integration tests
│   │   └── e2e/                      # End-to-end tests
│   │
│   ├── .env.example                  # Environment template
│   ├── .eslintrc.js                  # ESLint config
│   ├── .prettierrc                   # Prettier config
│   ├── jest.config.js                # Jest config
│   ├── package.json
│   └── tsconfig.json                 # TypeScript config
│
├── frontend/
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── common/               # Shared components
│   │   │   ├── dashboard/
│   │   │   ├── map/
│   │   │   └── ...
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   │
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useFuel.ts
│   │   │   └── ...
│   │   │
│   │   ├── services/                 # API services
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   └── ...
│   │   │
│   │   ├── store/                    # State management
│   │   │   ├── slices/               # Redux slices
│   │   │   └── store.ts
│   │   │
│   │   ├── utils/                    # Utilities
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── ...
│   │   │
│   │   ├── types/                    # TypeScript types
│   │   │   ├── api.types.ts
│   │   │   └── ...
│   │   │
│   │   ├── styles/                   # Global styles
│   │   │   ├── globals.css
│   │   │   └── theme.ts
│   │   │
│   │   ├── App.tsx                   # Main app
│   │   └── index.tsx                 # Entry point
│   │
│   ├── public/                       # Static assets
│   ├── tests/                        # Tests
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts                # Vite config
│
├── shared/                           # Shared code
│   ├── types/                        # Shared types
│   ├── constants/                    # Shared constants
│   └── utils/                        # Shared utilities
│
├── docs/                             # Documentation
│   ├── api/                          # API docs
│   ├── architecture/                 # Architecture docs
│   └── guides/                       # User guides
│
├── scripts/                          # Utility scripts
│   ├── setup.sh                      # Setup script
│   ├── deploy.sh                     # Deployment script
│   └── migrate.sh                    # Migration script
│
├── .gitignore
├── .nvmrc                            # Node version
├── docker-compose.yml                # Docker compose
├── Dockerfile.backend                # Backend Docker
├── Dockerfile.frontend               # Frontend Docker
├── lerna.json                        # Lerna config (monorepo)
├── package.json                      # Root package.json
├── README.md
└── turbo.json                        # Turborepo config
```

---

## 🛡️ Error Handling & Validation

### **1. Global Error Handler**

```javascript
// backend/src/middleware/error.middleware.js

class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Server Error',
      statusCode: error.statusCode || 500,
      timestamp: error.timestamp,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = { AppError, errorHandler };
```

### **2. Input Validation**

```javascript
// backend/src/validators/predict.validator.js

const Joi = require('joi');

const predictSchema = Joi.object({
  fuelLevel: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      'number.base': 'Fuel level must be a number',
      'number.min': 'Fuel level cannot be negative',
      'number.max': 'Fuel level cannot exceed 100%',
      'any.required': 'Fuel level is required'
    }),
  
  vehicle: Joi.object({
    type: Joi.string()
      .valid('car', 'bike', 'truck', 'bus', 'ev')
      .required(),
    mileage: Joi.number().min(1).max(100).required(),
    tankCapacity: Joi.number().min(1).max(200).required()
  }).required(),
  
  distance: Joi.number()
    .min(0)
    .max(10000)
    .required(),
  
  traffic: Joi.string()
    .valid('light', 'moderate', 'heavy')
    .default('moderate'),
  
  terrain: Joi.string()
    .valid('flat', 'uphill', 'downhill')
    .default('flat')
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors
        }
      });
    }

    req.validatedData = value;
    next();
  };
};

module.exports = { predictSchema, validate };
```

### **3. Rate Limiting**

```javascript
// backend/src/middleware/rateLimit.middleware.js

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../config/redis.config');

const createRateLimiter = (options = {}) => {
  return rateLimit({
    store: new RedisStore({
      client: redis,
      prefix: 'rl:'
    }),
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options.max || 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: {
        message: 'Too many requests, please try again later',
        retryAfter: options.windowMs / 1000
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for whitelisted IPs
      const whitelist = process.env.RATE_LIMIT_WHITELIST?.split(',') || [];
      return whitelist.includes(req.ip);
    }
  });
};

// Different rate limits for different endpoints
const apiLimiter = createRateLimiter({ max: 100 });
const authLimiter = createRateLimiter({ max: 5, windowMs: 15 * 60 * 1000 });
const strictLimiter = createRateLimiter({ max: 10, windowMs: 60 * 1000 });

module.exports = { apiLimiter, authLimiter, strictLimiter };
```

---

## 🔐 Security Implementation

### **1. Authentication Middleware**

```javascript
// backend/src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');
const { AppError } = require('./error.middleware');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookie
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user still exists
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        throw new AppError('User no longer exists', 401);
      }

      // Check if user changed password after token was issued
      if (user.changedPasswordAfter(decoded.iat)) {
        throw new AppError('Password recently changed, please log in again', 401);
      }

      req.user = user;
      next();
    } catch (err) {
      throw new AppError('Invalid token', 401);
    }
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`User role ${req.user.role} is not authorized`, 403)
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
```

### **2. Data Sanitization**

```javascript
// backend/src/middleware/sanitize.middleware.js

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const sanitizeMiddleware = (app) => {
  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp({
    whitelist: ['duration', 'price', 'rating'] // allowed duplicates
  }));
};

module.exports = sanitizeMiddleware;
```

---

## 📊 Logging & Monitoring

### **1. Winston Logger**

```javascript
// backend/src/utils/logger.js

const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'surviveroute-api' },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Write all logs with level 'error' to error.log
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

// Create a stream object for Morgan
logger.stream = {
  write: (message) => logger.info(message.trim())
};

module.exports = logger;
```

### **2. Request Logging**

```javascript
// backend/src/middleware/logging.middleware.js

const morgan = require('morgan');
const logger = require('../utils/logger');

// Custom token for response time
morgan.token('response-time-ms', (req, res) => {
  if (!req._startTime) return '0';
  const diff = process.hrtime(req._startTime);
  return (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
});

// Custom format
const morganFormat = ':method :url :status :response-time-ms ms - :res[content-length]';

const requestLogger = morgan(morganFormat, {
  stream: logger.stream,
  skip: (req) => req.url === '/health' // Skip health checks
});

module.exports = requestLogger;
```

---

## 🧪 Testing Setup

### **1. Jest Configuration**

```javascript
// backend/jest.config.js

module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 10000
};
```

### **2. Test Examples**

```javascript
// backend/tests/unit/services/fuel.service.test.js

const fuelService = require('../../../src/services/fuel.service');

describe('Fuel Service', () => {
  describe('calculateRange', () => {
    it('should calculate correct range for normal conditions', () => {
      const input = {
        fuelLevel: 50,
        vehicle: {
          mileage: 15,
          tankCapacity: 40
        },
        traffic: 'moderate',
        terrain: 'flat'
      };

      const result = fuelService.calculateRange(input);

      expect(result.baseRange).toBe(300);
      expect(result.safeRange).toBeLessThan(result.baseRange);
      expect(result.risk).toBe('SAFE');
    });

    it('should throw error for invalid fuel level', () => {
      const input = {
        fuelLevel: -10,
        vehicle: { mileage: 15, tankCapacity: 40 }
      };

      expect(() => fuelService.calculateRange(input)).toThrow();
    });
  });
});
```

---

## 🐳 Docker & Deployment

### **1. Docker Compose**

```yaml
# docker-compose.yml

version: '3.8'

services:
  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: unless-stopped

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

---

## 🚀 CI/CD Pipeline

### **1. GitHub Actions**

```yaml
# .github/workflows/ci.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker images
        run: |
          docker build -t surviveroute-backend:latest ./backend
          docker build -t surviveroute-frontend:latest ./frontend
      
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push surviveroute-backend:latest
          docker push surviveroute-frontend:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /app/surviveroute
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

---

## 📝 Environment Configuration

### **1. Environment Variables**

```bash
# .env.example

# Application
NODE_ENV=development
PORT=5000
APP_NAME=SurviveRoute AI
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/surviveroute
DB_HOST=localhost
DB_PORT=5432
DB_NAME=surviveroute
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@surviveroute.ai
FROM_NAME=SurviveRoute AI

# AWS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=surviveroute-uploads

# External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENAI_API_KEY=your_openai_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WHITELIST=127.0.0.1,::1

# Security
CORS_ORIGIN=http://localhost:3000
COOKIE_SECRET=your_cookie_secret
```

---

## 📚 Complete Documentation Structure

```
docs/
├── api/
│   ├── authentication.md
│   ├── endpoints.md
│   └── errors.md
│
├── architecture/
│   ├── overview.md
│   ├── database-schema.md
│   ├── system-design.md
│   └── security.md
│
├── deployment/
│   ├── docker.md
│   ├── kubernetes.md
│   ├── aws.md
│   └── monitoring.md
│
├── development/
│   ├── setup.md
│   ├── coding-standards.md
│   ├── testing.md
│   └── contributing.md
│
└── guides/
    ├── user-guide.md
    ├── admin-guide.md
    └── troubleshooting.md
```

---

## ✅ Quality Checklist

### **Before Production:**

- [ ] All tests passing (unit, integration, e2e)
- [ ] Code coverage > 80%
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] Load testing completed
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Monitoring setup
- [ ] Documentation complete
- [ ] CI/CD pipeline working
- [ ] Backup strategy in place
- [ ] Disaster recovery plan
- [ ] SSL certificates configured
- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Database migrations tested
- [ ] API versioning implemented
- [ ] Health checks working
- [ ] Graceful shutdown implemented

---

## 🎯 Next Steps

1. **Setup Development Environment**
   ```bash
   git clone https://github.com/your-org/surviveroute-core
   cd surviveroute-core
   npm install
   cp .env.example .env
   # Edit .env with your values
   npm run dev
   ```

2. **Run Tests**
   ```bash
   npm test
   npm run test:coverage
   ```

3. **Build for Production**
   ```bash
   npm run build
   docker-compose up -d
   ```

4. **Deploy**
   ```bash
   ./scripts/deploy.sh production
   ```

---

This professional setup ensures:
✅ Scalability
✅ Maintainability
✅ Security
✅ Reliability
✅ Performance
✅ Developer Experience

**Your application is now enterprise-ready!** 🚀