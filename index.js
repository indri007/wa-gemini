import makeWASocket, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Fungsi untuk memulai bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    console.log(`Menggunakan WA v${version.join('.')}, isLatest: ${isLatest}`);
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ['WhatsApp Bot', 'Chrome', '10.0'],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        defaultQueryTimeoutMs: undefined
    });

    // Event: Connection update (QR, connecting, open, close)
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('Scan QR code ini dengan WhatsApp Anda:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Koneksi terputus:', lastDisconnect?.error, 'Reconnecting:', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp bot siap!');
            console.log('Bot akan menjawab semua pesan dengan Gemini AI');
        }
    });

    // Event: Simpan kredensial
    sock.ev.on('creds.update', saveCreds);

    // Event: Menerima pesan
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        
        const msg = messages[0];
        if (!msg.message) return;
        
        const messageText = msg.message.conversation || 
                           msg.message.extendedTextMessage?.text || '';
        
        if (!messageText) return;
        
        // Abaikan pesan dari status dan grup
        if (msg.key.remoteJid === 'status@broadcast' || msg.key.remoteJid.includes('@g.us')) {
            return;
        }
        
        // Abaikan pesan dari bot sendiri
        if (msg.key.fromMe) return;
        
        try {
            console.log(`📩 Pesan dari ${msg.key.remoteJid}: ${messageText}`);
            
            // Kirim pesan ke Gemini AI
            const result = await model.generateContent(messageText);
            const response = result.response;
            const text = response.text();
            
            // Kirim balasan
            await sock.sendMessage(msg.key.remoteJid, { text });
            console.log(`✅ Balasan terkirim: ${text.substring(0, 50)}...`);
            
        } catch (error) {
            console.error('❌ Error:', error.message);
            await sock.sendMessage(msg.key.remoteJid, { 
                text: 'Maaf, terjadi kesalahan saat memproses pesan Anda.' 
            });
        }
    });
}

// Mulai bot
console.log('🚀 Memulai WhatsApp bot...');
startBot();
