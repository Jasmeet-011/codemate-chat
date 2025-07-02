
import React from 'react';
import { Plus, MessageSquare, Settings, User, Book, HelpCircle, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const mainItems = [
    {
      title: "New Chat",
      icon: Plus,
      url: "#",
      isAction: true
    }
  ];

  const conversationItems = [
    { id: 1, title: 'React Component Help', timestamp: '2 hours ago' },
    { id: 2, title: 'JavaScript Functions', timestamp: 'Yesterday' },
    { id: 3, title: 'API Integration', timestamp: '2 days ago' },
    { id: 4, title: 'CSS Grid Layout', timestamp: '1 week ago' },
    { id: 5, title: 'TypeScript Types', timestamp: '1 week ago' },
    { id: 6, title: 'Database Design', timestamp: '2 weeks ago' },
  ];

  const footerItems = [
    {
      title: "Settings",
      icon: Settings,
      url: "#"
    },
    {
      title: "Documentation", 
      icon: Book,
      url: "#"
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      url: "#"
    }
  ];

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-border/40 px-3 py-4">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-foreground truncate">Codemate</span>
          </div>
          
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent ml-auto flex-shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-2 py-2">
        {/* New Chat Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-11 px-3 mb-2 bg-accent/50 hover:bg-accent text-accent-foreground font-medium rounded-lg transition-all duration-200 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0"
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <a href={item.url} className="flex items-center">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="ml-3 group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Conversations */}
        <SidebarGroup>
          <SidebarGroupContent>
            {!isCollapsed && (
              <div className="px-3 py-2 mb-2">
                <div className="flex items-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <History className="h-3 w-3 mr-2" />
                  Recent
                </div>
              </div>
            )}
            <SidebarMenu>
              {conversationItems.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton 
                    asChild
                    className="h-9 px-3 hover:bg-accent/50 rounded-lg transition-all duration-200 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0"
                    tooltip={isCollapsed ? conversation.title : undefined}
                  >
                    <a href="#" className="flex items-start">
                      <MessageSquare className="h-4 w-4 text-muted-foreground/70 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0 ml-3 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium truncate text-foreground/90">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground/70 truncate">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/40 px-2 py-2">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={isCollapsed ? item.title : undefined}
                className="h-9 px-3 hover:bg-accent/50 rounded-lg transition-all duration-200 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0"
              >
                <a href={item.url} className="flex items-center">
                  <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="ml-3 text-sm group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
