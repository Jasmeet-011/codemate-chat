
import React, { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from './CodeBlock';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code';
  language?: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content: string) => {
    // Check if content contains code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index);
        if (textContent.trim()) {
          parts.push(
            <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
              {textContent}
            </div>
          );
        }
      }

      // Add code block
      const language = match[1] || 'javascript';
      const code = match[2];
      parts.push(
        <CodeBlock
          key={`code-${match.index}`}
          code={code}
          language={language}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {remainingText}
          </div>
        );
      }
    }

    return parts.length > 0 ? parts : <div className="whitespace-pre-wrap">{content}</div>;
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-green-500 to-green-600' 
          : 'bg-gradient-to-br from-blue-500 to-purple-600'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>
      
      <div className={`group relative max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`rounded-lg px-4 py-3 shadow-sm border ${
          isUser 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white text-gray-900 border-gray-200'
        }`}>
          <div className="text-sm leading-relaxed">
            {renderContent(message.content)}
          </div>
        </div>
        
        {!isUser && (
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 text-gray-600" />
            )}
          </Button>
        )}
        
        <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
