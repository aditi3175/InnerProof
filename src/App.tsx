import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  // FORCE STRICT CHECK: Only connected if we have a real 'init' address
  const isConnected = !!address && typeof address === 'string' && address.startsWith('init');
  const [sessionActive, setSessionActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { progressData, canMint, addMoodEntry, getMoodTrend } =
    useMoodTracker(address);
  const { isMinting, mintSuccess, txHash, mint } = useMintSBT(address);

  // Challenge for verification - ensures a Keplr popup appears even if already authorized
  const handleVerify = useCallback(async () => {
    if (!isConnected || !address) return;
    try {
      console.log('Requesting sign-in signature for verification...');
      // This will force a Keplr popup to appear
      await signArbitrary(`Sign in to InnerProof: ${new Date().toLocaleDateString()}`);
      setIsVerified(true);
      console.log('Verification success!');
    } catch (e) {
      console.error('Verification failed or rejected:', e);
      // If user rejects, we treat them as not verified yet
      setIsVerified(false);
    }
  }, [isConnected, address, signArbitrary]);

  // If connected but not verified, we lock the session
  useEffect(() => {
    if (!isConnected) {
      setIsVerified(false);
      setSessionActive(false);
    }
  }, [isConnected]);

  const handleConnect = useCallback(() => {
    onboard();
  }, [onboard]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    // Clear SDK state and force fresh connection logs
    localStorage.removeItem('wallet-widget-connector');
    localStorage.removeItem('initia-widget-last-connected');
    setSessionActive(false);
    setIsVerified(false);
  }, [disconnect]);

  // Determine if we show the "Start Session" (Only if connected AND verified)
  const canStartSession = isConnected && isVerified;

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page without sidebar */}
        <Route
          path="/"
          element={
            <LandingPage
              isConnected={canStartSession} // Only show Start Session if verified
              onConnect={handleConnect}
              onVerify={handleVerify} // Pass verify handler to landing
              isWalletConnected={isConnected} // State to know we need to show verify button
            />
          }
        />

        {/* App pages with sidebar layout */}
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
                canMint={canMint}
                isMinting={isMinting}
                mintSuccess={mintSuccess}
                onMint={mint}
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
                hasMinted={mintSuccess}
                txHash={txHash}
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
