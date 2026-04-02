import { MoodChart } from '@/components/mood/MoodChart';
import { MintButton } from '@/components/nft/MintButton';
import type { ProgressData, MoodEntry, MintParams } from '@/types';
import { LEVEL_EMOJIS, LEVEL_COLORS } from '@/lib/constants';
import { Flame, Target, Calendar, TrendingUp } from 'lucide-react';

interface DashboardPageProps {
  isConnected: boolean;
  progressData: ProgressData;
  moodTrend: MoodEntry[];
  canMint: boolean;
  isMinting: boolean;
  mintSuccess: boolean;
  onMint: (params: MintParams) => void;
}

export function DashboardPage({
  isConnected,
  progressData,
  moodTrend,
  canMint,
  isMinting,
  mintSuccess,
  onMint,
}: DashboardPageProps) {
  if (!isConnected) {
    return (
      <div className="dashboard-gate animate-fade-in-up">
        <span style={{ fontSize: '3rem' }}>📊</span>
        <h2 className="heading-2">Connect to View Dashboard</h2>
        <p className="text-body">Connect your wallet to see your progress.</p>
      </div>
    );
  }

  const levelColor = LEVEL_COLORS[progressData.level];

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <h1 className="heading-2">Your Progress</h1>
        <p className="text-body">Track your mental wellness journey</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid stagger-children">
        <div className="stat-card glass-card">
          <div className="stat-card-icon" style={{ background: `${levelColor}20` }}>
            <span style={{ fontSize: '1.5rem' }}>{LEVEL_EMOJIS[progressData.level]}</span>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value" style={{ color: levelColor }}>
              {progressData.level}
            </span>
            <span className="stat-card-label">Current Level</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-card-icon" style={{ background: 'rgba(108, 99, 255, 0.1)' }}>
            <Calendar size={24} style={{ color: 'var(--primary-400)' }} />
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{progressData.sessionsCompleted}</span>
            <span className="stat-card-label">Sessions</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-card-icon" style={{ background: 'rgba(56, 178, 172, 0.1)' }}>
            <TrendingUp size={24} style={{ color: 'var(--accent-400)' }} />
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{progressData.improvementScore}%</span>
            <span className="stat-card-label">Improvement</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-card-icon" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
            <Flame size={24} style={{ color: 'var(--warning)' }} />
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{progressData.currentStreak}</span>
            <span className="stat-card-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Chart + Mint */}
      <div className="dashboard-grid">
        <div className="dashboard-chart glass-card" style={{ padding: '24px' }}>
          <h3 className="heading-3" style={{ marginBottom: '16px' }}>
            <Target size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            Mood Over Time
          </h3>
          <MoodChart data={moodTrend} />
        </div>

        <div className="dashboard-mint">
          <MintButton
            progressData={progressData}
            canMint={canMint}
            isMinting={isMinting}
            mintSuccess={mintSuccess}
            onMint={onMint}
          />
        </div>
      </div>

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dashboard-gate {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 60vh;
          text-align: center;
        }

        .dashboard-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
        }

        .stat-card-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
        }

        .stat-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-card-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-card-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
          align-items: start;
        }

        .dashboard-chart {
          min-height: 380px;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
