import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Inisialisasi WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Event: QR Code untuk login WhatsApp
client.on('qr', (qr) => {
    console.log('Scan QR code ini dengan WhatsApp Anda:');
    qrcode.generate(qr, { small: true });
});

// Event: WhatsApp siap
client.on('ready', () => {
    console.log('✅ WhatsApp bot siap!');
    console.log('Bot akan menjawab semua pesan dengan Gemini AI');
});

// Event: Menerima pesan
client.on('message', async (message) => {
    try {
        // Abaikan pesan dari grup (opsional) - Check ID ending with @g.us
        if (message.from === 'status@broadcast' || message.from.includes('@g.us')) {
            return;
        }

        console.log(`📩 Pesan dari ${message.from}: ${message.body}`);

        // Kirim indikator "sedang mengetik..." (Non-aktifkan untuk menghindari crash)
        // chat.sendStateTyping();

        // Kirim pesan ke Gemini AI
        const result = await model.generateContent(message.body);
        const response = await result.response;
        const text = response.text();

        // Kirim balasan
        // await message.reply(text);
        await client.sendMessage(message.from, text, { sendSeen: false });
        console.log(`✅ Balasan terkirim: ${text.substring(0, 50)}...`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        await message.reply('Maaf, terjadi kesalahan saat memproses pesan Anda.');
    }
});

// Event: Error
client.on('auth_failure', () => {
    console.error('❌ Autentikasi gagal!');
});

client.on('disconnected', (reason) => {
    console.log('❌ WhatsApp terputus:', reason);
});

// Mulai client
console.log('🚀 Memulai WhatsApp bot...');
client.initialize();
