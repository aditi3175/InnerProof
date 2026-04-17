import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useMouseSpotlight } from '@/hooks/useMouseSpotlight';

interface LayoutProps {
  children: ReactNode;
  isConnected: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  sessionActive?: boolean;
}

export function Layout({
  children,
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  sessionActive,
}: LayoutProps) {
  const { position, visible } = useMouseSpotlight();

  return (
    <div className="app-layout">
      {/* Ambient drifting background */}
      <div className="ambient-bg" />
      <div className="grain-overlay" />

      {/* Mouse spotlight */}
      <div
        className="spotlight"
        style={{
          left: position.x,
          top: position.y,
          opacity: visible ? 1 : 0,
        }}
      />

      <Sidebar />
      <main className="main-content">
        <Navbar
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
          sessionActive={sessionActive}
        />
        <div className="page-content">
          {children}
        </div>
      </main>

      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
          position: relative;
        }

        .main-content {
          flex: 1;
          margin-left: 240px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }

        .page-content {
          flex: 1;
          padding: 40px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            margin-bottom: 64px;
          }

          .page-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
