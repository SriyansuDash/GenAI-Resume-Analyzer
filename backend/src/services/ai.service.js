import {GoogleGenAI} from '@google/genai'
import { config } from 'dotenv';

const ai = new GoogleGenAI({
    apiKey : config.GOOGLE_API_KEY
});

const invokeGeminiAi = async () =>{
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents : "Hello GeminI ! What is interview ?"
    });

    console.log(response.text);
    
}

export default invokeGeminiAi