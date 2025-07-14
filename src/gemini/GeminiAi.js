import { GoogleGenAI } from "@google/genai";

async function GeminiAi(prompt) {
    const genAI = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    })
    return response.text;
}
export default GeminiAi;