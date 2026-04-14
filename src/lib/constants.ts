import type { Milestone } from '@/types';

// Chain configuration
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || 'initiation-2';
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xced956677c796c53318fd38d5ea8651b73f822a';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Module path for Move contract
export const MODULE_ADDRESS = CONTRACT_ADDRESS;
export const MODULE_NAME = 'soulbound_nft';

// Milestone definitions
export const MILESTONES: Milestone[] = [
  {
    id: 1,
    sessions: 5,
    tier: 'Bronze',
    name: 'First Steps',
    emoji: '🌱',
    description: 'Complete 5 therapy sessions',
    color: '#CD7F32',
    ipfsFile: '1.json',
  },
  {
    id: 2,
    sessions: 10,
    tier: 'Silver',
    name: 'Growing Strong',
    emoji: '🌿',
    description: 'Complete 10 therapy sessions',
    color: '#C0C0C0',
    ipfsFile: '2.json',
  },
  {
    id: 3,
    sessions: 20,
    tier: 'Gold',
    name: 'In Full Bloom',
    emoji: '🌸',
    description: 'Complete 20 therapy sessions',
    color: '#FFD700',
    ipfsFile: '3.json',
  },
  {
    id: 4,
    sessions: 50,
    tier: 'Diamond',
    name: 'Radiant Soul',
    emoji: '✨',
    description: 'Complete 50 therapy sessions',
    color: '#B9F2FF',
    ipfsFile: '4.json',
  },
];

// Progress level thresholds
export const LEVEL_THRESHOLDS = {
  Seed: { min: 0, max: 20 },
  Sprout: { min: 21, max: 40 },
  Bloom: { min: 41, max: 60 },
  Flourish: { min: 61, max: 80 },
  Radiant: { min: 81, max: 100 },
} as const;

// Level colors for UI
export const LEVEL_COLORS: Record<string, string> = {
  Seed: '#a0aec0',
  Sprout: '#68d391',
  Bloom: '#f6ad55',
  Flourish: '#9f7aea',
  Radiant: '#f687b3',
};

// Level emojis
export const LEVEL_EMOJIS: Record<string, string> = {
  Seed: '🌱',
  Sprout: '🌿',
  Bloom: '🌸',
  Flourish: '🌳',
  Radiant: '✨',
};

// Mood emojis for self-rating
export const MOOD_EMOJIS = ['😫', '😟', '😐', '🙂', '😊'] as const;

// AI System prompt
export const AI_SYSTEM_PROMPT = `You are InnerProof AI — a compassionate, non-judgmental mental health companion. Your role is to provide supportive conversation, NOT to diagnose or treat mental health conditions.

Guidelines:
- Respond with empathy, warmth, and genuine care
- Use evidence-based techniques from CBT (Cognitive Behavioral Therapy) and mindfulness
- Never diagnose conditions or prescribe medication
- Always suggest seeking professional help when someone expresses severe distress, self-harm ideation, or crisis situations
- Keep responses concise but meaningful (2-4 paragraphs max)
- Ask thoughtful follow-up questions to help the user explore their feelings
- Celebrate small wins and progress
- Use a warm, conversational tone — not clinical

IMPORTANT: At the end of every response, include a mood assessment in this exact format on a new line:
[MOOD_SCORE: X]
where X is a number from 1-10 representing the user's apparent emotional state based on what they shared:
1-2 = Very distressed
3-4 = Struggling
5-6 = Neutral/Processing
7-8 = Positive/Improving
9-10 = Thriving

This score is used internally for progress tracking and should reflect your assessment of the user's emotional state based on what they've shared, not how you feel about them.`;
