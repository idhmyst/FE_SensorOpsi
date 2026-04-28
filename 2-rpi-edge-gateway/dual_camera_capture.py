import cv2
import time

def ambil_gambar_sinkron():
    print("Memulai inisialisasi sensor kamera...")
    
    # 1. Membuka koneksi ke kedua port kamera.
    # Di Linux/Raspberry Pi, kamera biasanya berada di index 0 dan 1, atau 0 dan 2.
    # Ubah angka index di bawah ini jika salah satu kamera tidak terbaca.
    kamera_rgb = cv2.VideoCapture(0)
    kamera_noir = cv2.VideoCapture(1)

    # 2. Verifikasi apakah akses ke hardware berhasil
    if not kamera_rgb.isOpened() or not kamera_noir.isOpened():
        print("Akses ditolak atau kamera tidak terdeteksi. Cek kembali konektor kabel flex!")
        return

    # 3. Pemanasan Sensor (Warm-up)
    # Memberi waktu bagi auto-exposure dan auto-white-balance untuk menyesuaikan pencahayaan greenhouse
    time.sleep(2.0)
    
    print("Menangkap kondisi tanaman herbal...")

    # 4. Fase Capture Sinkron
    # Menggunakan metode grab() untuk membekukan frame di memori pada waktu yang sama.
    # Ini jauh lebih presisi dibandingkan metode read() biasa yang membaca secara berurutan.
    berhasil_tangkap_rgb = kamera_rgb.grab()
    berhasil_tangkap_noir = kamera_noir.grab()

    if berhasil_tangkap_rgb and berhasil_tangkap_noir:
        # 5. Fase Pengambilan Data (Retrieve)
        # Menarik data gambar mentah dari buffer memori ke dalam variabel
        _, frame_rgb = kamera_rgb.retrieve()
        _, frame_noir = kamera_noir.retrieve()

        # 6. Menyimpan File ke MicroSD
        # File ini nantinya siap di-passing ke algoritma NDVI atau dianalisis oleh TPU
        cv2.imwrite('tanaman_herbal_rgb.jpg', frame_rgb)
        cv2.imwrite('tanaman_herbal_noir.jpg', frame_noir)
        
        print("Berhasil! Gambar RGB dan NoIR telah tersimpan di direktori saat ini.")
    else:
        print("Gagal menangkap frame dari salah satu sensor.")

    # 7. Membersihkan Resource (Wajib)
    # Sangat penting untuk melepaskan kamera agar tidak terjadi memory leak 
    # dan port bisa digunakan oleh skrip otomasi lainnya.
    kamera_rgb.release()
    kamera_noir.release()

# Jalankan fungsi utama
if __name__ == "__main__":
    ambil_gambar_sinkron()