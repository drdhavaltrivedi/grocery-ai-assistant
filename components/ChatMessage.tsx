import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Markdown parser for bold text
  const formatText = (text: string) => {
    // Split by **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove asterisks and render strong
        return <strong key={index} className="font-bold text-inherit">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group animate-fade-in-up`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${isUser ? 'bg-blue-600' : 'bg-green-600'}`}>
          <span className="material-icons-round text-white text-sm">
            {isUser ? 'person' : 'smart_toy'}
          </span>
        </div>

        {/* Bubble */}
        <div 
          className={`px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed break-words
          ${isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          {formatText(message.text)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;