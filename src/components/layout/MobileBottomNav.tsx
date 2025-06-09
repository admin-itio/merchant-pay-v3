
import React from 'react';
import { 
  Home, 
  CreditCard, 
  Wallet, 
  Shield,
  BarChart3,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMenuToggle: () => void;
}

const MobileBottomNav = ({ activeTab, setActiveTab, onMenuToggle }: MobileBottomNavProps) => {
  const mainTabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'orchestration', label: 'Rules', icon: Shield },
    { id: 'settlements', label: 'Settlements', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-2 py-1">
      <div className="flex items-center justify-around">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3",
                "text-xs font-medium transition-colors",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive && "text-blue-600 dark:text-blue-400"
              )} />
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
              )}
            </Button>
          );
        })}
        
        {/* More Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs font-medium text-gray-600 dark:text-gray-400"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs">More</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
