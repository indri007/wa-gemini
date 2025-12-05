@echo off
echo ========================================
echo Upload File ke VPS
echo ========================================
echo.
echo VPS: 103.181.182.206
echo Folder: /root/whatsapp-gemini-bot
echo.
echo Masukkan password saat diminta: K@artikasari13.
echo.
pause

echo Uploading files...
scp index.js root@103.181.182.206:/root/whatsapp-gemini-bot/
scp package.json root@103.181.182.206:/root/whatsapp-gemini-bot/
scp .env root@103.181.182.206:/root/whatsapp-gemini-bot/
scp scan-qr.js root@103.181.182.206:/root/whatsapp-gemini-bot/
scp ecosystem.config.cjs root@103.181.182.206:/root/whatsapp-gemini-bot/

echo.
echo ========================================
echo Upload selesai!
echo ========================================
echo.
echo Langkah selanjutnya:
echo 1. Koneksi ke VPS: ssh root@103.181.182.206
echo 2. Masuk folder: cd /root/whatsapp-gemini-bot
echo 3. Install: npm install
echo 4. Jalankan: pm2 start ecosystem.config.cjs
echo 5. Lihat log: pm2 logs whatsapp-bot
echo.
pause
