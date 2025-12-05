# Panduan Deploy WhatsApp Bot ke VPS

## Persiapan

### 1. Koneksi ke VPS
Buka terminal/CMD dan koneksi ke VPS Anda:
```bash
ssh root@server-007.dgrnieshop.web.id
```
Atau gunakan IP VPS Anda.

### 2. Install Node.js di VPS
```bash
# Update sistem
apt update && apt upgrade -y

# Install Node.js (versi 18 atau lebih baru)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verifikasi instalasi
node --version
npm --version
```

### 3. Install PM2 (Process Manager)
```bash
npm install -g pm2
```

## Upload Project ke VPS

### Opsi 1: Upload Manual via FTP/SFTP
1. Compress folder project ini menjadi zip
2. Upload ke VPS menggunakan FileZilla atau WinSCP
3. Extract di VPS:
```bash
cd /root
unzip whatsapp-gemini-bot.zip
cd whatsapp-gemini-bot
```

### Opsi 2: Upload via Git (Recommended)
```bash
# Di VPS
cd /root
git clone <url-repository-anda>
cd whatsapp-gemini-bot
```

### Opsi 3: Copy langsung dari komputer lokal
Dari komputer Windows Anda, jalankan:
```bash
scp -r . root@server-007.dgrnieshop.web.id:/root/whatsapp-gemini-bot
```

## Setup di VPS

### 1. Masuk ke folder project
```bash
cd /root/whatsapp-gemini-bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
nano .env
```
Paste ini:
```
GEMINI_API_KEY=AIzaSyA1eGvO_h3LROJqIZdikIKv9HE-KxvZUd4
```
Tekan Ctrl+X, lalu Y, lalu Enter untuk save.

### 4. Install dependencies tambahan untuk VPS
```bash
# Install Chromium dependencies
apt install -y \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  ca-certificates \
  fonts-liberation \
  libappindicator1 \
  libnss3 \
  lsb-release \
  xdg-utils \
  wget
```

## Jalankan Bot

### Test Manual (untuk cek error)
```bash
npm start
```
Scan QR code yang muncul dengan WhatsApp Anda.
Tekan Ctrl+C untuk stop.

### Jalankan dengan PM2 (Auto Restart)
```bash
# Start bot
pm2 start index.js --name whatsapp-bot

# Lihat status
pm2 status

# Lihat log
pm2 logs whatsapp-bot

# Stop bot
pm2 stop whatsapp-bot

# Restart bot
pm2 restart whatsapp-bot

# Auto start saat VPS reboot
pm2 startup
pm2 save
```

## Scan QR Code di VPS

Karena VPS tidak punya display, ada 2 cara:

### Cara 1: Lihat QR di log
```bash
pm2 logs whatsapp-bot
```
QR code akan muncul di terminal (dalam bentuk ASCII art).

### Cara 2: Generate QR sebagai file gambar
Saya sudah buatkan script khusus, jalankan:
```bash
node scan-qr.js
```
Lalu download file `qr.png` dan scan dengan WhatsApp.

## Monitoring

### Cek status bot
```bash
pm2 status
```

### Lihat log real-time
```bash
pm2 logs whatsapp-bot --lines 100
```

### Restart jika error
```bash
pm2 restart whatsapp-bot
```

## Troubleshooting

### Bot tidak bisa scan QR
- Pastikan semua dependencies Chromium sudah terinstall
- Coba hapus folder `.wwebjs_auth` dan scan ulang:
```bash
rm -rf .wwebjs_auth
pm2 restart whatsapp-bot
```

### Bot mati setelah beberapa waktu
- Pastikan PM2 sudah di-setup untuk auto restart:
```bash
pm2 startup
pm2 save
```

### Error "Cannot find module"
```bash
npm install
pm2 restart whatsapp-bot
```

### Cek memory usage
```bash
pm2 monit
```

## Update Bot

Jika ada perubahan code:
```bash
cd /root/whatsapp-gemini-bot
git pull  # jika pakai git
npm install  # jika ada dependency baru
pm2 restart whatsapp-bot
```

## Backup Session

Session WhatsApp tersimpan di folder `.wwebjs_auth`. Backup folder ini agar tidak perlu scan QR lagi:
```bash
tar -czf whatsapp-session-backup.tar.gz .wwebjs_auth
```

## Keamanan

1. Jangan share API key Gemini
2. Jangan share folder `.wwebjs_auth` (berisi session WhatsApp)
3. Setup firewall di VPS
4. Gunakan user non-root untuk production

## Support

Jika ada masalah, cek log:
```bash
pm2 logs whatsapp-bot --lines 200
```
