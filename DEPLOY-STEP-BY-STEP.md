# Deploy Step by Step ke VPS

## Informasi VPS
- **IP**: 103.181.182.206
- **User**: root
- **Password**: K@artikasari13.

## Langkah 1: Koneksi ke VPS

Buka CMD atau PowerShell, lalu jalankan:
```bash
ssh root@103.181.182.206
```

Masukkan password: `K@artikasari13.`

## Langkah 2: Setup VPS (Jalankan di VPS)

Copy-paste command ini satu per satu:

### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
node --version
npm --version
```

### Install PM2
```bash
npm install -g pm2
```

### Install Chromium Dependencies
```bash
apt update
apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Buat Folder Project
```bash
mkdir -p /root/whatsapp-gemini-bot
cd /root/whatsapp-gemini-bot
```

## Langkah 3: Upload File ke VPS

### Opsi A: Menggunakan WinSCP (Recommended)

1. Download WinSCP: https://winscp.net/eng/download.php
2. Install dan buka WinSCP
3. Buat koneksi baru:
   - File protocol: SFTP
   - Host name: 103.181.182.206
   - Port: 22
   - User name: root
   - Password: K@artikasari13.
4. Klik "Login"
5. Di sisi kanan (VPS), navigasi ke: `/root/whatsapp-gemini-bot`
6. Di sisi kiri (komputer Anda), pilih folder project ini
7. Upload semua file ini:
   - index.js
   - package.json
   - .env
   - scan-qr.js
   - ecosystem.config.cjs

### Opsi B: Menggunakan SCP (Command Line)

Buka CMD/PowerShell di folder project ini, lalu jalankan:
```bash
scp index.js package.json .env scan-qr.js ecosystem.config.cjs root@103.181.182.206:/root/whatsapp-gemini-bot/
```

Masukkan password: `K@artikasari13.`

## Langkah 4: Install Dependencies (di VPS)

Kembali ke SSH VPS, lalu jalankan:
```bash
cd /root/whatsapp-gemini-bot
npm install
```

Tunggu sampai selesai (sekitar 2-5 menit).

## Langkah 5: Jalankan Bot

```bash
pm2 start ecosystem.config.cjs
```

## Langkah 6: Lihat QR Code

```bash
pm2 logs whatsapp-bot
```

QR code akan muncul di terminal. Scan dengan WhatsApp Anda:
1. Buka WhatsApp di HP
2. Menu (⋮) > Perangkat Tertaut
3. Tautkan Perangkat
4. Scan QR code

Jika QR tidak terlihat jelas, jalankan:
```bash
node scan-qr.js
```

Lalu download file `qr.png` dengan WinSCP dan scan.

## Langkah 7: Setup Auto-Start

Agar bot jalan terus meskipun VPS restart:
```bash
pm2 startup
pm2 save
```

## Selesai! 🎉

Bot sudah jalan di VPS. Cek status:
```bash
pm2 status
```

## Command Berguna

```bash
# Lihat log real-time
pm2 logs whatsapp-bot

# Restart bot
pm2 restart whatsapp-bot

# Stop bot
pm2 stop whatsapp-bot

# Lihat status
pm2 status

# Lihat monitoring
pm2 monit
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
pm2 logs whatsapp-bot
```

### Update bot (jika ada perubahan)
1. Upload file baru dengan WinSCP
2. Jalankan:
```bash
cd /root/whatsapp-gemini-bot
pm2 restart whatsapp-bot
```

### Cek memory dan CPU usage
```bash
pm2 monit
```

### Backup session WhatsApp
```bash
cd /root/whatsapp-gemini-bot
tar -czf whatsapp-session-backup.tar.gz .wwebjs_auth
```

Download file `whatsapp-session-backup.tar.gz` dengan WinSCP untuk backup.
