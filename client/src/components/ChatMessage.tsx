import React, { useState } from 'react';
import { User, Copy, Check } from 'lucide-react';
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
            <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-7">
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
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-7">
            {remainingText}
          </div>
        );
      }
    }

    return parts.length > 0 ? parts : <div className="whitespace-pre-wrap leading-7">{content}</div>;
  };

  return (
    <div className="flex items-start space-x-4 w-full">
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
      }`}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <span className="font-medium text-sm">AI</span>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="text-sm font-medium text-foreground">
          {isUser ? 'You' : 'Codemate'}
        </div>
        
        <div className="prose prose-sm max-w-none text-foreground/90">
          {renderContent(message.content)}
        </div>
        
        {/* Copy button for AI messages */}
        {!isUser && (
          <div className="flex items-center space-x-2 pt-2">
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
