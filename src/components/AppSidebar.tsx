
import { useState } from 'react';
import { BarChart3, Calendar, Brain, CheckSquare, Plus, Settings, Database } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserProfile } from '@/components/UserProfile';

const navigationItems = [
  { icon: BarChart3, label: 'Analytics', isActive: true },
  { icon: Calendar, label: 'Events', isActive: false },
  { icon: Database, label: 'Database', isActive: false },
  { icon: CheckSquare, label: 'Tasks', isActive: false },
  { icon: Settings, label: 'Settings', isActive: false },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="bg-gray-900 border-gray-800">
      <SidebarHeader className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-900 transform rotate-45"></div>
          </div>
          {!isCollapsed && (
            <span className="text-white font-medium">TaskFlow</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="space-y-2">
          {navigationItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                  ${item.isActive 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-auto pt-8">
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </div>
              {!isCollapsed && (
                <span className="text-sm font-medium">Add New</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-gray-800">
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
