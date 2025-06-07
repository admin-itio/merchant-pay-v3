
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Bell, 
  Search, 
  Settings, 
  HelpCircle,
  User,
  LogOut,
  CreditCard,
  Shield,
  MessageSquare,
  Building,
  Users,
  Mail
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface HeaderProps {
  onToggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ onToggleSidebar, activeTab, setActiveTab }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 lg:h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-2 p-2"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo - hidden on mobile when sidebar is open */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <h1 className="text-lg lg:text-xl font-bold hidden sm:block">MerchantPay</h1>
        </div>

        {/* Search - hidden on small screens */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions, customers..."
              className="pl-8 h-9"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-1 lg:space-x-2 ml-auto">
          {/* Mobile search button */}
          <Button variant="ghost" size="sm" className="md:hidden p-2">
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Announcements/Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                >
                  5
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Notifications</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab('announcements')}
                    className="text-xs"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-muted border-l-2 border-blue-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">New</Badge>
                      <p className="text-sm font-medium">System Maintenance</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Scheduled maintenance on Dec 15, 2024</p>
                  </div>
                  <div className="p-2 rounded bg-muted">
                    <p className="text-sm font-medium">Payment Received</p>
                    <p className="text-xs text-muted-foreground">$1,234 from John Doe</p>
                  </div>
                  <div className="p-2 rounded bg-muted border-l-2 border-red-500">
                    <p className="text-sm font-medium">Chargeback Alert</p>
                    <p className="text-xs text-muted-foreground">Transaction TXN001 disputed</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Support */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hidden sm:flex"
            onClick={() => setActiveTab('support')}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Help</span>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <Building className="mr-2 h-4 w-4" />
                Business Info
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <Shield className="mr-2 h-4 w-4" />
                Security
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <Users className="mr-2 h-4 w-4" />
                Sub Accounts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <Mail className="mr-2 h-4 w-4" />
                Authorized Emails
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('support')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Support Center
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
