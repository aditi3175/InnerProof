import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { storage } from './lib/storage';
import { WalletProvider } from './providers/WalletProvider';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { useMoodTracker } from './hooks/useMoodTracker';
import { useMintSBT } from './hooks/useMintSBT';
import { useAddress, useWallet } from './providers/WalletProvider';

function AppContent() {
  const address = useAddress();
  const { onboard, disconnect, signArbitrary } = useWallet();
  const isConnected = !!address && typeof address === 'string' && address.startsWith('init');
  const [sessionActive, setSessionActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { progressData, addMoodEntry, getMoodTrend } = useMoodTracker(address);
  const {
    isMinting,
    mintingMilestoneId,
    mintSuccess,
    txHash,
    milestones,
    mintedCount,
    mint,
    resetMintState,
  } = useMintSBT(address);

  const handleVerify = useCallback(async () => {
    if (!isConnected || !address) return;
    try {
      await signArbitrary(`Sign in to InnerProof: ${new Date().toLocaleDateString()}`);
      setIsVerified(true);
    } catch (e) {
      setIsVerified(false);
    }
  }, [isConnected, address, signArbitrary]);

  useEffect(() => {
    if (!isConnected) {
      setIsVerified(false);
      setSessionActive(false);
    }
  }, [isConnected]);

  const handleConnect = useCallback(() => { onboard(); }, [onboard]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    localStorage.removeItem('wallet-widget-connector');
    localStorage.removeItem('initia-widget-last-connected');
    setSessionActive(false);
    setIsVerified(false);
  }, [disconnect]);

  const canStartSession = isConnected && isVerified;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isConnected={canStartSession}
              onConnect={handleConnect}
              onVerify={handleVerify}
              isWalletConnected={isConnected}
            />
          }
        />

        <Route
          path="/chat"
          element={
            <Layout
              isConnected={isConnected}
              walletAddress={address}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              sessionActive={sessionActive}
            >
              <ChatPage
                walletAddress={address}
                isConnected={isConnected}
                onSessionChange={setSessionActive}
                onMoodEntry={addMoodEntry}
              />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Layout
              isConnected={isConnected}
              walletAddress={address}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              sessionActive={sessionActive}
            >
              <DashboardPage
                isConnected={isConnected}
                progressData={progressData}
                moodTrend={getMoodTrend()}
                milestones={milestones}
                mintedCount={mintedCount}
                isMinting={isMinting}
                mintingMilestoneId={mintingMilestoneId}
                mintSuccess={mintSuccess}
                onMint={mint}
                onResetMint={resetMintState}
              />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout
              isConnected={isConnected}
              walletAddress={address}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              sessionActive={sessionActive}
            >
              <ProfilePage
                isConnected={isConnected}
                walletAddress={address}
                progressData={progressData}
                milestones={milestones}
                mintedCount={mintedCount}
              />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}
