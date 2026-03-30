const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let users = [];

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    const user = {
      id: uuidv4(),
      name,
      email,
      phone,
      password, // In production, hash this with bcrypt
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // In production, generate JWT token here
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: userWithoutPassword,
      token: 'mock-jwt-token-' + user.id
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/auth/profile
 * Get user profile
 */
router.get('/profile/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/auth/profile/:id
 * Update user profile
 */
router.put('/profile/:id', (req, res) => {
  try {
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    users[index] = {
      ...users[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };

    const { password: _, ...userWithoutPassword } = users[index];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: userWithoutPassword
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
