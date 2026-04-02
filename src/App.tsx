import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './providers/WalletProvider';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { useMoodTracker } from './hooks/useMoodTracker';
import { useMintSBT } from './hooks/useMintSBT';
import { useInterwovenKit } from '@initia/interwovenkit-react';

function AppContent() {
  const { address: walletAddress, openConnect, disconnect, isConnected } = useInterwovenKit();
  const [sessionActive, setSessionActive] = useState(false);

  const { progressData, canMint, addMoodEntry, getMoodTrend } =
    useMoodTracker(walletAddress);
  const { isMinting, mintSuccess, txHash, mint } = useMintSBT(walletAddress);

  const handleConnect = useCallback(() => {
    openConnect();
  }, [openConnect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setSessionActive(false);
  }, [disconnect]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page without sidebar */}
        <Route
          path="/"
          element={
            <LandingPage
              isConnected={isConnected}
              onConnect={handleConnect}
            />
          }
        />

        {/* App pages with sidebar layout */}
        <Route
          path="/chat"
          element={
            <Layout
              isConnected={isConnected}
              walletAddress={walletAddress}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              sessionActive={sessionActive}
            >
              <ChatPage
                walletAddress={walletAddress}
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
              walletAddress={walletAddress}
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
              walletAddress={walletAddress}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              sessionActive={sessionActive}
            >
              <ProfilePage
                isConnected={isConnected}
                walletAddress={walletAddress}
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
