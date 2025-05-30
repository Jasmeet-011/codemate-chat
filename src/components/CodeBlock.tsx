
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
        .replace(/(function|const|let|var|return|if|else|for|while|import|export|from|class|extends)/g, '<span class="text-blue-400 font-medium">$1</span>')
        .replace(/(['"](.*?)['"])/g, '<span class="text-green-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>');
    }
    
    if (language === 'python') {
      return code
        .replace(/(def|class|import|from|return|if|else|elif|for|while|with|try|except|finally)/g, '<span class="text-blue-400 font-medium">$1</span>')
        .replace(/(['"](.*?)['"])/g, '<span class="text-green-400">$1</span>')
        .replace(/(#.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>');
    }

    return code;
  };

  return (
    <div className="my-4 bg-black rounded-lg overflow-hidden border border-border/20">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
        <span className="text-gray-300 text-xs font-mono">{language}</span>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono leading-6">
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
