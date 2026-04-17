import { MoodChart } from '@/components/mood/MoodChart';
import { MintButton } from '@/components/nft/MintButton';
import type { ProgressData, MoodEntry, MintParams, MilestoneWithStatus } from '@/types';
import { LEVEL_EMOJIS } from '@/lib/constants';
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
          <Lock size={28} style={{ color: 'var(--text-muted)' }} />
          <h2 className="heading-2">Your Dashboard Awaits</h2>
          <p className="text-body">Connect your wallet to track your mental wellness journey.</p>
        </div>
      </div>
      <div className="preview-blurred">
        <div className="dashboard-header"><h1 className="heading-2">Your Progress</h1></div>
        <div className="stats-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="stat-card glass-card">
              <div className="stat-card-icon"><div style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }} /></div>
              <div className="stat-card-info"><span className="stat-card-value">—</span><span className="stat-card-label">Loading...</span></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .dashboard-preview { position: relative; }
        .preview-overlay { position: absolute; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; background: rgba(5,5,5,0.6); backdrop-filter: blur(4px); border-radius: var(--radius-xl); }
        .preview-overlay-content { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 44px; text-align: center; max-width: 400px; }
        .preview-blurred { filter: blur(4px); opacity: 0.3; pointer-events: none; display: flex; flex-direction: column; gap: 24px; }
      `}</style>
    </div>
  );
}

export function DashboardPage({ isConnected, progressData, moodTrend, milestones, mintedCount, isMinting, mintingMilestoneId, mintSuccess, onMint, onResetMint }: DashboardPageProps) {
  if (!isConnected) return <PreviewDashboard />;

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="heading-2">Your Progress</h1>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--platinum)' }}>wellness journey</span>
        </div>
      </div>

      <div className="stats-grid stagger-children">
        <div className="stat-card glass-card">
          <div className="stat-card-icon"><span style={{ fontSize: '1.3rem' }}>{LEVEL_EMOJIS[progressData.level]}</span></div>
          <div className="stat-card-info"><span className="stat-card-value">{progressData.level}</span><span className="stat-card-label">Level</span></div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-card-icon"><Calendar size={18} strokeWidth={1.5} /></div>
          <div className="stat-card-info"><span className="stat-card-value">{progressData.sessionsCompleted}</span><span className="stat-card-label">Sessions</span></div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-card-icon"><TrendingUp size={18} strokeWidth={1.5} /></div>
          <div className="stat-card-info"><span className="stat-card-value">{progressData.improvementScore}%</span><span className="stat-card-label">Improvement</span></div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-card-icon"><Flame size={18} strokeWidth={1.5} /></div>
          <div className="stat-card-info"><span className="stat-card-value">{progressData.currentStreak}</span><span className="stat-card-label">Streak</span></div>
        </div>
      </div>

      <div>
        <h3 className="heading-3" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={16} strokeWidth={1.5} /> Mood Over Time
        </h3>
        <MoodChart data={moodTrend} />
      </div>

      <MintButton progressData={progressData} milestones={milestones} isMinting={isMinting} mintingMilestoneId={mintingMilestoneId} mintSuccess={mintSuccess} onMint={onMint} onResetMint={onResetMint} />

      <style>{`
        .dashboard { display: flex; flex-direction: column; gap: 36px; }
        .dashboard-header { display: flex; flex-direction: column; gap: 4px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .stat-card { display: flex; align-items: center; gap: 16px; padding: 22px; }
        .stat-card-icon {
          width: 44px; height: 44px; min-width: 44px;
          display: flex; align-items: center; justify-content: center;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          border-radius: var(--radius-md); color: var(--text-secondary);
          backdrop-filter: blur(8px);
        }
        .stat-card-info { display: flex; flex-direction: column; gap: 2px; }
        .stat-card-value { font-size: 1.4rem; font-weight: 700; color: var(--text-primary); }
        .stat-card-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
      `}</style>
    </div>
  );
}
