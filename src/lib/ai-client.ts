import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, AI_SYSTEM_PROMPT } from './constants';
import type { ChatMessage } from '@/types';

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.');
    }
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return genAI;
}

export async function sendMessage(
  messages: ChatMessage[],
  newMessage: string
): Promise<string> {
  const client = getClient();
  
  // 1. Pass the system instruction in the correct OBJECT format here
  const model = client.getGenerativeModel({ 
    model: 'models/gemini-2.5-flash',
    systemInstruction: {
      role: 'system',
      parts: [{ text: AI_SYSTEM_PROMPT }],
    },
  });

  const history = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: msg.content }],
  }));

  // 2. Start the chat WITHOUT passing systemInstruction again
  const chat = model.startChat({
    history,
  });

  try {
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
  } catch (e) {
    const err = e as any;
    console.error("Gemini API Error:", err);
    
    if (err.status === 429) {
      throw new Error("Rate limit reached. Please wait 60 seconds.");
    }
    throw e;
  }
}