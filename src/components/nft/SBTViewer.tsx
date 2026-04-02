import type { ProgressData } from '@/types';
import { LEVEL_EMOJIS, LEVEL_COLORS } from '@/lib/constants';
import { Shield, Calendar, TrendingUp, Flame } from 'lucide-react';

interface SBTViewerProps {
  progressData: ProgressData;
  hasMinted: boolean;
  txHash?: string | null;
  walletAddress?: string;
}

export function SBTViewer({ progressData, hasMinted, txHash, walletAddress }: SBTViewerProps) {
  if (!hasMinted) {
    return (
      <div className="sbt-empty">
        <Shield size={48} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
        <p className="text-body">No Soulbound Token minted yet.</p>
        <p className="text-small">Complete sessions and mint your first SBT to see it here.</p>
      </div>
    );
  }

  const levelColor = LEVEL_COLORS[progressData.level];

  return (
    <div className="sbt-viewer animate-fade-in-up">
      <div className="sbt-card">
        {/* Animated gradient border */}
        <div className="sbt-card-glow" style={{ background: `linear-gradient(135deg, ${levelColor}, var(--primary-500))` }} />

        <div className="sbt-card-inner">
          {/* Header */}
          <div className="sbt-header">
            <span className="sbt-badge">SOULBOUND</span>
            <Shield size={16} style={{ color: levelColor }} />
          </div>

          {/* Level Display */}
          <div className="sbt-level">
            <span className="sbt-level-emoji">{LEVEL_EMOJIS[progressData.level]}</span>
            <span className="sbt-level-name" style={{ color: levelColor }}>
              {progressData.level}
            </span>
          </div>

          {/* Stats */}
          <div className="sbt-stats">
            <div className="sbt-stat-row">
              <Calendar size={14} />
              <span>Sessions: {progressData.sessionsCompleted}</span>
            </div>
            <div className="sbt-stat-row">
              <TrendingUp size={14} />
              <span>Improvement: {progressData.improvementScore}%</span>
            </div>
            <div className="sbt-stat-row">
              <Flame size={14} />
              <span>Streak: {progressData.currentStreak} days</span>
            </div>
          </div>

          {/* Footer */}
          <div className="sbt-footer">
            <span className="text-small">Owner: {walletAddress?.slice(0, 10)}...</span>
            {txHash && (
              <span className="text-small" style={{ color: 'var(--primary-400)' }}>
                tx: {txHash.slice(0, 10)}...
              </span>
            )}
          </div>

          {/* Non-transferable notice */}
          <div className="sbt-notice">
            <Shield size={12} />
            <span>Non-transferable · Permanently bound to your wallet</span>
          </div>
        </div>
      </div>

      <style>{`
        .sbt-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 48px;
          text-align: center;
        }

        .sbt-viewer {
          display: flex;
          justify-content: center;
        }

        .sbt-card {
          position: relative;
          width: 320px;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .sbt-card-glow {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% auto;
        }

        .sbt-card-inner {
          position: relative;
          padding: 28px;
          background: rgba(15, 14, 23, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sbt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sbt-badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          padding: 4px 10px;
          background: var(--surface-glass);
          border-radius: var(--radius-full);
          border: 1px solid var(--surface-border);
        }

        .sbt-level {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 0;
        }

        .sbt-level-emoji {
          font-size: 3.5rem;
          animation: float 3s ease-in-out infinite;
        }

        .sbt-level-name {
          font-size: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sbt-stats {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
          background: var(--surface-glass);
          border-radius: var(--radius-md);
        }

        .sbt-stat-row {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .sbt-footer {
          display: flex;
          justify-content: space-between;
        }

        .sbt-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: rgba(74, 222, 128, 0.05);
          border: 1px solid rgba(74, 222, 128, 0.15);
          border-radius: var(--radius-md);
          color: var(--success);
          font-size: 0.7rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
