
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardEnhanced from '@/components/dashboard/DashboardEnhanced';
import TransactionsList from '@/components/transactions/TransactionsList';
import OrchestrationRules from '@/components/orchestration/OrchestrationRules';
import Settlements from '@/components/settlements/Settlements';
import PaymentMethods from '@/components/payment-methods/PaymentMethods';
import ProfileEnhanced from '@/components/profile/ProfileEnhanced';
import ApiDeveloperTools from '@/components/api/ApiDeveloperTools';
import SupportCenter from '@/components/support/SupportCenter';
import ReferralManagement from '@/components/referrals/ReferralManagement';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      case 'payment-methods':
        return <PaymentMethods />;
      case 'profile':
        return <ProfileEnhanced />;
      case 'api-tools':
        return <ApiDeveloperTools />;
      case 'support':
        return <SupportCenter />;
      case 'referrals':
        return <ReferralManagement />;
      case 'notifications':
        return <NotificationCenter />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-64 lg:h-96 p-4">
            <div className="text-center">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm lg:text-base text-gray-600">Detailed analytics and reporting coming soon</p>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="flex items-center justify-center h-64 lg:h-96 p-4">
            <div className="text-center">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-sm lg:text-base text-gray-600">Customer database and management tools coming soon</p>
            </div>
          </div>
        );
      default:
        return <DashboardEnhanced />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
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
        
        <main className="flex-1 p-3 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
