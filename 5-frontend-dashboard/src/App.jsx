import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dataSensor, setDataSensor] = useState(null);
  const [statusKoneksi, setStatusKoneksi] = useState('Menghubungkan...');

  // Fungsi untuk menarik data dari Backend Node.js (3-cloud-server-backend)
  const ambilDataBackend = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/status-tanaman');
      const result = await response.json();
      
      if (result.data && result.data.length > 0) {
        // Mengambil data urutan terakhir (paling baru)
        setDataSensor(result.data[result.data.length - 1]);
        setStatusKoneksi('Terhubung');
      }
    } catch (error) {
      console.error("Gagal menarik data:", error);
      setStatusKoneksi('Terputus dari Server');
    }
  };

  useEffect(() => {
    ambilDataBackend();
    // Lakukan polling data otomatis setiap 5 detik
    const interval = setInterval(() => {
      ambilDataBackend();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌱 Dashboard Stecuu</h1>
        <p>Greenhouse FK UMP | Status Server: <span className={statusKoneksi === 'Terhubung' ? 'status-ok' : 'status-error'}>{statusKoneksi}</span></p>
      </header>

      <main className="dashboard-grid">
        {/* Kolom Kiri: Indikator Sensor */}
        <section className="sensor-panel">
          <h2>Data Lingkungan Real-Time</h2>
          <div className="card-grid">
            <div className="sensor-card">
              <h3>Suhu Udara</h3>
              <p className="sensor-value">{dataSensor ? `${dataSensor.t_udara}°C` : '--'}</p>
            </div>
            <div className="sensor-card">
              <h3>Kelembapan Udara</h3>
              <p className="sensor-value">{dataSensor ? `${dataSensor.h_udara}%` : '--'}</p>
            </div>
            <div className="sensor-card">
              <h3>Kadar CO2</h3>
              <p className="sensor-value">{dataSensor ? `${dataSensor.co2} ppm` : '--'}</p>
            </div>
            <div className="sensor-card">
              <h3>Intensitas Cahaya</h3>
              <p className="sensor-value">{dataSensor ? `${dataSensor.lux} Lux` : '--'}</p>
            </div>
            <div className="sensor-card">
              <h3>Suhu Daun (Objek)</h3>
              <p className="sensor-value">{dataSensor ? `${dataSensor.t_daun}°C` : '--'}</p>
            </div>
            <div className="sensor-card">
              <h3>Kelembapan Tanah</h3>
              <p className="sensor-value">{dataSensor ? dataSensor.soil : '--'}</p>
            </div>
          </div>
        </section>

        {/* Kolom Kanan: Visualisasi Kamera NDVI & AI */}
        <section className="kamera-panel">
          <h2>Pemantauan Multispektral</h2>
          <div className="kamera-frame">
            {/* Placeholder untuk gambar dari 2-rpi-edge-gateway */}
            <div className="placeholder-gambar">
               <p>Menunggu Feed Kamera NoIR...</p>
               <small>(Peta NDVI & Hasil ML akan muncul di sini)</small>
            </div>
          </div>
          <div className="ai-status">
            <h3>Analisis Machine Learning</h3>
            <p>Prediksi Stres Tanaman: <strong>Menunggu Data Valid...</strong></p>
            <button className="btn-aktuator" disabled>Nyalakan Pompa Air (Auto)</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;