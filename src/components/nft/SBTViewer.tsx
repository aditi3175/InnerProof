import type { MilestoneWithStatus } from '@/types';
import { Shield, Calendar, TrendingUp, Flame, Lock } from 'lucide-react';

interface SBTViewerProps {
  milestones: MilestoneWithStatus[];
  mintedCount: number;
  walletAddress?: string;
}

export function SBTViewer({ milestones, mintedCount, walletAddress }: SBTViewerProps) {
  if (mintedCount === 0) {
    return (
      <div className="sbt-empty">
        <Shield size={48} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
        <p className="text-body">No Soulbound Tokens minted yet.</p>
        <p className="text-small">Complete sessions and mint your first milestone NFT!</p>
      </div>
    );
  }

  const minted = milestones.filter(m => m.status === 'minted');

  return (
    <div className="sbt-gallery animate-fade-in-up">
      <div className="sbt-gallery-grid">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={`sbt-nft-card ${m.status === 'minted' ? 'minted' : 'future'}`}
            style={{ '--nft-color': m.color } as React.CSSProperties}
          >
            {m.status === 'minted' ? (
              <>
                <div className="sbt-nft-shimmer" />
                <div className="sbt-nft-inner">
                  <div className="sbt-nft-header">
                    <span className="sbt-nft-badge">SOULBOUND</span>
                    <Shield size={14} style={{ color: m.color }} />
                  </div>

                  <div className="sbt-nft-emoji">{m.emoji}</div>
                  <div className="sbt-nft-tier" style={{ color: m.color }}>{m.tier}</div>
                  <div className="sbt-nft-name">{m.name}</div>

                  <div className="sbt-nft-stats">
                    <div className="sbt-nft-stat">
                      <Calendar size={12} />
                      <span>{m.sessions} sessions</span>
                    </div>
                    {m.mintedAt && (
                      <div className="sbt-nft-stat">
                        <Flame size={12} />
                        <span>{new Date(m.mintedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {m.txHash && (
                    <div className="sbt-nft-tx">
                      tx: {m.txHash.slice(0, 14)}...
                    </div>
                  )}

                  <div className="sbt-nft-bound">
                    <Shield size={10} />
                    <span>Non-transferable</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="sbt-nft-inner sbt-nft-locked">
                <Lock size={24} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
                <span className="sbt-nft-emoji" style={{ fontSize: '1.8rem', filter: 'grayscale(1) opacity(0.3)' }}>
                  {m.emoji}
                </span>
                <div className="sbt-nft-tier" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.tier}</div>
                <div className="sbt-nft-name" style={{ opacity: 0.4 }}>{m.sessions} sessions</div>
              </div>
            )}
          </div>
        ))}
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

        .sbt-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .sbt-nft-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .sbt-nft-card.minted:hover {
          transform: translateY(-4px);
        }

        .sbt-nft-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--nft-color) 15%, transparent),
            transparent 50%,
            color-mix(in srgb, var(--nft-color) 10%, transparent)
          );
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }

        .sbt-nft-inner {
          position: relative;
          padding: 20px;
          background: rgba(15, 14, 23, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .sbt-nft-card.minted .sbt-nft-inner {
          border-color: color-mix(in srgb, var(--nft-color) 30%, transparent);
        }

        .sbt-nft-locked {
          min-height: 200px;
          justify-content: center;
          opacity: 0.5;
        }

        .sbt-nft-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sbt-nft-badge {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          padding: 2px 8px;
          background: var(--surface-glass);
          border-radius: var(--radius-full);
          border: 1px solid var(--surface-border);
        }

        .sbt-nft-emoji {
          font-size: 2.5rem;
          animation: float 3s ease-in-out infinite;
        }

        .sbt-nft-tier {
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .sbt-nft-name {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .sbt-nft-stats {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px;
          background: var(--surface-glass);
          border-radius: var(--radius-md);
        }

        .sbt-nft-stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .sbt-nft-tx {
          font-size: 0.65rem;
          color: var(--primary-400);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        .sbt-nft-bound {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(74, 222, 128, 0.05);
          border: 1px solid rgba(74, 222, 128, 0.12);
          border-radius: var(--radius-md);
          color: var(--success);
          font-size: 0.6rem;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .sbt-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
