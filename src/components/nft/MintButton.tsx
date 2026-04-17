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
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--platinum)' }}>
          proof of resilience
        </span>
      </div>

      <div className="milestones-grid">
        {milestones.map((m) => {
          const isThisMinting = isMinting && mintingMilestoneId === m.id;
          const progress = Math.min(100, (progressData.sessionsCompleted / m.sessions) * 100);

          return (
            <div
              key={m.id}
              className={`milestone-card ${m.status} ${isThisMinting ? 'minting' : ''}`}
              style={{ '--milestone-color': m.color } as React.CSSProperties}
            >
              {/* Holographic shimmer overlay */}
              {m.status !== 'locked' && <div className="holo-shimmer" />}

              <div className={`milestone-badge ${m.status}`}>
                {m.status === 'minted' && <><CheckCircle2 size={10} /> Minted</>}
                {m.status === 'unlocked' && <><Sparkles size={10} /> Ready</>}
                {m.status === 'locked' && <><Lock size={10} /> Locked</>}
              </div>

              <div className="milestone-icon">
                <span style={{ fontSize: m.status === 'locked' ? '1.8rem' : '2.2rem', filter: m.status === 'locked' ? 'grayscale(1) opacity(0.25)' : 'none' }}>
                  {m.emoji}
                </span>
              </div>

              <div className="milestone-tier" style={{ color: m.status === 'locked' ? 'var(--text-muted)' : m.color }}>
                {m.tier}
              </div>
              <div className="milestone-name">{m.name}</div>

              <div className="milestone-progress">
                <div className="milestone-progress-bar">
                  <div
                    className="milestone-progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: m.status === 'locked' ? 'rgba(255,255,255,0.08)' : m.color,
                      boxShadow: m.status !== 'locked' ? `0 0 12px ${m.color}66` : 'none',
                    }}
                  />
                </div>
                <span className="milestone-progress-text">
                  {Math.min(progressData.sessionsCompleted, m.sessions)}/{m.sessions} sessions
                </span>
              </div>

              {m.status === 'unlocked' && (
                <button
                  onClick={() => handleMint(m)}
                  disabled={isMinting}
                  className="btn btn-lg milestone-mint-btn"
                >
                  {isThisMinting ? (
                    <><Loader2 size={14} className="animate-spin-slow" /> Minting...</>
                  ) : (
                    <><Sparkles size={14} /> Mint NFT</>
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
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          transition: all var(--transition-slow);
          overflow: hidden;
        }

        .milestone-card:hover {
          border-color: var(--glass-border-hover);
          transform: translateY(-4px);
          box-shadow: var(--glow-white-strong);
        }

        /* Holographic shimmer */
        .holo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.03) 30%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.03) 70%,
            transparent 80%
          );
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          border-radius: inherit;
        }

        .milestone-card:hover .holo-shimmer {
          opacity: 1;
          animation: shimmerHolo 1.5s ease-in-out;
        }

        .milestone-card.unlocked {
          border-color: rgba(255,255,255,0.15);
        }

        .milestone-card.minting {
          box-shadow: 0 0 40px rgba(255,255,255,0.08);
        }

        .milestone-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          backdrop-filter: blur(8px);
        }

        .milestone-badge.unlocked {
          color: var(--text-primary);
          border-color: var(--glass-border-hover);
          background: var(--glass-bg-hover);
        }

        .milestone-badge.minted {
          color: var(--success);
          border-color: rgba(163, 230, 53, 0.2);
          background: rgba(163, 230, 53, 0.06);
        }

        .milestone-icon {
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .milestone-tier {
          font-size: 1.05rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .milestone-name {
          font-size: 0.72rem;
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
          height: 4px;
          background: rgba(255,255,255,0.04);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .milestone-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.6s ease-out;
        }

        .milestone-progress-text {
          font-size: 0.62rem;
          color: var(--text-muted);
        }

        .milestone-mint-btn {
          width: 100%;
          background: #ffffff !important;
          color: #000000 !important;
          font-weight: 700;
          border: none !important;
        }

        .milestone-mint-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
        }

        .milestone-tx {
          font-size: 0.62rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  );
}
