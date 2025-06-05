
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  CreditCard,
  Shield,
  HelpCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ResponsiveBreadcrumb } from '@/components/ui/responsive-breadcrumb';

interface HeaderProps {
  setIsOpen: (open: boolean) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({ setIsOpen, onNotificationClick, onProfileClick }: HeaderProps) => {
  const [notificationCount] = useState(5);

  const breadcrumbItems = [
    { label: 'Dashboard', current: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between gap-2 lg:gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-8 w-8 p-0"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Breadcrumb area */}
        <div className="flex-1 flex items-center min-w-0">
          <div className="hidden sm:block">
            <ResponsiveBreadcrumb items={breadcrumbItems} />
          </div>
          <h2 className="sm:hidden text-sm font-semibold text-gray-900 dark:text-gray-100 truncate ml-2">
            Dashboard
          </h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-8 w-8 p-0"
            onClick={onNotificationClick}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 lg:w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none dark:text-gray-100">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground dark:text-gray-400">
                    admin@merchantpay.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem onClick={onProfileClick} className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="text-sm cursor-pointer dark:hover:bg-gray-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
