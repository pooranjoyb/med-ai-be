import axios from 'axios';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const GEMINI_API_ENDPOINT = process.env.GEMINI_API_ENDPOINT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getDiagnosis = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const requestData = {
            contents: [
                {
                    parts: [
                        {
                            text: question
                        }
                    ]
                }
            ]
        };

        const response = await axios.post(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the diagnosis' });
    }
};

const summarize = async (req, res) => {
    try {
        const { imageBase64 } = req.body;

        const image = {
            inlineData: {
                data: imageBase64,
                mimeType: 'image/jpeg',
            },
        };

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const result = await model.generateContent([image]);

        res.json({ summary: result.response.text() });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
};


export { getDiagnosis, summarize };
