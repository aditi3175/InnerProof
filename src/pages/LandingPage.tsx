import { useNavigate } from 'react-router-dom';
import { Shield, Bot, Trophy, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

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
      // If wallet is hooked but not signed/verified
      onVerify();
    } else {
      onConnect();
    }
  };

  return (
    <div className="landing">
      {/* Background */}
      <div className="landing-bg">
        <div className="landing-orb landing-orb-1" />
        <div className="landing-orb landing-orb-2" />
        <div className="landing-orb landing-orb-3" />
        <div className="landing-grid" />
      </div>

      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <Shield size={20} />
            </div>
            <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.2rem' }}>
              InnerProof
            </span>
          </div>
          <button onClick={handleCTA} className={`btn ${isConnected ? 'btn-secondary' : 'btn-primary'}`} id="landing-connect-btn">
            {isConnected ? 'Go to Chat' : isWalletConnected ? 'Verify Account' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-content stagger-children">
          <div className="landing-badge">
            <Sparkles size={14} />
            <span>Built on Initia · Powered by AI</span>
          </div>

          <h1 className="heading-1">
            Your Mind,<br />
            <span className="gradient-text">Your Proof.</span><br />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.7em' }}>Zero Exposure.</span>
          </h1>

          <p className="text-body" style={{ fontSize: '1.15rem', maxWidth: '540px' }}>
            Anonymous AI therapy with verifiable progress tracking.
            No personal data. No surveillance. Just a private conversation
            and a soulbound proof of your journey.
          </p>

          <div className="landing-cta-group">
            <button 
              onClick={handleCTA} 
              className={`btn ${isConnected ? 'btn-primary' : 'btn-primary'} btn-lg`} 
              id="hero-cta-btn"
              style={isWalletConnected && !isConnected ? { background: 'var(--warning)', borderColor: 'var(--warning-hover)' } : {}}
            >
              {isConnected ? (
                <>Start Session <ArrowRight size={18} /></>
              ) : isWalletConnected ? (
                <>Approve in Wallet <CheckCircle2 size={18} /></>
              ) : (
                <>Connect Wallet & Begin <ArrowRight size={18} /></>
              )}
            </button>
            <span className="text-small">
              {isWalletConnected && !isConnected 
                ? 'Please sign the verification message in your wallet' 
                : 'No sign-up required · Wallet-only login'}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-features-grid stagger-children">
          <div className="feature-card glass-card">
            <div className="feature-icon" style={{ background: 'rgba(108, 99, 255, 0.15)' }}>
              <Lock size={24} style={{ color: 'var(--primary-400)' }} />
            </div>
            <h3 className="heading-3">100% Anonymous</h3>
            <p className="text-body">
              No emails, no names, no personal data. Connect your wallet and that's it.
              Your identity stays completely private.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon" style={{ background: 'rgba(56, 178, 172, 0.15)' }}>
              <Bot size={24} style={{ color: 'var(--accent-400)' }} />
            </div>
            <h3 className="heading-3">AI Companion</h3>
            <p className="text-body">
              A compassionate AI therapist available 24/7. Using evidence-based techniques
              from CBT and mindfulness to support your journey.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
              <Trophy size={24} style={{ color: 'var(--warning)' }} />
            </div>
            <h3 className="heading-3">Soulbound Proof</h3>
            <p className="text-body">
              Your progress is minted as a non-transferable NFT. It proves your commitment
              without exposing any private conversations.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps">
        <h2 className="heading-2 gradient-text" style={{ textAlign: 'center', marginBottom: '40px' }}>
          How It Works
        </h2>
        <div className="steps-grid stagger-children">
          <div className="step-item">
            <div className="step-number">01</div>
            <h3>Connect</h3>
            <p>Link your wallet — no personal info needed.</p>
          </div>
          <div className="step-connector" />
          <div className="step-item">
            <div className="step-number">02</div>
            <h3>Talk</h3>
            <p>Have a private AI therapy session.</p>
          </div>
          <div className="step-connector" />
          <div className="step-item">
            <div className="step-number">03</div>
            <h3>Track</h3>
            <p>Monitor your mood improvement over time.</p>
          </div>
          <div className="step-connector" />
          <div className="step-item">
            <div className="step-number">04</div>
            <h3>Prove</h3>
            <p>Mint a Soulbound NFT of your progress.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <span className="gradient-text" style={{ fontWeight: 700 }}>InnerProof</span>
          <span className="text-small">Built with ❤️ on Initia · Hackathon 2026</span>
        </div>
      </footer>

      <style>{`
        .landing {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .landing-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .landing-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .landing-orb-1 {
          width: 500px;
          height: 500px;
          top: -150px;
          left: -100px;
          background: rgba(108, 99, 255, 0.15);
          animation: float 8s ease-in-out infinite;
        }

        .landing-orb-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          right: -50px;
          background: rgba(56, 178, 172, 0.1);
          animation: float 10s ease-in-out infinite reverse;
        }

        .landing-orb-3 {
          width: 300px;
          height: 300px;
          top: 40%;
          right: 20%;
          background: rgba(159, 122, 234, 0.08);
          animation: float 12s ease-in-out infinite;
        }

        .landing-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(108, 99, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 99, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .landing-nav {
          position: relative;
          z-index: 10;
          padding: 20px 32px;
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
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
          border-radius: var(--radius-sm);
          color: white;
        }

        .landing-hero {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          padding: 40px 32px;
        }

        .landing-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }

        .landing-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--surface-glass);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-400);
        }

        .landing-cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .landing-features {
          position: relative;
          z-index: 10;
          padding: 80px 32px;
        }

        .landing-features-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
        }

        .landing-steps {
          position: relative;
          z-index: 10;
          padding: 60px 32px 80px;
        }

        .steps-grid {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: nowrap;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          padding: 20px 24px;
        }

        .step-item h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .step-item p {
          font-size: 0.85rem;
          color: var(--text-muted);
          max-width: 160px;
        }

        .step-number {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--primary-400), var(--accent-400));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .step-connector {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--primary-500), var(--accent-500));
          opacity: 0.3;
        }

        .landing-footer {
          position: relative;
          z-index: 10;
          padding: 24px 32px;
          border-top: 1px solid var(--surface-border);
        }

        .landing-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .step-connector {
            display: none;
          }

          .steps-grid {
            flex-direction: column;
          }

          .landing-features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
