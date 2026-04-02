import { useState } from 'react';
import { MOOD_EMOJIS } from '@/lib/constants';

interface MoodTrackerProps {
  onRate: (rating: number) => void;
  sessionScore?: number;
}

export function MoodTracker({ onRate, sessionScore }: MoodTrackerProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index + 1); // 1-5 scale
  };

  const handleSubmit = () => {
    if (selected !== null) {
      onRate(selected);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="mood-tracker-done animate-fade-in-up">
        <span style={{ fontSize: '3rem' }}>✅</span>
        <h3 className="heading-3">Session Complete!</h3>
        <p className="text-body">Your progress has been recorded. Keep going!</p>
      </div>
    );
  }

  return (
    <div className="mood-tracker animate-fade-in-up">
      <div className="mood-tracker-card glass-card">
        <h3 className="heading-3" style={{ textAlign: 'center' }}>
          How do you feel after this session?
        </h3>

        {sessionScore !== undefined && (
          <p className="text-small" style={{ textAlign: 'center' }}>
            AI assessed session mood: {sessionScore.toFixed(1)}/10
          </p>
        )}

        <div className="mood-emojis">
          {MOOD_EMOJIS.map((emoji, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`mood-emoji-btn ${selected === i + 1 ? 'mood-emoji-selected' : ''}`}
              id={`mood-rate-${i + 1}`}
              aria-label={`Rate ${i + 1} of 5`}
            >
              <span className="mood-emoji">{emoji}</span>
              <span className="mood-emoji-label">{['Awful', 'Bad', 'Okay', 'Good', 'Great'][i]}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn btn-primary btn-lg"
          id="submit-mood-btn"
          style={{ width: '100%' }}
        >
          Record Progress
        </button>
      </div>

      <style>{`
        .mood-tracker {
          display: flex;
          justify-content: center;
          padding: 32px 0;
        }

        .mood-tracker-card {
          max-width: 480px;
          width: 100%;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mood-tracker-done {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 48px 0;
          text-align: center;
        }

        .mood-emojis {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .mood-emoji-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          background: var(--surface-glass);
          border: 2px solid var(--surface-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mood-emoji-btn:hover {
          background: var(--surface-glass-hover);
          transform: translateY(-4px);
          border-color: var(--primary-400);
        }

        .mood-emoji-selected {
          background: rgba(108, 99, 255, 0.15) !important;
          border-color: var(--primary-400) !important;
          box-shadow: var(--glow-primary);
          transform: translateY(-4px) scale(1.05);
        }

        .mood-emoji {
          font-size: 2rem;
        }

        .mood-emoji-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
