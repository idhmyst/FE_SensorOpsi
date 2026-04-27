// filepath: 3-cloud-server-backend/src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Sensor endpoints
router.post('/sensor', sensorController.storeSensorData);
router.get('/sensor', sensorController.getSensorData);
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