import type { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-msg ${isUser ? 'chat-msg-user' : 'chat-msg-assistant'}`}>
      <div className={`chat-msg-avatar ${isUser ? 'chat-avatar-user' : 'chat-avatar-ai'}`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`chat-msg-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
        <p>{message.content}</p>
        <span className="chat-msg-time">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      <style>{`
        .chat-msg {
          display: flex;
          gap: 12px;
          padding: 4px 0;
          max-width: 85%;
        }

        .chat-msg-user {
          flex-direction: row-reverse;
          margin-left: auto;
          animation: slideInRight 0.3s ease-out;
        }

        .chat-msg-assistant {
          margin-right: auto;
          animation: slideInLeft 0.3s ease-out;
        }

        .chat-msg-avatar {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }

        .chat-avatar-user {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          color: white;
        }

        .chat-avatar-ai {
          background: linear-gradient(135deg, var(--accent-500), var(--accent-600));
          color: white;
        }

        .chat-msg-bubble {
          padding: 14px 18px;
          border-radius: var(--radius-lg);
          line-height: 1.6;
          font-size: 0.925rem;
        }

        .chat-bubble-user {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chat-bubble-ai {
          background: var(--surface-glass);
          border: 1px solid var(--surface-border);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .chat-msg-bubble p {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .chat-msg-time {
          display: block;
          margin-top: 6px;
          font-size: 0.7rem;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

// Typing indicator component
export function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg-assistant">
      <div className="chat-msg-avatar chat-avatar-ai">
        <Bot size={16} />
      </div>
      <div className="chat-bubble-ai typing-indicator">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '200ms' }} />
        <span className="typing-dot" style={{ animationDelay: '400ms' }} />
      </div>

      <style>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 20px;
          background: var(--surface-glass);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-lg);
          border-bottom-left-radius: 4px;
          animation: fadeIn 0.3s ease-out;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-400);
          animation: typingDot 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
