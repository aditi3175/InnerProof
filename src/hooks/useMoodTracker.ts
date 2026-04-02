import { useState, useCallback, useEffect } from 'react';
import type { MoodEntry, MoodHistory, ProgressData, ChatSession } from '@/types';
import { storage } from '@/lib/storage';
import {
  calculateCombinedScore,
  calculateImprovement,
  getProgressLevel,
  getLevelProgress,
  calculateStreak,
} from '@/lib/sentiment';
import { MIN_SESSIONS_TO_MINT } from '@/lib/constants';

interface UseMoodTrackerReturn {
  moodHistory: MoodHistory;
  progressData: ProgressData;
  canMint: boolean;
  addMoodEntry: (sessionScore: number, selfRating: number) => void;
  getMoodTrend: () => MoodEntry[];
}

const defaultHistory: MoodHistory = {
  entries: [],
  totalSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  firstSessionDate: '',
  lastSessionDate: '',
};

const defaultProgress: ProgressData = {
  level: 'Seed',
  improvementScore: 0,
  sessionsCompleted: 0,
  currentStreak: 0,
  levelProgress: 0,
};

export function useMoodTracker(walletAddress: string | undefined): UseMoodTrackerReturn {
  const [moodHistory, setMoodHistory] = useState<MoodHistory>(defaultHistory);
  const [progressData, setProgressData] = useState<ProgressData>(defaultProgress);

  // Load from localStorage on mount
  useEffect(() => {
    if (!walletAddress) return;

    const saved = storage.get<MoodHistory>(walletAddress, 'mood_history');
    if (saved) {
      setMoodHistory(saved);
      updateProgressFromHistory(saved);
    }
  }, [walletAddress]);

  const updateProgressFromHistory = useCallback((history: MoodHistory) => {
    const scores = history.entries.map(e => e.combinedScore);
    const improvement = calculateImprovement(scores);
    const dates = history.entries.map(e => e.date);
    const streak = calculateStreak(dates);

    const progress: ProgressData = {
      level: getProgressLevel(improvement),
      improvementScore: improvement,
      sessionsCompleted: history.totalSessions,
      currentStreak: streak,
      levelProgress: getLevelProgress(improvement),
    };

    setProgressData(progress);
  }, []);

  const addMoodEntry = useCallback((sessionScore: number, selfRating: number) => {
    if (!walletAddress) return;

    const today = new Date().toISOString().split('T')[0];
    const combinedScore = calculateCombinedScore(sessionScore, selfRating);

    const newEntry: MoodEntry = {
      date: today,
      sessionScore,
      selfRating,
      combinedScore,
      sessionsCompleted: moodHistory.totalSessions + 1,
    };

    const updatedEntries = [...moodHistory.entries, newEntry];
    const dates = updatedEntries.map(e => e.date);
    const streak = calculateStreak(dates);

    const updated: MoodHistory = {
      entries: updatedEntries,
      totalSessions: moodHistory.totalSessions + 1,
      currentStreak: streak,
      longestStreak: Math.max(moodHistory.longestStreak, streak),
      firstSessionDate: moodHistory.firstSessionDate || today,
      lastSessionDate: today,
    };

    setMoodHistory(updated);
    updateProgressFromHistory(updated);
    storage.set(walletAddress, 'mood_history', updated);
  }, [walletAddress, moodHistory, updateProgressFromHistory]);

  const getMoodTrend = useCallback((): MoodEntry[] => {
    return moodHistory.entries.slice(-30); // Last 30 entries
  }, [moodHistory]);

  const canMint = progressData.sessionsCompleted >= MIN_SESSIONS_TO_MINT;

  return {
    moodHistory,
    progressData,
    canMint,
    addMoodEntry,
    getMoodTrend,
  };
}

// Helper to get sessions from storage
export function getSessions(walletAddress: string): ChatSession[] {
  return storage.get<ChatSession[]>(walletAddress, 'sessions') || [];
}
