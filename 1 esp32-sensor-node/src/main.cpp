#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

#define DHTPIN 4     
#define DHTTYPE DHT22   
DHT dht(DHTPIN, DHTTYPE);

// TODO: Ganti dengan nama WiFi dan Password hotspot HP kamu!
const char* ssid = "IIBAYLAPTOP";
const char* password = "11111111";

// Inisialisasi Web Server di port 80 (port standar HTTP)
WebServer server(80);

// Variabel untuk nyimpen data sensor
float suhu = 0.0;
float kelembaban = 0.0;

// Fungsi untuk merender halaman HTML
void handleRoot() {
  // Bikin kerangka HTML sederhana (Frontend)
  String html = "<!DOCTYPE html><html>";
  html += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
  html += "<title>Monitoring Greenhouse FK UMP</title>";
  html += "<style>";
  html += "body { font-family: Arial; text-align: center; margin-top: 50px; background-color: #f4f4f9;}";
  html += "h1 { color: #2c3e50; }";
  html += ".card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: inline-block; margin: 10px; width: 200px;}";
  html += ".value { font-size: 30px; font-weight: bold; color: #27ae60; }";
  html += "</style>";
  // Script untuk auto-refresh halaman setiap 5 detik
  html += "<meta http-equiv=\"refresh\" content=\"5\">";
  html += "</head><body>";
  
  html += "<h1>Panel Monitoring Cerdas</h1>";
  html += "<p>Fakultas Kedokteran UMP</p>";

  // Card Suhu
  html += "<div class=\"card\">";
  html += "<h3>Suhu Udara</h3>";
  html += "<p class=\"value\">" + String(suhu) + " &deg;C</p>";
  html += "</div>";

  // Card Kelembaban
  html += "<div class=\"card\">";
  html += "<h3>Kelembaban</h3>";
  html += "<p class=\"value\">" + String(kelembaban) + " %</p>";
  html += "</div>";

  html += "</body></html>";

  // Kirim halaman HTML ke browser
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Proses koneksi ke WiFi
  Serial.print("Menyambungkan ke WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nBerhasil nyambung WiFi!");
  Serial.print("Buka browser di laptop/HP dan ketik IP ini: ");
  Serial.println(WiFi.localIP());

  // Atur routing URL
  server.on("/", handleRoot);
  
  // Mulai server
  server.begin();
  Serial.println("Web server menyala!");
}

void loop() {
  // Tetap baca sensor
  float newSuhu = dht.readTemperature();
  float newKelembaban = dht.readHumidity();

  // Update variabel jika data valid
  if (!isnan(newSuhu) && !isnan(newKelembaban)) {
    suhu = newSuhu;
    kelembaban = newKelembaban;
  }

  // Handle request dari client (browser)
  server.handleClient();
}