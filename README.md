# WhatsApp Bot dengan Gemini AI

Bot WhatsApp yang menggunakan Google Gemini AI untuk menjawab pesan secara otomatis.

## Cara Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Dapatkan Gemini API Key
- Kunjungi: https://makersuite.google.com/app/apikey
- Login dengan akun Google
- Buat API key baru
- Copy API key tersebut

### 3. Setup Environment Variables
```bash
copy .env.example .env
```

Edit file `.env` dan masukkan API key Anda:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Jalankan Bot
```bash
npm start
```

### 5. Scan QR Code
- QR code akan muncul di terminal
- Buka WhatsApp di HP Anda
- Pilih menu "Linked Devices" atau "Perangkat Tertaut"
- Scan QR code yang muncul di terminal

### 6. Selesai!
Bot sudah siap menerima dan menjawab pesan dengan Gemini AI.

## Fitur

- ✅ Menjawab pesan otomatis menggunakan Gemini AI
- ✅ Indikator "sedang mengetik..."
- ✅ Autentikasi tersimpan (tidak perlu scan QR setiap kali)
- ✅ Error handling

## Catatan

- Bot saat ini tidak aktif di grup (bisa diubah di `index.js`)
- Pastikan koneksi internet stabil
- API key Gemini harus valid dan memiliki quota

## Troubleshooting

**Error: Invalid API Key**
- Pastikan API key sudah benar di file `.env`
- Cek quota API key di Google AI Studio

**QR Code tidak muncul**
- Pastikan semua dependencies sudah terinstall
- Coba hapus folder `.wwebjs_auth` dan jalankan ulang

**Bot tidak merespon**
- Cek koneksi internet
- Lihat log error di terminal
- Pastikan WhatsApp masih terkoneksi
