const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Basic routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Custos API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Custos Bitcoin Inheritance & Security Platform API',
    version: '0.1.0',
    endpoints: [
      'GET /health - Health check',
      'GET /api - API info',
      'POST /api/auth/register - Register user',
      'POST /api/auth/login - Login user',
      'GET /api/vault/status - Get vault status'
    ]
  });
});

// Mock auth routes (without database)
app.post('/api/auth/register', (req, res) => {
  res.json({ 
    message: 'User registration endpoint (mock)',
    status: 'success'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ 
    message: 'User login endpoint (mock)',
    token: 'mock-jwt-token',
    status: 'success'
  });
});

// Mock vault routes
app.get('/api/vault/status', (req, res) => {
  res.json({ 
    message: 'Vault status endpoint (mock)',
    vaultType: 'MULTISIG_2OF3',
    status: 'ACTIVE',
    keys: {
      user: 'configured',
      webApp: 'configured', 
      custos: 'secured-in-hsm'
    }
  });
});

// Mock switch routes
app.get('/api/switch/status', (req, res) => {
  res.json({ 
    message: 'Dead Man Switch status (mock)',
    state: 'ACTIVE',
    nextCheckinDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  });
});

app.post('/api/switch/checkin', (req, res) => {
  res.json({ 
    message: 'Check-in recorded (mock)',
    status: 'checked_in',
    nextDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`\n`);
  console.log(`\x1b[36mCustos Backend API Server\x1b[0m`);
  console.log(`\x1b[32mServer running on port ${PORT}\x1b[0m`);
  console.log(`\x1b[33mHealth check: http://localhost:${PORT}/health\x1b[0m`);
  console.log(`\x1b[33mAPI info: http://localhost:${PORT}/api\x1b[0m`);
  console.log(`\n`);
});
