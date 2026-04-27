// filepath: 3-cloud-server-backend/src/controllers/sensorController.js
const sensorData = []; // In-memory storage (replace with database in production)

exports.storeSensorData = (req, res) => {
  try {
    const { nodeId, temperature, humidity, co2, timestamp } = req.body;
    
    const data = {
      id: sensorData.length + 1,
      nodeId,
      temperature,
      humidity,
      co2,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date()
    };
    
    sensorData.push(data);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSensorData = (req, res) => {
  try {
    const { nodeId, limit = 100 } = req.query;
    let filtered = sensorData;
    
    if (nodeId) {
      filtered = sensorData.filter(d => d.nodeId === nodeId);
    }
    
    const result = filtered.slice(-parseInt(limit));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestData = (req, res) => {
  try {
    const { nodeId } = req.query;
    let filtered = sensorData;
    
    if (nodeId) {
      filtered = sensorData.filter(d => d.nodeId === nodeId);
    }
    
    const latest = filtered[filtered.length - 1];
    res.json({ success: true, data: latest || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};