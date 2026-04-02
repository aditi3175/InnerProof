import type { ProgressLevel } from '@/types';
import { LEVEL_THRESHOLDS } from './constants';

/**
 * Extract mood score from AI response
 * The AI includes [MOOD_SCORE: X] at the end of each response
 */
export function extractMoodScore(response: string): number {
  const match = response.match(/\[MOOD_SCORE:\s*(\d+(?:\.\d+)?)\]/);
  if (match) {
    const score = parseFloat(match[1]);
    return Math.min(10, Math.max(1, score));
  }
  return 5; // Default neutral if not found
}

/**
 * Remove mood score tag from AI response for display
 */
export function cleanResponse(response: string): string {
  return response.replace(/\n?\[MOOD_SCORE:\s*\d+(?:\.\d+)?\]/, '').trim();
}

/**
 * Calculate session average mood from an array of mood scores
 */
export function calculateSessionAverage(scores: number[]): number {
  if (scores.length === 0) return 5;
  const sum = scores.reduce((a, b) => a + b, 0);
  return Math.round((sum / scores.length) * 10) / 10;
}

/**
 * Calculate improvement percentage between first and latest sessions
 */
export function calculateImprovement(sessionScores: number[]): number {
  if (sessionScores.length < 2) return 0;
  const first = sessionScores[0];
  const latest = sessionScores[sessionScores.length - 1];
  if (first === 0) return 0;
  const improvement = ((latest - first) / first) * 100;
  return Math.min(100, Math.max(0, Math.round(improvement)));
}

/**
 * Convert combined score to a weighted value (0-100)
 * aiScore: 1-10, selfRating: 1-5
 */
export function calculateCombinedScore(aiScore: number, selfRating: number): number {
  const normalizedAi = (aiScore / 10) * 100;
  const normalizedSelf = (selfRating / 5) * 100;
  // 60% AI weight, 40% self-assessment weight
  return Math.round(normalizedAi * 0.6 + normalizedSelf * 0.4);
}

/**
 * Determine progress level based on improvement score (0-100)
 */
export function getProgressLevel(improvementScore: number): ProgressLevel {
  for (const [level, { min, max }] of Object.entries(LEVEL_THRESHOLDS)) {
    if (improvementScore >= min && improvementScore <= max) {
      return level as ProgressLevel;
    }
  }
  return 'Seed';
}

/**
 * Calculate progress within current level (0-100)
 */
export function getLevelProgress(improvementScore: number): number {
  const level = getProgressLevel(improvementScore);
  const { min, max } = LEVEL_THRESHOLDS[level];
  const range = max - min;
  if (range === 0) return 100;
  return Math.round(((improvementScore - min) / range) * 100);
}

/**
 * Calculate streak from dates array
 */
export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort().reverse();
  const today = new Date().toISOString().split('T')[0];

  // Check if the most recent entry is today or yesterday
  const mostRecent = sorted[0];
  const daysSinceLastEntry = Math.floor(
    (new Date(today).getTime() - new Date(mostRecent).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastEntry > 1) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = Math.floor(
      (new Date(sorted[i - 1]).getTime() - new Date(sorted[i]).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
