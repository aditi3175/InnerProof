import { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper glass">
        <textarea
          id="chat-message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Share what\'s on your mind...'}
          disabled={disabled}
          rows={1}
          className="chat-textarea"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="chat-send-btn"
          id="send-message-btn"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="chat-input-hint text-small">
        Press Enter to send · Shift+Enter for new line
      </p>

      <style>{`
        .chat-input-container {
          padding: 16px 0 0;
        }

        .chat-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 8px 8px 8px 16px;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.925rem;
          resize: none;
          max-height: 120px;
          padding: 8px 0;
          line-height: 1.5;
        }

        .chat-textarea::placeholder {
          color: var(--text-muted);
        }

        .chat-textarea:disabled {
          opacity: 0.5;
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          color: white;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: var(--glow-primary);
        }

        .chat-send-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .chat-input-hint {
          text-align: center;
          margin-top: 8px;
          font-size: 0.7rem !important;
        }
      `}</style>
    </div>
  );
}
