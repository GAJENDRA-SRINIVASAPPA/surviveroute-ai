require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Import middleware
const errorMiddleware = require('./src/middleware/error.middleware');
const logger = require('./src/utils/logger');

// Import routes
const predictRoute = require('./routes/predict.route');
const vehicleRoute = require('./routes/vehicle.route');
const emergencyRoute = require('./routes/emergency.route');
const stationRoute = require('./routes/station.route');
const professionalRoute = require('./routes/professional.route');
const authRoute = require('./routes/auth.route');
const nextgenRoute = require('./routes/nextgen.route');
const greenRoute = require('./routes/green.route');
const adaptiveRoute = require('./routes/adaptive.route');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/predict', predictRoute);
app.use('/api/vehicle', vehicleRoute);
app.use('/api/emergency', emergencyRoute);
app.use('/api/station', stationRoute);
app.use('/api/professional', professionalRoute);
app.use('/api/auth', authRoute);
app.use('/api/nextgen', nextgenRoute);
app.use('/api/green', greenRoute);
app.use('/api/adaptive', adaptiveRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'SurviveRoute AI API',
    version: '1.0.0',
    description: 'Revolutionary Navigation & Survival Platform',
    status: 'running',
    endpoints: {
      health: '/health',
      predict: '/api/predict',
      vehicle: '/api/vehicle',
      emergency: '/api/emergency',
      station: '/api/station',
      professional: '/api/professional',
      auth: '/api/auth',
      nextgen: '/api/nextgen',
      green: '/api/green',
      adaptive: '/api/adaptive'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 SurviveRoute AI Backend started on port ${PORT}`);
  logger.info(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🌐 API URL: http://localhost:${PORT}`);
  logger.info(`✅ Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;

// Made with Bob
