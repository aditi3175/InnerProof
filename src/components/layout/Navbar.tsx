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
        {/* Left: Page indicator */}
        <div className="navbar-left">
          {sessionActive && (
            <div className="session-indicator">
              <Zap size={14} />
              <span>Session Active</span>
              <span className="session-dot" />
            </div>
          )}
        </div>

        {/* Right: Wallet */}
        <div className="navbar-right">
          {isConnected && walletAddress ? (
            <div className="wallet-connected">
              <div className="wallet-address glass">
                <div className="wallet-avatar" />
                <span>{truncateAddress(walletAddress)}</span>
              </div>
              <button
                onClick={onDisconnect}
                className="btn btn-secondary btn-sm btn-icon"
                title="Disconnect"
                id="disconnect-wallet-btn"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="btn btn-primary"
              id="connect-wallet-btn"
            >
              <Wallet size={18} />
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
          padding: 16px 32px;
          background: rgba(10, 10, 18, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--surface-border);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .session-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(108, 99, 255, 0.1);
          border: 1px solid rgba(108, 99, 255, 0.2);
          border-radius: var(--radius-full);
          color: var(--primary-400);
          font-size: 0.8rem;
          font-weight: 600;
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .session-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          animation: pulseGlow 1.5s ease-in-out infinite;
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
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        .wallet-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 12px 16px;
          }
        }
      `}</style>
    </header>
  );
}
