import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { MoodTracker } from '@/components/mood/MoodTracker';
import { useChat } from '@/hooks/useChat';

interface ChatPageProps {
  walletAddress?: string;
  isConnected: boolean;
  onSessionChange: (active: boolean) => void;
  onMoodEntry: (sessionScore: number, selfRating: number) => void;
}

export function ChatPage({
  walletAddress,
  isConnected,
  onSessionChange,
  onMoodEntry,
}: ChatPageProps) {
  const navigate = useNavigate();
  const chat = useChat(walletAddress);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [lastSessionScore, setLastSessionScore] = useState(0);

  if (!isConnected) {
    return (
      <div className="chat-gate animate-fade-in-up">
        <span style={{ fontSize: '3rem' }}>🔒</span>
        <h2 className="heading-2">Connect Your Wallet</h2>
        <p className="text-body">
          Connect your wallet to start a private therapy session.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
          id="chat-connect-btn"
        >
          Go to Home
        </button>

        <style>{`
          .chat-gate {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            min-height: 60vh;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  const handleStartSession = () => {
    chat.startSession();
    onSessionChange(true);
    setShowMoodRating(false);
  };

  const handleEndSession = () => {
    const session = chat.endSession();
    onSessionChange(false);
    if (session) {
      setLastSessionScore(session.averageMood);
      setShowMoodRating(true);
    }
  };

  const handleMoodRate = (selfRating: number) => {
    onMoodEntry(lastSessionScore, selfRating);
    setShowMoodRating(false);
  };

  if (showMoodRating) {
    return <MoodTracker onRate={handleMoodRate} sessionScore={lastSessionScore} />;
  }

  return (
    <ChatWindow
      messages={chat.messages}
      isLoading={chat.isLoading}
      error={chat.error}
      sessionActive={chat.sessionActive}
      sessionDuration={chat.sessionDuration}
      onSend={chat.send}
      onStartSession={handleStartSession}
      onEndSession={handleEndSession}
      onClearError={chat.clearError}
    />
  );
}
