#!/bin/bash

echo "=========================================="
echo "Setup WhatsApp Bot di VPS"
echo "=========================================="
echo ""

# Update sistem
echo "1. Update sistem..."
apt update && apt upgrade -y

# Install Node.js
echo ""
echo "2. Install Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verifikasi Node.js
echo ""
echo "Node.js version:"
node --version
echo "NPM version:"
npm --version

# Install PM2
echo ""
echo "3. Install PM2..."
npm install -g pm2

# Install Chromium dependencies
echo ""
echo "4. Install Chromium dependencies..."
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

# Buat folder project
echo ""
echo "5. Membuat folder project..."
mkdir -p /root/whatsapp-gemini-bot
cd /root/whatsapp-gemini-bot

echo ""
echo "=========================================="
echo "Setup selesai!"
echo "=========================================="
echo ""
echo "Langkah selanjutnya:"
echo "1. Upload file project ke: /root/whatsapp-gemini-bot"
echo "2. Jalankan: cd /root/whatsapp-gemini-bot"
echo "3. Jalankan: npm install"
echo "4. Jalankan: pm2 start ecosystem.config.cjs"
echo "5. Jalankan: pm2 logs whatsapp-bot"
echo ""
