import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ProgressData, MintParams } from '@/types';
import { MIN_SESSIONS_TO_MINT, LEVEL_EMOJIS, LEVEL_COLORS } from '@/lib/constants';

interface MintButtonProps {
  progressData: ProgressData;
  canMint: boolean;
  isMinting: boolean;
  mintSuccess: boolean;
  onMint: (params: MintParams) => void;
}

export function MintButton({
  progressData,
  canMint,
  isMinting,
  mintSuccess,
  onMint,
}: MintButtonProps) {
  const handleMint = () => {
    console.log('Mint button clicked! Improvement Score:', progressData.improvementScore);
    // Map improvement score (0-100) to 1-5 scale for JSON files
    // 0-20 -> 1, 21-40 -> 2, 41-60 -> 3, 61-80 -> 4, 81-100 -> 5
    const scoreTier = Math.min(5, Math.max(1, Math.ceil(progressData.improvementScore / 20)));
    const baseCid = 'ipfs://bafybeih2kve2yp2a6p5aclb7ehzemkyaclsoj3mxegxfbtz3ip5yju4my4/';
    const metadataUri = `${baseCid}${scoreTier}.json`;

    console.log('Calling onMint with:', { metadataUri });
    onMint({
      sessionsCompleted: progressData.sessionsCompleted,
      improvementScore: progressData.improvementScore,
      level: progressData.level,
      timestamp: Math.floor(Date.now() / 1000),
      metadataUri,
    });
  };

  const progress = Math.min(
    100,
    (progressData.sessionsCompleted / MIN_SESSIONS_TO_MINT) * 100
  );

  if (mintSuccess) {
    return (
      <div className="mint-success animate-fade-in-up">
        <div className="mint-success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="heading-3">Soulbound Token Minted! 🎉</h3>
        <p className="text-body">
          Your progress is now verified on-chain. This token is non-transferable and
          permanently bound to your wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="mint-container animate-fade-in">
      <div className="mint-card glass-card" style={{ padding: '32px' }}>
        {/* Progress Ring */}
        <div className="mint-progress-ring">
          <svg viewBox="0 0 120 120" className="mint-ring-svg">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={canMint ? LEVEL_COLORS[progressData.level] : 'rgba(108, 99, 255, 0.3)'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 3.27} 327`}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
            />
          </svg>
          <div className="mint-ring-content">
            <span style={{ fontSize: '2rem' }}>{LEVEL_EMOJIS[progressData.level]}</span>
            <span className="text-small">{progressData.level}</span>
          </div>
        </div>

        {/* Info */}
        <div className="mint-info">
          <h3 className="heading-3" style={{ textAlign: 'center' }}>
            {canMint ? 'Ready to Mint!' : 'Progress Toward Mint'}
          </h3>
          <p className="text-body" style={{ textAlign: 'center' }}>
            {canMint
              ? `You've completed ${progressData.sessionsCompleted} sessions! Your Level 1 SBT is ready.`
              : `Complete ${MIN_SESSIONS_TO_MINT - progressData.sessionsCompleted} more session(s) to unlock minting.`}
          </p>

          <div className="mint-stats">
            <div className="mint-stat">
              <span className="mint-stat-value">{progressData.sessionsCompleted}</span>
              <span className="mint-stat-label">Sessions</span>
            </div>
            <div className="mint-stat">
              <span className="mint-stat-value" style={{ color: LEVEL_COLORS[progressData.level] }}>
                {progressData.improvementScore}%
              </span>
              <span className="mint-stat-label">Improvement</span>
            </div>
            <div className="mint-stat">
              <span className="mint-stat-value">🔥 {progressData.currentStreak}</span>
              <span className="mint-stat-label">Streak</span>
            </div>
          </div>
        </div>

        {/* Mint Button */}
        <button
          onClick={handleMint}
          disabled={!canMint || isMinting}
          className={`btn btn-lg ${canMint ? 'btn-mint' : 'btn-secondary'}`}
          id="mint-sbt-btn"
          style={{ width: '100%' }}
        >
          {isMinting ? (
            <>
              <Loader2 size={20} className="animate-spin-slow" />
              Minting...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              {canMint ? 'Mint Soulbound Token' : 'Keep Going!'}
            </>
          )}
        </button>
      </div>

      <style>{`
        .mint-container {
          display: flex;
          justify-content: center;
        }

        .mint-card {
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .mint-progress-ring {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .mint-ring-svg {
          width: 100%;
          height: 100%;
        }

        .mint-ring-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .mint-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .mint-stats {
          display: flex;
          justify-content: space-around;
          padding: 16px 0;
        }

        .mint-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .mint-stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mint-stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .btn-mint {
          background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
          color: white;
          box-shadow: 0 2px 20px rgba(108, 99, 255, 0.3), 0 2px 20px rgba(56, 178, 172, 0.2);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .btn-mint:hover:not(:disabled) {
          box-shadow: 0 4px 30px rgba(108, 99, 255, 0.5), 0 4px 30px rgba(56, 178, 172, 0.3);
          transform: translateY(-2px);
        }

        .mint-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 24px;
          text-align: center;
        }

        .mint-success-icon {
          color: var(--success);
          animation: float 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
