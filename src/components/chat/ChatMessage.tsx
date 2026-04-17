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
        {isUser ? <User size={14} strokeWidth={1.5} /> : <Bot size={14} strokeWidth={1.5} />}
      </div>
      <div className={`chat-msg-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
        <p>{message.content}</p>
        <span className="chat-msg-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <style>{`
        .chat-msg { display: flex; gap: 10px; padding: 4px 0; max-width: 80%; }
        .chat-msg-user { flex-direction: row-reverse; margin-left: auto; animation: slideInRight 0.25s ease-out; }
        .chat-msg-assistant { margin-right: auto; animation: slideInLeft 0.25s ease-out; }
        .chat-msg-avatar {
          width: 30px; height: 30px; min-width: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin-top: 4px;
        }
        .chat-avatar-user { background: #ffffff; color: #000000; }
        .chat-avatar-ai {
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          color: var(--text-secondary); backdrop-filter: blur(8px);
        }
        .chat-msg-bubble { padding: 14px 18px; border-radius: var(--radius-lg); line-height: 1.6; font-size: 0.925rem; }
        .chat-bubble-user {
          background: #ffffff; color: #000000; border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(255,255,255,0.06);
        }
        .chat-bubble-ai {
          background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border); color: var(--text-primary); border-bottom-left-radius: 4px;
        }
        .chat-msg-bubble p { margin: 0; white-space: pre-wrap; word-break: break-word; }
        .chat-msg-time { display: block; margin-top: 6px; font-size: 0.65rem; opacity: 0.35; }
      `}</style>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg-assistant">
      <div className="chat-msg-avatar chat-avatar-ai"><Bot size={14} strokeWidth={1.5} /></div>
      <div className="chat-bubble-ai typing-indicator">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '200ms' }} />
        <span className="typing-dot" style={{ animationDelay: '400ms' }} />
      </div>
      <style>{`
        .typing-indicator {
          display: flex; align-items: center; gap: 5px; padding: 16px 20px;
          background: var(--glass-bg); backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border); border-radius: var(--radius-lg);
          border-bottom-left-radius: 4px; animation: fadeIn 0.3s ease-out;
        }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted);
          animation: typingDot 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
