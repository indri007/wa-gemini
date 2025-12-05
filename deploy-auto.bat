@echo off
chcp 65001 >nul
echo ========================================
echo Deploy WhatsApp Bot ke VPS Otomatis
echo ========================================
echo.
echo VPS: 103.181.182.206
echo User: root
echo.

REM Install plink jika belum ada (untuk auto-input password)
echo Checking dependencies...

REM Buat folder temp untuk file yang akan diupload
echo Preparing files...
if not exist "temp-deploy" mkdir temp-deploy
copy index.js temp-deploy\ >nul
copy package.json temp-deploy\ >nul
copy .env temp-deploy\ >nul
copy scan-qr.js temp-deploy\ >nul
copy ecosystem.config.cjs temp-deploy\ >nul

echo.
echo ========================================
echo LANGKAH MANUAL DEPLOY
echo ========================================
echo.
echo Karena Windows tidak bisa auto-input password SSH,
echo silakan ikuti langkah berikut:
echo.
echo 1. Buka CMD baru dan jalankan:
echo    ssh root@103.181.182.206
echo.
echo 2. Masukkan password: K@artikasari13.
echo.
echo 3. Jalankan command berikut di VPS:
echo.
echo    # Install Node.js
echo    curl -fsSL https://deb.nodesource.com/setup_18.x ^| bash -
echo    apt install -y nodejs
echo    npm install -g pm2
echo.
echo    # Buat folder project
echo    mkdir -p /root/whatsapp-gemini-bot
echo    cd /root/whatsapp-gemini-bot
echo.
echo 4. Upload file dengan WinSCP atau FileZilla:
echo    - Host: 103.181.182.206
echo    - User: root
echo    - Password: K@artikasari13.
echo    - Upload semua file ke: /root/whatsapp-gemini-bot
echo.
echo 5. Kembali ke SSH dan jalankan:
echo    cd /root/whatsapp-gemini-bot
echo    npm install
echo    pm2 start ecosystem.config.cjs
echo    pm2 logs whatsapp-bot
echo.
echo 6. Scan QR code yang muncul dengan WhatsApp
echo.
echo 7. Setup auto-start:
echo    pm2 startup
echo    pm2 save
echo.
echo ========================================
pause
