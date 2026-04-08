import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatSession } from '@/types';
import { sendMessage } from '@/lib/ai-client';
import { extractMoodScore, cleanResponse, calculateSessionAverage } from '@/lib/sentiment';
import { storage } from '@/lib/storage';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionActive: boolean;
  sessionDuration: number;
  sessionMoodScores: number[];
  send: (content: string) => Promise<void>;
  startSession: () => void;
  endSession: () => ChatSession | null;
  clearError: () => void;
}

export function useChat(walletAddress: string | undefined): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStart, setSessionStart] = useState<number>(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const moodScores = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  // Timer for session duration
  useEffect(() => {
    if (sessionActive && sessionStart > 0) {
      timerRef.current = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionActive, sessionStart]);

  const startSession = useCallback(() => {
    setMessages([]);
    moodScores.current = [];
    setSessionActive(true);
    setSessionStart(Date.now());
    setSessionDuration(0);
    setError(null);

    // Add welcome message
    const welcome: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: "Welcome to your safe space. I'm here to listen and support you — no judgment, no records, just a conversation between us. How are you feeling today?",
      timestamp: Date.now(),
    };
    setMessages([welcome]);
  }, []);

  const send = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      messagesRef.current = updated;
      return updated;
    });
    setIsLoading(true);
    setError(null);

    try {
      const currentMessages = messagesRef.current;
      const rawResponse = await sendMessage(
        currentMessages.filter(m => m.role !== 'assistant' || !m.content.startsWith('Welcome')),
        content.trim()
      );

      const moodScore = extractMoodScore(rawResponse);
      const cleanedContent = cleanResponse(rawResponse);
      moodScores.current.push(moodScore);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: cleanedContent,
        timestamp: Date.now(),
        moodScore,
      };

      setMessages(prev => {
        const updated = [...prev, assistantMessage];
        messagesRef.current = updated;
        return updated;
      });

      // Save to localStorage if wallet connected
      if (walletAddress) {
        storage.set(walletAddress, 'current_chat', [...currentMessages, assistantMessage]);
      }
    } catch (e) {
      const rawError = e instanceof Error ? e.message : 'Unknown error';
      let errorMessage = 'Failed to get response. Please try again.';
      if (rawError.includes('429') || rawError.includes('quota') || rawError.includes('Quota')) {
        errorMessage = 'AI service is temporarily busy. Please wait a moment and try again.';
      } else if (rawError.includes('API key')) {
        errorMessage = 'AI service is not configured. Please add your Gemini API key to .env file.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, walletAddress]);

  const endSession = useCallback((): ChatSession | null => {
    if (!sessionActive) return null;

    if (timerRef.current) clearInterval(timerRef.current);
    setSessionActive(false);

    const session: ChatSession = {
      id: crypto.randomUUID(),
      startedAt: sessionStart,
      endedAt: Date.now(),
      messages: [], // Never store raw messages
      averageMood: calculateSessionAverage(moodScores.current),
    };

    // Save session summary (without messages) to localStorage
    if (walletAddress) {
      const sessions = storage.get<ChatSession[]>(walletAddress, 'sessions') || [];
      sessions.push(session);
      storage.set(walletAddress, 'sessions', sessions);
      storage.remove(walletAddress, 'current_chat');
    }

    return session;
  }, [sessionActive, sessionStart, walletAddress]);

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    sessionActive,
    sessionDuration,
    sessionMoodScores: moodScores.current,
    send,
    startSession,
    endSession,
    clearError,
  };
}
