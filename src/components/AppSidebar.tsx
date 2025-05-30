
import React from 'react';
import { Plus, MessageSquare, Settings, User, Code, Github, Book, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const conversations = [
    { id: 1, title: 'React Component Help', timestamp: '2 hours ago' },
    { id: 2, title: 'JavaScript Functions', timestamp: 'Yesterday' },
    { id: 3, title: 'API Integration', timestamp: '2 days ago' },
    { id: 4, title: 'CSS Grid Layout', timestamp: '1 week ago' },
  ];

  const navigationItems = [
    {
      title: "Profile",
      icon: User,
      url: "#"
    },
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
      title: "GitHub",
      icon: Github,
      url: "#"
    }
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">Codemate</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Recent Conversations</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton asChild>
                    <a href="#" className="flex items-start space-x-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
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

      <SidebarFooter>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
