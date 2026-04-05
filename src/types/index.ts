// ========== Chat Types ==========
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  moodScore?: number; // 1-10 scale from AI
}

export interface ChatSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  messages: ChatMessage[];
  averageMood: number;
  selfRating?: number; // User's self-assessment at end
}

// ========== Mood Types ==========
export interface MoodEntry {
  date: string; // ISO date string
  sessionScore: number; // AI-derived score
  selfRating: number; // User's self-rating 1-5
  combinedScore: number; // Weighted average
  sessionsCompleted: number;
}

export interface MoodHistory {
  entries: MoodEntry[];
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  firstSessionDate: string;
  lastSessionDate: string;
}

export type ProgressLevel = 'Seed' | 'Sprout' | 'Bloom' | 'Flourish' | 'Radiant';

export interface ProgressData {
  level: ProgressLevel;
  improvementScore: number; // 0-100
  sessionsCompleted: number;
  currentStreak: number;
  levelProgress: number; // 0-100 within current level
}

// ========== SBT Types ==========
export interface SoulboundToken {
  owner: string;
  sessionsCompleted: number;
  improvementScore: number;
  level: ProgressLevel;
  mintedAt: number;
  lastUpdated: number;
}

export interface MintParams {
  sessionsCompleted: number;
  improvementScore: number;
  level: string;
  timestamp: number;
  metadataUri: string;
}

// ========== Nav Types ==========
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
