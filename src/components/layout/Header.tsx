
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu, 
  MessageSquare, 
  HelpCircle,
  ChevronDown,
  Globe
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DisplaySettings from './DisplaySettings';

interface HeaderProps {
  setIsOpen: (open: boolean) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({ setIsOpen, onNotificationClick, onProfileClick }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [notifications] = useState([
    { id: 1, message: 'New transaction completed', time: '2 min ago', type: 'success' },
    { id: 2, message: 'Chargeback received', time: '5 min ago', type: 'warning' },
    { id: 3, message: 'Settlement processed', time: '10 min ago', type: 'info' },
  ]);

  const unreadCount = notifications.length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search transactions, customers..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          {/* Mobile Search */}
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Display Settings */}
          <DisplaySettings />

          {/* Support */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Support</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {unreadCount}
                  </Badge>
                )}
                <span className="hidden lg:inline ml-2">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onNotificationClick}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden lg:inline">John Doe</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@merchant.com</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Feedback</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
