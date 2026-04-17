import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  isConnected: boolean;
  onConnect: () => void;
  onVerify: () => void;
  isWalletConnected: boolean;
}

export function LandingPage({ 
  isConnected, 
  onConnect, 
  onVerify, 
  isWalletConnected 
}: LandingPageProps) {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isConnected) {
      navigate('/chat');
    } else if (isWalletConnected) {
      onVerify();
    } else {
      onConnect();
    }
  };

  return (
    <div className="landing">
      {/* Grain texture overlay */}
      <div className="grain" />

      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <Shield size={16} strokeWidth={1.5} />
            </div>
            <span className="landing-logo-text">InnerProof</span>
          </div>
          <button 
            onClick={handleCTA} 
            className={isConnected ? 'nav-btn-ghost' : 'nav-btn-ghost'} 
            id="landing-connect-btn"
          >
            {isConnected ? 'Go to Chat' : isWalletConnected ? 'Verify Account' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-inner">
          {/* Platinum tag line */}
          <p className="hero-tag">Built on Initia · Powered by AI</p>

          {/* Main typography block */}
          <div className="hero-text-block">
            <h1 className="hero-line-1">Your Mind,</h1>
            <h1 className="hero-line-2">Your <em>Proof.</em></h1>
            <h1 className="hero-line-3">Zero Exposure.</h1>
          </div>

          {/* Description */}
          <p className="hero-description">
            Anonymous AI therapy with verifiable progress tracking.
            No personal data. No surveillance. Just a private conversation
            and a soulbound proof of your journey.
          </p>

          {/* CTA */}
          <div className="hero-cta-group">
            <button 
              onClick={handleCTA} 
              className="hero-cta-primary" 
              id="hero-cta-btn"
            >
              <span className="hero-cta-label">
                {isConnected ? (
                  <>Start Session</>
                ) : isWalletConnected ? (
                  <>Approve in Wallet</>
                ) : (
                  <>Connect Wallet & Begin</>
                )}
              </span>
              <span className="hero-cta-arrow">
                {isWalletConnected && !isConnected ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
              </span>
            </button>
            <span className="hero-cta-sub">
              {isWalletConnected && !isConnected 
                ? 'Sign the verification message in your wallet' 
                : 'No sign-up · Wallet-only · Zero PII'}
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Features */}
      <section className="landing-features">
        <div className="features-inner">
          {[
            { num: '01', title: 'Anonymous', desc: 'No emails, no names, no personal data. Connect your wallet and that\'s it. Your identity stays completely private.' },
            { num: '02', title: 'AI Companion', desc: 'A compassionate AI therapist available 24/7. Evidence-based techniques from CBT and mindfulness to support your journey.' },
            { num: '03', title: 'Soulbound', desc: 'Your progress is minted as a non-transferable NFT. It proves your commitment without exposing any private conversations.' },
          ].map((f) => (
            <div key={f.num} className="feature-item">
              <span className="feature-num">{f.num}</span>
              <div className="feature-content">
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* How it works — typographic */}
      <section className="landing-process">
        <div className="process-inner">
          <h2 className="process-heading">Process</h2>
          <div className="process-grid">
            {[
              { step: 'I', word: 'Connect', sub: 'Link your wallet' },
              { step: 'II', word: 'Talk', sub: 'Private AI session' },
              { step: 'III', word: 'Track', sub: 'Monitor improvement' },
              { step: 'IV', word: 'Prove', sub: 'Mint your SBT' },
            ].map((p) => (
              <div key={p.step} className="process-item">
                <span className="process-step">{p.step}</span>
                <span className="process-word">{p.word}</span>
                <span className="process-sub">{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <span className="footer-brand">InnerProof</span>
          <span className="footer-sub">Hackathon 2026 · Initia</span>
        </div>
      </footer>

      <style>{`
        /* ===== GRAIN TEXTURE ===== */
        .grain {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* ===== LANDING BASE ===== */
        .landing {
          min-height: 100vh;
          background: #000000;
          position: relative;
        }

        .section-divider {
          max-width: 1200px;
          margin: 0 auto;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--platinum-dim), transparent);
        }

        /* ===== NAV ===== */
        .landing-nav {
          position: relative;
          z-index: 10;
          padding: 32px 48px;
        }

        .landing-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .landing-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .landing-logo-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--platinum-dim);
          border-radius: 8px;
          color: var(--platinum);
        }

        .landing-logo-text {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .nav-btn-ghost {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--platinum);
          background: transparent;
          border: 1px solid var(--platinum-dim);
          border-radius: 6px;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .nav-btn-ghost:hover {
          border-color: var(--platinum);
          color: #ffffff;
          background: var(--platinum-subtle);
        }

        /* ===== HERO ===== */
        .landing-hero {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 82vh;
          padding: 80px 48px;
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 48px;
          max-width: 820px;
        }

        .hero-tag {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--platinum);
        }

        /* ----- Hero typography ----- */
        .hero-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .hero-line-1 {
          font-family: var(--font-sans);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .hero-line-2 {
          font-family: var(--font-sans);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .hero-line-2 em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--platinum);
        }

        .hero-line-3 {
          font-family: var(--font-sans);
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
          margin-top: 20px;
        }

        .hero-description {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 400;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.55);
          max-width: 520px;
          letter-spacing: 0.005em;
        }

        /* ----- CTA ----- */
        .hero-cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 16px;
        }

        .hero-cta-primary {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 40px;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 0px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .hero-cta-primary:hover {
          transform: scale(1.03);
          background: var(--platinum);
          color: #000000;
        }

        .hero-cta-primary:active {
          transform: scale(0.99);
        }

        .hero-cta-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.4s ease;
        }

        .hero-cta-primary:hover .hero-cta-arrow {
          transform: translateX(4px);
        }

        .hero-cta-sub {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
        }

        /* ===== FEATURES ===== */
        .landing-features {
          position: relative;
          z-index: 1;
          padding: 100px 48px;
        }

        .features-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 40px;
          padding: 48px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s ease;
        }

        .feature-item:last-child {
          border-bottom: none;
        }

        .feature-item:hover {
          padding-left: 12px;
        }

        .feature-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--platinum-dim);
          letter-spacing: 0.05em;
          min-width: 32px;
          padding-top: 4px;
        }

        .feature-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-title {
          font-family: var(--font-sans);
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .feature-desc {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.45);
          max-width: 520px;
        }

        /* ===== PROCESS ===== */
        .landing-process {
          position: relative;
          z-index: 1;
          padding: 100px 48px 120px;
        }

        .process-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .process-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400;
          font-style: italic;
          color: var(--platinum);
          margin-bottom: 64px;
          letter-spacing: -0.01em;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .process-item {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 32px 24px;
          border-left: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s ease;
        }

        .process-item:first-child {
          border-left: none;
          padding-left: 0;
        }

        .process-item:hover {
          background: var(--platinum-subtle);
        }

        .process-step {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          font-style: italic;
          color: var(--platinum-dim);
          letter-spacing: 0.02em;
        }

        .process-word {
          font-family: var(--font-sans);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .process-sub {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.3);
        }

        /* ===== FOOTER ===== */
        .landing-footer {
          position: relative;
          z-index: 1;
          padding: 32px 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-brand {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: -0.01em;
        }

        .footer-sub {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .landing-nav, .landing-hero, .landing-features, .landing-process, .landing-footer {
            padding-left: 24px;
            padding-right: 24px;
          }

          .landing-hero {
            min-height: 70vh;
            padding-top: 60px;
            padding-bottom: 60px;
          }

          .hero-inner {
            gap: 36px;
          }

          .feature-item {
            flex-direction: column;
            gap: 12px;
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-item {
            border-left: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
