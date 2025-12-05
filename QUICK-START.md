# Quick Start - Deploy ke VPS

## Cara Tercepat Deploy Bot

### 1. Koneksi ke VPS
```bash
ssh root@103.181.182.206
```

### 2. Install Node.js & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g pm2
```

### 3. Buat folder project
```bash
mkdir -p /root/whatsapp-gemini-bot
cd /root/whatsapp-gemini-bot
```

### 4. Upload file dari komputer Windows
Buka CMD/PowerShell di folder project ini, lalu jalankan:
```bash
scp -r * root@server-007.dgrnieshop.web.id:/root/whatsapp-gemini-bot/
```

Atau double-click file `upload-to-vps.bat`

### 5. Install dependencies di VPS
```bash
cd /root/whatsapp-gemini-bot
npm install
```

### 6. Install Chromium dependencies
```bash
apt update
apt install -y chromium-browser chromium-codecs-ffmpeg
```

Atau install semua dependencies:
```bash
apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### 7. Jalankan bot dengan PM2
```bash
pm2 start ecosystem.config.cjs
pm2 logs whatsapp-bot
```

### 8. Scan QR Code
QR code akan muncul di log. Scan dengan WhatsApp Anda.

Jika QR tidak terlihat jelas, jalankan:
```bash
node scan-qr.js
```
Lalu download file `qr.png` dan scan.

### 9. Setup auto-start
```bash
pm2 startup
pm2 save
```

## Selesai! 🎉

Bot sudah berjalan di VPS dan akan auto-restart jika mati atau VPS reboot.

## Command Berguna

```bash
# Lihat status
pm2 status

# Lihat log
pm2 logs whatsapp-bot

# Restart bot
pm2 restart whatsapp-bot

# Stop bot
pm2 stop whatsapp-bot

# Hapus bot dari PM2
pm2 delete whatsapp-bot
```

## Troubleshooting

### QR Code tidak muncul
```bash
pm2 logs whatsapp-bot --lines 200
```

### Bot error terus
```bash
# Hapus session dan scan ulang
rm -rf .wwebjs_auth
pm2 restart whatsapp-bot
```

### Update bot
```bash
cd /root/whatsapp-gemini-bot
# Upload file baru dari Windows
pm2 restart whatsapp-bot
```
