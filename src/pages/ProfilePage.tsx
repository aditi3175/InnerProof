import { SBTViewer } from '@/components/nft/SBTViewer';
import type { ProgressData, MilestoneWithStatus } from '@/types';
import { getSessions } from '@/hooks/useMoodTracker';
import { MessageCircle, ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  isConnected: boolean;
  walletAddress?: string;
  progressData: ProgressData;
  milestones: MilestoneWithStatus[];
  mintedCount: number;
}

function PreviewProfile() {
  return (
    <div className="profile-preview animate-fade-in">
      <div className="preview-overlay" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="preview-overlay-content glass-card">
          <Lock size={32} style={{ color: 'var(--primary-400)' }} />
          <h2 className="heading-2">Your Profile</h2>
          <p className="text-body">Connect your wallet to view your profile, session history, and NFT collection.</p>
        </div>
      </div>

      <div className="preview-blurred">
        <div className="profile-header">
          <h1 className="heading-2">Your Profile</h1>
        </div>
        <div className="profile-grid">
          <div className="profile-wallet glass-card" style={{ padding: 24 }}>
            <h3 className="heading-3">Wallet</h3>
            <div style={{ height: 40, width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: 8, marginTop: 12 }} />
          </div>
          <div className="glass-card" style={{ padding: 24, minHeight: 200 }}>
            <h3 className="heading-3">NFT Collection</h3>
          </div>
          <div className="glass-card" style={{ padding: 24, minHeight: 200 }}>
            <h3 className="heading-3">Session History</h3>
          </div>
        </div>
      </div>

      <style>{`
        .profile-preview { position: relative; }
        .preview-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 20, 0.5);
          backdrop-filter: blur(2px);
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

export function ProfilePage({
  isConnected,
  walletAddress,
  progressData,
  milestones,
  mintedCount,
}: ProfilePageProps) {
  const navigate = useNavigate();

  if (!isConnected || !walletAddress) return <PreviewProfile />;

  const sessions = getSessions(walletAddress);

  return (
    <div className="profile animate-fade-in">
      <div className="profile-header">
        <h1 className="heading-2">Your Profile</h1>
        <button
          onClick={() => navigate('/chat')}
          className="btn btn-primary"
          id="profile-start-session-btn"
        >
          <MessageCircle size={18} /> New Session <ArrowRight size={16} />
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-wallet glass-card" style={{ padding: '24px' }}>
          <h3 className="heading-3">Wallet</h3>
          <div className="wallet-display">
            <div className="wallet-display-avatar" />
            <div>
              <p style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '0.85rem', wordBreak: 'break-all' }}>
                {walletAddress}
              </p>
              <p className="text-small" style={{ marginTop: '4px' }}>
                Connected · Initia Testnet
              </p>
            </div>
          </div>
        </div>

        <div className="profile-sbt" style={{ gridColumn: '1 / -1' }}>
          <h3 className="heading-3" style={{ marginBottom: '16px' }}>
            NFT Collection ({mintedCount}/4)
          </h3>
          <SBTViewer
            milestones={milestones}
            mintedCount={mintedCount}
            walletAddress={walletAddress}
          />
        </div>

        <div className="profile-history glass-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
          <h3 className="heading-3" style={{ marginBottom: '16px' }}>Session History</h3>
          {sessions.length === 0 ? (
            <p className="text-body" style={{ textAlign: 'center', padding: '24px 0' }}>
              No sessions yet. Start your first session!
            </p>
          ) : (
            <div className="session-list">
              {sessions.slice().reverse().slice(0, 10).map((session, i) => (
                <div key={session.id || i} className="session-row">
                  <div className="session-row-info">
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      Session #{sessions.length - i}
                    </span>
                    <span className="text-small">
                      {new Date(session.startedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="session-row-score">
                    <span style={{
                      color: session.averageMood >= 7 ? 'var(--success)' :
                             session.averageMood >= 4 ? 'var(--warning)' : 'var(--error)',
                      fontWeight: 700, fontSize: '1rem',
                    }}>
                      {session.averageMood.toFixed(1)}
                    </span>
                    <span className="text-small">/10</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .profile { display: flex; flex-direction: column; gap: 32px; }
        .profile-header {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .profile-grid {
          display: grid; grid-template-columns: 1fr; gap: 24px;
        }
        .wallet-display {
          display: flex; align-items: center; gap: 16px; margin-top: 12px;
        }
        .wallet-display-avatar {
          width: 40px; height: 40px; min-width: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
        }
        .session-list { display: flex; flex-direction: column; gap: 8px; }
        .session-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: var(--surface-glass);
          border-radius: var(--radius-md); border: 1px solid var(--surface-border);
          transition: all var(--transition-fast);
        }
        .session-row:hover { background: var(--surface-glass-hover); }
        .session-row-info { display: flex; flex-direction: column; gap: 2px; }
        .session-row-score { display: flex; align-items: baseline; gap: 2px; }
      `}</style>
    </div>
  );
}
