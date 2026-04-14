import { Loader2, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import type { MilestoneWithStatus, MintParams, ProgressData } from '@/types';
import { ConfettiEffect } from './ConfettiEffect';

interface MintButtonProps {
  progressData: ProgressData;
  milestones: MilestoneWithStatus[];
  isMinting: boolean;
  mintingMilestoneId: number | null;
  mintSuccess: boolean;
  onMint: (params: MintParams) => void;
  onResetMint: () => void;
}

export function MintButton({
  progressData,
  milestones,
  isMinting,
  mintingMilestoneId,
  mintSuccess,
  onMint,
  onResetMint,
}: MintButtonProps) {
  const handleMint = (milestone: MilestoneWithStatus) => {
    if (milestone.status !== 'unlocked' || isMinting) return;
    const baseCid = 'ipfs://bafybeih2kve2yp2a6p5aclb7ehzemkyaclsoj3mxegxfbtz3ip5yju4my4/';
    onMint({
      milestoneId: milestone.id,
      sessionsCompleted: progressData.sessionsCompleted,
      improvementScore: progressData.improvementScore,
      level: progressData.level,
      timestamp: Math.floor(Date.now() / 1000),
      metadataUri: `${baseCid}${milestone.ipfsFile}`,
    });
  };

  return (
    <div className="milestones-container animate-fade-in">
      <ConfettiEffect active={mintSuccess} />

      <div className="milestones-header">
        <h3 className="heading-3">Milestone Achievements</h3>
        <p className="text-body">Earn Soulbound NFTs as you progress through your journey</p>
      </div>

      <div className="milestones-grid">
        {milestones.map((m) => {
          const isThisMinting = isMinting && mintingMilestoneId === m.id;
          const progress = Math.min(100, (progressData.sessionsCompleted / m.sessions) * 100);

          return (
            <div
              key={m.id}
              className={`milestone-card glass-card ${m.status} ${isThisMinting ? 'minting' : ''}`}
              style={{ '--milestone-color': m.color } as React.CSSProperties}
            >
              {/* Status badge */}
              <div className="milestone-badge">
                {m.status === 'minted' && <><CheckCircle2 size={12} /> Minted</>}
                {m.status === 'unlocked' && <><Sparkles size={12} /> Ready!</>}
                {m.status === 'locked' && <><Lock size={12} /> Locked</>}
              </div>

              {/* Emoji + tier */}
              <div className="milestone-icon">
                <span style={{ fontSize: m.status === 'locked' ? '2rem' : '2.5rem', filter: m.status === 'locked' ? 'grayscale(1) opacity(0.4)' : 'none' }}>
                  {m.emoji}
                </span>
              </div>

              <div className="milestone-tier" style={{ color: m.status === 'locked' ? 'var(--text-muted)' : m.color }}>
                {m.tier}
              </div>
              <div className="milestone-name">{m.name}</div>

              {/* Progress bar */}
              <div className="milestone-progress">
                <div className="milestone-progress-bar">
                  <div
                    className="milestone-progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: m.status === 'locked' ? 'rgba(255,255,255,0.15)' : `linear-gradient(90deg, ${m.color}, ${m.color}aa)`,
                    }}
                  />
                </div>
                <span className="milestone-progress-text">
                  {Math.min(progressData.sessionsCompleted, m.sessions)}/{m.sessions} sessions
                </span>
              </div>

              {/* Action */}
              {m.status === 'unlocked' && (
                <button
                  onClick={() => handleMint(m)}
                  disabled={isMinting}
                  className="btn btn-lg milestone-mint-btn"
                  style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}
                >
                  {isThisMinting ? (
                    <><Loader2 size={16} className="animate-spin-slow" /> Minting...</>
                  ) : (
                    <><Sparkles size={16} /> Mint NFT</>
                  )}
                </button>
              )}

              {m.status === 'minted' && m.txHash && (
                <div className="milestone-tx">
                  tx: {m.txHash.slice(0, 12)}...
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .milestones-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .milestones-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .milestone-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .milestone-card.unlocked {
          border-color: var(--milestone-color) !important;
          box-shadow: 0 0 30px color-mix(in srgb, var(--milestone-color) 20%, transparent);
        }

        .milestone-card.unlocked::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, color-mix(in srgb, var(--milestone-color) 8%, transparent), transparent);
          pointer-events: none;
        }

        .milestone-card.minted {
          border-color: color-mix(in srgb, var(--milestone-color) 40%, transparent) !important;
        }

        .milestone-card.minting {
          animation: pulseGlow 1.5s ease-in-out infinite;
        }

        .milestone-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: var(--surface-glass);
          border: 1px solid var(--surface-border);
          color: var(--text-muted);
        }

        .milestone-card.unlocked .milestone-badge {
          color: var(--milestone-color);
          border-color: var(--milestone-color);
          background: color-mix(in srgb, var(--milestone-color) 10%, transparent);
        }

        .milestone-card.minted .milestone-badge {
          color: var(--success);
          border-color: var(--success);
          background: rgba(74, 222, 128, 0.1);
        }

        .milestone-icon {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .milestone-tier {
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .milestone-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .milestone-progress {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .milestone-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .milestone-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.6s ease-out;
        }

        .milestone-progress-text {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .milestone-mint-btn {
          width: 100%;
          color: #000 !important;
          font-weight: 700;
          border: none !important;
        }

        .milestone-mint-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .milestone-tx {
          font-size: 0.7rem;
          color: var(--primary-400);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
