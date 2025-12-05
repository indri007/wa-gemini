@echo off
echo ========================================
echo Upload WhatsApp Bot ke VPS
echo ========================================
echo.

set VPS_HOST=103.181.182.206
set VPS_USER=root
set VPS_PATH=/root/whatsapp-gemini-bot

echo Mengupload file ke VPS...
echo Host: %VPS_HOST%
echo Path: %VPS_PATH%
echo.

scp -r index.js package.json .env README.md DEPLOY.md scan-qr.js ecosystem.config.cjs %VPS_USER%@%VPS_HOST%:%VPS_PATH%/

echo.
echo ========================================
echo Upload selesai!
echo ========================================
echo.
echo Langkah selanjutnya:
echo 1. Koneksi ke VPS: ssh %VPS_USER%@%VPS_HOST%
echo 2. Masuk folder: cd %VPS_PATH%
echo 3. Install dependencies: npm install
echo 4. Jalankan bot: pm2 start ecosystem.config.cjs
echo.
pause
