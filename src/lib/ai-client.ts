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
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Build conversation history
  const history = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history,
    systemInstruction: {
      role: 'user' as const,
      parts: [{ text: AI_SYSTEM_PROMPT }],
    },
  });

  const result = await chat.sendMessage(newMessage);
  const response = result.response;
  return response.text();
}
