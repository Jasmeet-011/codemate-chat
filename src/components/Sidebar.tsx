
import React from 'react';
import { X, Plus, MessageSquare, Settings, User, Code, Github, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const conversations = [
    { id: 1, title: 'React Component Help', timestamp: '2 hours ago' },
    { id: 2, title: 'JavaScript Functions', timestamp: 'Yesterday' },
    { id: 3, title: 'API Integration', timestamp: '2 days ago' },
    { id: 4, title: 'CSS Grid Layout', timestamp: '1 week ago' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Codemate</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Conversations</h3>
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conversation.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-700">
              <User className="h-4 w-4 mr-3" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700">
              <Book className="h-4 w-4 mr-3" />
              Documentation
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700">
              <Github className="h-4 w-4 mr-3" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
