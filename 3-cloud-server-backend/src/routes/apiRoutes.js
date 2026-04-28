// filepath: 3-cloud-server-backend/src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// ==========================================
// ENDPOINT 1: Menerima Data (Untuk ESP32)
// ==========================================
router.post('/sensor-data', sensorController.storeSensorData);

// ==========================================
// ENDPOINT 2: Mengirim Data (Untuk Dashboard UI)
// ==========================================
router.get('/status-tanaman', sensorController.getSensorData);

// Additional endpoints
router.get('/sensor/latest', sensorController.getLatestData);

// Prediction endpoint (placeholder for ML integration)
router.post('/predict', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Prediction endpoint - integrate ML model here',
    prediction: null 
  });
});

module.exports = router;