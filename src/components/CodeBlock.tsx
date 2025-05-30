
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for demonstration
  const highlightCode = (code: string, language: string) => {
    if (language === 'javascript' || language === 'jsx') {
      return code
        .replace(/(function|const|let|var|return|if|else|for|while|import|export|from|class|extends)/g, '<span class="text-purple-600 font-semibold">$1</span>')
        .replace(/(['"](.*?)['"])/g, '<span class="text-green-600">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\d+)/g, '<span class="text-blue-600">$1</span>');
    }
    
    if (language === 'python') {
      return code
        .replace(/(def|class|import|from|return|if|else|elif|for|while|with|try|except|finally)/g, '<span class="text-purple-600 font-semibold">$1</span>')
        .replace(/(['"](.*?)['"])/g, '<span class="text-green-600">$1</span>')
        .replace(/(#.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\d+)/g, '<span class="text-blue-600">$1</span>');
    }

    return code;
  };

  return (
    <div className="my-4 bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm font-mono">{language}</span>
        </div>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono leading-relaxed">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightCode(code, language) 
            }} 
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
