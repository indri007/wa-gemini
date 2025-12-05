import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test dengan model yang berbeda
const models = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'models/gemini-pro',
    'models/gemini-1.5-pro'
];

async function testModels() {
    for (const modelName of models) {
        try {
            console.log(`\nTesting model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Say hello');
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS with ${modelName}: ${text.substring(0, 50)}`);
            break; // Jika berhasil, keluar dari loop
        } catch (error) {
            console.log(`❌ FAILED with ${modelName}: ${error.message}`);
        }
    }
}

testModels();
