import { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Clock, AlertCircle } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  sessionActive: boolean;
  sessionDuration: number;
  onSend: (message: string) => void;
  onStartSession: () => void;
  onEndSession: () => void;
  onClearError: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function ChatWindow({
  messages,
  isLoading,
  error,
  sessionActive,
  sessionDuration,
  onSend,
  onStartSession,
  onEndSession,
  onClearError,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!sessionActive) {
    return (
      <div className="chat-start">
        <div className="chat-start-content animate-fade-in-up">
          <div className="chat-start-icon">
            <span style={{ fontSize: '3rem' }}>🧘</span>
          </div>
          <h2 className="heading-2 gradient-text">Ready for a Session?</h2>
          <p className="text-body" style={{ maxWidth: '440px', textAlign: 'center' }}>
            Start a confidential therapy session with your AI companion.
            Your conversations are never stored on-chain — only your progress scores.
          </p>
          <button
            onClick={onStartSession}
            className="btn btn-primary btn-lg"
            id="start-session-btn"
            style={{ marginTop: '8px' }}
          >
            Begin Session
          </button>
          <div className="chat-start-features">
            <div className="chat-feature">
              <span>🔒</span> End-to-end private
            </div>
            <div className="chat-feature">
              <span>🤖</span> AI-powered support
            </div>
            <div className="chat-feature">
              <span>📊</span> Progress tracking
            </div>
          </div>
        </div>

        <style>{`
          .chat-start {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
          }

          .chat-start-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .chat-start-icon {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--surface-glass);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-xl);
            animation: float 3s ease-in-out infinite;
          }

          .chat-start-features {
            display: flex;
            gap: 16px;
            margin-top: 16px;
          }

          .chat-feature {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: var(--text-muted);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Session Header */}
      <div className="chat-session-header glass">
        <div className="chat-session-info">
          <Clock size={14} />
          <span>{formatDuration(sessionDuration)}</span>
        </div>
        <button
          onClick={onEndSession}
          className="btn btn-secondary btn-sm"
          id="end-session-btn"
        >
          End Session
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="chat-error animate-fade-in">
          <AlertCircle size={16} />
          <span>{error}</span>
          <button onClick={onClearError} className="chat-error-dismiss">✕</button>
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isLoading} />

      <style>{`
        .chat-window {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 160px);
          max-height: calc(100vh - 160px);
        }

        .chat-session-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          margin-bottom: 16px;
        }

        .chat-session-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 0 4px 16px;
        }

        .chat-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.2);
          border-radius: var(--radius-md);
          color: var(--error);
          font-size: 0.85rem;
          margin-bottom: 12px;
        }

        .chat-error-dismiss {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          font-size: 1rem;
          padding: 2px 6px;
        }
      `}</style>
    </div>
  );
}
