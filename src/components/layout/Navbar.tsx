import { Wallet, LogOut, Zap } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  sessionActive?: boolean;
}

export function Navbar({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  sessionActive,
}: NavbarProps) {
  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          {sessionActive && (
            <div className="session-indicator">
              <span className="session-pulse" />
              <span>Session Active</span>
            </div>
          )}
        </div>

        <div className="navbar-right">
          {isConnected && walletAddress ? (
            <div className="wallet-connected">
              <div className="wallet-address">
                <div className="wallet-avatar" />
                <span>{truncateAddress(walletAddress)}</span>
              </div>
              <button
                onClick={onDisconnect}
                className="btn btn-secondary btn-sm btn-icon"
                title="Disconnect"
                id="disconnect-wallet-btn"
              >
                <LogOut size={14} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <button onClick={onConnect} className="btn btn-primary" id="connect-wallet-btn">
              <Wallet size={16} strokeWidth={1.5} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 14px 40px;
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(20px) saturate(1.2);
          -webkit-backdrop-filter: blur(20px) saturate(1.2);
          border-bottom: 1px solid var(--glass-border);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-left, .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .session-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          backdrop-filter: blur(12px);
        }

        .session-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .wallet-connected {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wallet-address {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          font-size: 0.78rem;
          font-weight: 500;
          font-family: var(--font-mono);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          color: var(--text-secondary);
          backdrop-filter: blur(12px);
        }

        .wallet-avatar {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05));
          border: 1px solid var(--glass-border);
        }

        @media (max-width: 768px) {
          .navbar { padding: 12px 16px; }
        }
      `}</style>
    </header>
  );
}
