import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardEnhanced from '@/components/dashboard/DashboardEnhanced';
import TransactionsList from '@/components/transactions/TransactionsList';
import OrchestrationRules from '@/components/orchestration/OrchestrationRules';
import Settlements from '@/components/settlements/Settlements';
import PaymentMethods from '@/components/payment-methods/PaymentMethods';
import ProfileEnhanced from '@/components/profile/ProfileEnhanced';
import ApiDeveloperToolsEnhanced from '@/components/api/ApiDeveloperToolsEnhanced';
import SupportCenter from '@/components/support/SupportCenter';
import ReferralManagement from '@/components/referrals/ReferralManagement';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import DashboardAnalytics from '@/components/dashboard/DashboardAnalytics';
import TerNoManagement from '@/components/terno/TerNoManagement';
import AnnouncementCenter from '@/components/announcements/AnnouncementCenter';
import PayoutManagement from '@/components/payouts/PayoutManagement';
import CustomerManagement from '@/components/customers/CustomerManagement';

// For demo purposes - you would use a proper auth system in production
const isAuthenticated = () => {
  // Simple check for demo purposes
  // In a real app, you would check for a valid token
  // return !!localStorage.getItem('authToken');
  
  // For demo, we'll just return true to skip auth flow
  // Change to false to test auth flow
  return true;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNotificationClick = () => {
    setActiveTab('notifications');
    setSidebarOpen(false);
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardEnhanced />;
      case 'transactions':
        return <TransactionsList />;
      case 'orchestration':
        return <OrchestrationRules />;
      case 'settlements':
        return <Settlements />;
      case 'payouts':
        return <PayoutManagement />;
      case 'payment-methods':
        return <PaymentMethods />;
      case 'profile':
        return <ProfileEnhanced />;
      case 'api-tools':
        return <ApiDeveloperToolsEnhanced />;
      case 'support':
        return <SupportCenter />;
      case 'referrals':
        return <ReferralManagement />;
      case 'notifications':
        return <NotificationCenter />;
      case 'analytics':
        return <DashboardAnalytics />;
      case 'terno':
        return <TerNoManagement />;
      case 'announcements':
        return <AnnouncementCenter />;
      case 'customers':
        return <CustomerManagement />;
      default:
        return <DashboardEnhanced />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          setIsOpen={setSidebarOpen}
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto scrollbar-thin">
          <div className="max-w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
