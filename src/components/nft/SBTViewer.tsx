import type { MilestoneWithStatus } from '@/types';
import { Shield, Calendar, Flame, Lock } from 'lucide-react';

interface SBTViewerProps {
  milestones: MilestoneWithStatus[];
  mintedCount: number;
  walletAddress?: string;
}

export function SBTViewer({ milestones, mintedCount, walletAddress }: SBTViewerProps) {
  if (mintedCount === 0) {
    return (
      <div className="sbt-empty">
        <Shield size={40} style={{ color: 'var(--text-muted)', opacity: 0.15 }} />
        <p className="text-body">No Soulbound Tokens minted yet.</p>
        <p className="text-small">Complete sessions and mint your first milestone NFT!</p>
      </div>
    );
  }

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
                <div className="sbt-holo-shimmer" />
                <div className="sbt-nft-inner">
                  <div className="sbt-nft-header">
                    <span className="sbt-nft-badge">SOULBOUND</span>
                    <Shield size={12} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div className="sbt-nft-emoji">{m.emoji}</div>
                  <div className="sbt-nft-tier" style={{ color: m.color }}>{m.tier}</div>
                  <div className="sbt-nft-name">{m.name}</div>
                  <div className="sbt-nft-stats">
                    <div className="sbt-nft-stat"><Calendar size={11} /><span>{m.sessions} sessions</span></div>
                    {m.mintedAt && <div className="sbt-nft-stat"><Flame size={11} /><span>{new Date(m.mintedAt).toLocaleDateString()}</span></div>}
                  </div>
                  {m.txHash && <div className="sbt-nft-tx">tx: {m.txHash.slice(0, 14)}...</div>}
                  <div className="sbt-nft-bound"><Shield size={9} /><span>Non-transferable</span></div>
                </div>
              </>
            ) : (
              <div className="sbt-nft-inner sbt-nft-locked">
                <Lock size={20} style={{ color: 'var(--text-muted)', opacity: 0.15 }} />
                <span className="sbt-nft-emoji" style={{ fontSize: '1.6rem', filter: 'grayscale(1) opacity(0.15)' }}>{m.emoji}</span>
                <div className="sbt-nft-tier" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.tier}</div>
                <div className="sbt-nft-name" style={{ opacity: 0.25 }}>{m.sessions} sessions</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .sbt-empty {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 48px; text-align: center;
        }
        .sbt-gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;
        }
        .sbt-nft-card {
          position: relative; overflow: hidden;
          background: var(--glass-bg); backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border); border-radius: var(--radius-xl);
          transition: all var(--transition-slow);
        }
        .sbt-nft-card.minted { border-top: 2px solid var(--nft-color); }
        .sbt-nft-card.minted:hover {
          transform: translateY(-4px); border-color: var(--glass-border-hover);
          box-shadow: var(--glow-white-strong);
        }
        .sbt-holo-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 70%, transparent 80%);
          background-size: 200% 100%; opacity: 0;
          transition: opacity 0.4s ease; pointer-events: none; border-radius: inherit;
        }
        .sbt-nft-card:hover .sbt-holo-shimmer {
          opacity: 1; animation: shimmerHolo 1.5s ease-in-out;
        }
        .sbt-nft-inner {
          position: relative; padding: 20px; display: flex; flex-direction: column;
          align-items: center; gap: 10px;
        }
        .sbt-nft-locked { min-height: 200px; justify-content: center; opacity: 0.5; }
        .sbt-nft-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
        .sbt-nft-badge {
          font-size: 0.5rem; font-weight: 800; letter-spacing: 0.15em; color: var(--text-muted);
          padding: 2px 8px; border: 1px solid var(--glass-border); border-radius: var(--radius-full);
        }
        .sbt-nft-emoji { font-size: 2.2rem; }
        .sbt-nft-tier { font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
        .sbt-nft-name { font-size: 0.7rem; color: var(--text-secondary); }
        .sbt-nft-stats {
          width: 100%; display: flex; flex-direction: column; gap: 6px; padding: 10px;
          background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md);
        }
        .sbt-nft-stat { display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.7rem; }
        .sbt-nft-tx { font-size: 0.6rem; color: var(--text-muted); font-family: var(--font-mono); }
        .sbt-nft-bound {
          display: flex; align-items: center; gap: 4px; padding: 3px 8px;
          border: 1px solid var(--glass-border); border-radius: var(--radius-md);
          color: var(--text-muted); font-size: 0.55rem; font-weight: 600;
        }
        @media (max-width: 600px) { .sbt-gallery-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
