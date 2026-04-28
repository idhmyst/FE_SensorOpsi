// filepath: 3-cloud-server-backend/src/controllers/sensorController.js
const sensorData = []; // In-memory storage (replace with database in production)

// ==========================================
// ENDPOINT 1: Menerima Data (Untuk ESP32)
// ==========================================
exports.storeSensorData = (req, res) => {
  try {
    const dataMasuk = req.body;

    // Menambahkan timestamp kapan data diterima
    const dataDenganWaktu = {
      ...dataMasuk,
      waktu_terima: new Date().toISOString()
    };

    // Simpan ke "database"
    sensorData.push(dataDenganWaktu);

    console.log("📥 Data baru masuk dari Node:", dataMasuk.id);
    console.log(`Suhu Udara: ${dataMasuk.t_udara}°C | CO2: ${dataMasuk.co2} ppm`);

    res.status(201).json({ 
      pesan: "Data berhasil disimpan!", 
      status: "OK" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==========================================
// ENDPOINT 2: Mengirim Data (Untuk Dashboard UI)
// ==========================================
exports.getSensorData = (req, res) => {
  try {
    // Mengirim 10 data terbaru agar dashboard tidak berat
    const dataTerbaru = sensorData.slice(-10);
    
    res.status(200).json({
      total_data: sensorData.length,
      data: dataTerbaru
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestData = (req, res) => {
  try {
    const latest = sensorData[sensorData.length - 1];
    res.json({ success: true, data: latest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    res.json({ success: true, data: latest || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};