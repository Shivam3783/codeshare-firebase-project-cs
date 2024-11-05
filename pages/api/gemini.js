// pages/api/gemini.js
'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent([query]);
            const aiResponse = result.response.text();
            res.status(200).json({ aiResponse });
        } catch (error) {
            console.error('Error generating AI response:', error);
            res.status(500).json({ error: 'Failed to generate AI response' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}







// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // const genAI = new GoogleGenerativeAI('AIzaSyBXIXk3ZB4LtWKBY-7h1A9IGIXISMznQP8'); //dev
// const genAI = new GoogleGenerativeAI('AIzaSyAQfRLd27DemYrfaIqaIRrkz0gj9LopL3w');

// const geminiQuery = "Can i use a camera with an arduino?";

// async function run() {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent([
//         geminiQuery
//     ]
//     );
//     console.log(result.response.text());
// }

// run().catch(err => console.error(err));

