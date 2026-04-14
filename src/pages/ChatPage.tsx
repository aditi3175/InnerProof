import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { MoodTracker } from '@/components/mood/MoodTracker';
import { useChat } from '@/hooks/useChat';
import { Lock, MessageCircle, Bot } from 'lucide-react';

interface ChatPageProps {
  walletAddress?: string;
  isConnected: boolean;
  onSessionChange: (active: boolean) => void;
  onMoodEntry: (sessionScore: number, selfRating: number) => void;
}

function PreviewChat() {
  return (
    <div className="chat-preview animate-fade-in">
      <div className="preview-overlay" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="preview-overlay-content glass-card">
          <Lock size={32} style={{ color: 'var(--primary-400)' }} />
          <h2 className="heading-2">Private AI Therapy</h2>
          <p className="text-body">Connect your wallet to start a safe, anonymous conversation with your AI companion.</p>
        </div>
      </div>

      <div className="preview-blurred">
        <div className="chat-preview-messages">
          <div className="chat-preview-msg assistant">
            <Bot size={16} />
            <div className="chat-preview-bubble">
              Welcome to your safe space. I'm here to listen and support you — no judgment, just a conversation between us.
            </div>
          </div>
          <div className="chat-preview-msg user">
            <div className="chat-preview-bubble user-bubble">
              I've been feeling overwhelmed with work lately...
            </div>
          </div>
          <div className="chat-preview-msg assistant">
            <Bot size={16} />
            <div className="chat-preview-bubble">
              I hear you. Feeling overwhelmed is incredibly draining. Let's take a moment to unpack what's going on...
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chat-preview { position: relative; min-height: 60vh; }
        .chat-preview-messages {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
        }
        .chat-preview-msg {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          max-width: 80%;
        }
        .chat-preview-msg.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .chat-preview-bubble {
          padding: 14px 18px;
          background: var(--surface-glass);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-lg);
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .user-bubble {
          background: rgba(108, 99, 255, 0.1);
          border-color: rgba(108, 99, 255, 0.2);
        }
        .preview-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 20, 0.5);
          backdrop-filter: blur(2px);
        }
        .preview-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px;
          text-align: center;
          max-width: 400px;
        }
        .preview-blurred {
          filter: blur(4px);
          opacity: 0.5;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
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

  if (!isConnected) return <PreviewChat />;

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
