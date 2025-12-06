import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  focusTrigger?: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, focusTrigger }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  // Auto-focus on mount, after enable, or when trigger changes
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, focusTrigger]);

  return (
    <div className="bg-white p-3 border-t border-gray-100 safe-area-bottom">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Type here... (e.g., '1kg rice')"
          className="w-full pl-4 pr-12 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <span className="material-icons-round text-xl">arrow_upward</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;