import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode';
import fs from 'fs';

console.log('🚀 Memulai WhatsApp bot untuk scan QR...');
console.log('QR code akan disimpan sebagai file qr.png');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', async (qr) => {
    console.log('\n✅ QR Code berhasil di-generate!');
    console.log('📁 File qr.png sudah dibuat');
    console.log('📥 Download file qr.png dan scan dengan WhatsApp Anda\n');
    
    // Generate QR sebagai file gambar
    await qrcode.toFile('qr.png', qr, {
        width: 400,
        margin: 2
    });
    
    // Juga tampilkan di terminal
    console.log('QR Code (ASCII):');
    await qrcode.toString(qr, { type: 'terminal', small: true }, (err, url) => {
        if (!err) console.log(url);
    });
});

client.on('ready', () => {
    console.log('\n✅ WhatsApp berhasil terkoneksi!');
    console.log('Bot siap digunakan. Anda bisa stop script ini (Ctrl+C)');
    console.log('Lalu jalankan: pm2 start index.js --name whatsapp-bot\n');
});

client.on('auth_failure', () => {
    console.error('❌ Autentikasi gagal! Coba scan QR lagi.');
});

client.initialize();
