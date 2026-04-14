// ========== Chat Types ==========
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  moodScore?: number;
}

export interface ChatSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  messages: ChatMessage[];
  averageMood: number;
  selfRating?: number;
}

// ========== Mood Types ==========
export interface MoodEntry {
  date: string;
  sessionScore: number;
  selfRating: number;
  combinedScore: number;
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
  improvementScore: number;
  sessionsCompleted: number;
  currentStreak: number;
  levelProgress: number;
}

// ========== Milestone Types ==========
export interface Milestone {
  id: number;
  sessions: number;
  tier: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  ipfsFile: string;
}

export type MilestoneStatus = 'locked' | 'unlocked' | 'minted';

export interface MintedMilestone {
  milestoneId: number;
  txHash: string;
  mintedAt: number;
}

export interface MilestoneWithStatus extends Milestone {
  status: MilestoneStatus;
  txHash?: string;
  mintedAt?: number;
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
  milestoneId: number;
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
