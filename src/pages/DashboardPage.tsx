import { MoodChart } from '@/components/mood/MoodChart';
import { MintButton } from '@/components/nft/MintButton';
import type { ProgressData, MoodEntry, MintParams, MilestoneWithStatus } from '@/types';
import { LEVEL_EMOJIS, LEVEL_COLORS } from '@/lib/constants';
import { Flame, Target, Calendar, TrendingUp, Lock } from 'lucide-react';

interface DashboardPageProps {
  isConnected: boolean;
  progressData: ProgressData;
  moodTrend: MoodEntry[];
  milestones: MilestoneWithStatus[];
  mintedCount: number;
  isMinting: boolean;
  mintingMilestoneId: number | null;
  mintSuccess: boolean;
  onMint: (params: MintParams) => void;
  onResetMint: () => void;
}

function PreviewDashboard() {
  return (
    <div className="dashboard-preview animate-fade-in">
      <div className="preview-overlay">
        <div className="preview-overlay-content glass-card">
          <Lock size={32} style={{ color: 'var(--primary-400)' }} />
          <h2 className="heading-2">Your Dashboard Awaits</h2>
          <p className="text-body">Connect your wallet to track your mental wellness journey, view mood trends, and mint milestone NFTs.</p>
        </div>
      </div>

      {/* Blurred fake content */}
      <div className="preview-blurred">
        <div className="dashboard-header">
          <h1 className="heading-2">Your Progress</h1>
        </div>
        <div className="stats-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="stat-card glass-card">
              <div className="stat-card-icon" style={{ background: 'rgba(108, 99, 255, 0.1)' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }} />
              </div>
              <div className="stat-card-info">
                <span className="stat-card-value">—</span>
                <span className="stat-card-label">Loading...</span>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-chart glass-card" style={{ padding: 24, minHeight: 200 }}>
            <div style={{ width: '100%', height: 160, background: 'rgba(255,255,255,0.02)', borderRadius: 12 }} />
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-preview { position: relative; }
        .preview-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 20, 0.5);
          backdrop-filter: blur(2px);
          border-radius: var(--radius-lg);
        }
        .preview-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px;
          text-align: center;
          max-width: 400px;
        }
        .preview-blurred {
          filter: blur(4px);
          opacity: 0.5;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      `}</style>
    </div>
  );
}

export function DashboardPage({
  isConnected,
  progressData,
  moodTrend,
  milestones,
  mintedCount,
  isMinting,
  mintingMilestoneId,
  mintSuccess,
  onMint,
  onResetMint,
}: DashboardPageProps) {
  if (!isConnected) return <PreviewDashboard />;

  const levelColor = LEVEL_COLORS[progressData.level];

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <h1 className="heading-2">Your Progress</h1>
        <p className="text-body">Track your mental wellness journey</p>
      </div>

      <div className="stats-grid stagger-children">
        <div className="stat-card glass-card">
          <div className="stat-card-icon" style={{ background: `${levelColor}20` }}>
            <span style={{ fontSize: '1.5rem' }}>{LEVEL_EMOJIS[progressData.level]}</span>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value" style={{ color: levelColor }}>{progressData.level}</span>
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

      <div className="dashboard-chart glass-card" style={{ padding: '24px' }}>
        <h3 className="heading-3" style={{ marginBottom: '16px' }}>
          <Target size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          Mood Over Time
        </h3>
        <MoodChart data={moodTrend} />
      </div>

      <MintButton
        progressData={progressData}
        milestones={milestones}
        isMinting={isMinting}
        mintingMilestoneId={mintingMilestoneId}
        mintSuccess={mintSuccess}
        onMint={onMint}
        onResetMint={onResetMint}
      />

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 32px;
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
        .dashboard-chart {
          min-height: 300px;
        }
      `}</style>
    </div>
  );
}
