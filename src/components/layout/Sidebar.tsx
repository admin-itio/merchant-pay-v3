import React from 'react';
import {
  Home,
  CreditCard,
  Wallet,
  FileText,
  Shield,
  Menu,
  X,
  Gift,
  Key,
  Megaphone,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SupportCenter2 from './supportCenter';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, collapsed, setCollapsed }: SidebarProps) => {
  // Mock announcement count - in real app this would come from API
  const unreadAnnouncementsCount = 3;
  // Mock environment - in real app this would come from context/store
  const currentEnvironment = 'sandbox'; // or 'production'

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'orchestration', label: 'Orchestration', icon: Shield },
    { id: 'settlements', label: 'Settlements', icon: Wallet },
    { id: 'payouts', label: 'Payouts', icon: ArrowUpRight },
    { id: 'payment-methods', label: 'Payment Methods', icon: FileText },
    { id: 'terno', label: 'TerNo Management', icon: Key },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Megaphone,
      badge: unreadAnnouncementsCount > 0 ? unreadAnnouncementsCount : null
    },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    {
      id: 'support-tickets',
      label: 'Support Tickets',
      icon: HelpCircle,
      badge: null
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
          ${collapsed ? 'w-20' : 'w-56 lg:w-64'}
          transition-all duration-300
        `}
        style={{
          transitionProperty: 'width, left, right, background-color, color, transform',
        }}
      >
        <div className="flex items-center justify-between p-4 lg:p-3 border-b border-gray-200 dark:border-gray-800">
          <span className={`text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-200 ${collapsed ? 'w-full text-center' : ''}`}>
            {collapsed ? 'MP' : 'MerchantPay'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex ml-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="p-3 lg:p-4 space-y-1 lg:space-y-2 scrollbar-thin overflow-y-auto max-h-[calc(100vh-5rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-left transition-colors text-sm lg:text-base
                  ${activeTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }
                `}
              >
                <div className={`flex items-center gap-2 lg:gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <Badge
                    className="bg-red-500 hover:bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
          <div className="pb-4">
            {!collapsed && <SupportCenter2 setActiveTab={setActiveTab} />}
          </div>
        </nav>

      </div>
    </>
  );
};

export default Sidebar;
