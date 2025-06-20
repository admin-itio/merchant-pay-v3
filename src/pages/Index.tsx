
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import FloatingActionButton from "@/components/ui/floating-action-button";
import DashboardEnhanced from "@/components/dashboard/DashboardEnhanced";
import TransactionsList from "@/components/transactions/TransactionsList";
import CustomerManagement from "@/components/customers/CustomerManagement";
import PaymentMethods from "@/components/payment-methods/PaymentMethods";
import ProfileEnhanced from "@/components/profile/ProfileEnhanced";
import OrchestrationRules from "@/components/orchestration/OrchestrationRules";
import Settlements from "@/components/settlements/Settlements";
import PayoutManagement from "@/components/payouts/PayoutManagement";
import TerNoManagement from "@/components/terno/TerNoManagement";
import AnnouncementCenter from "@/components/announcements/AnnouncementCenter";
import ReferralManagement from "@/components/referrals/ReferralManagement";
import SupportCenter from "@/components/support/SupportCenter";
import SupportTickets from "@/components/support/SupportTickets";
import AccountSettings from "@/components/profile/AccountSettings";
import Feedback from "@/components/profile/Feedback";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [activeProfileTab, setActiveProfileTab] = useState('user');
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardEnhanced />;
      case 'transactions':
        return <TransactionsList />;
      case 'customers':
        return <CustomerManagement />;
      case 'payment-methods':
        return <PaymentMethods />;
      case 'profile':
        return <ProfileEnhanced
          activeProfileTab={activeProfileTab}
          setActiveProfileTab={setActiveProfileTab}
        />;
      case 'orchestration':
        return <OrchestrationRules />;
      case 'settlements':
        return <Settlements />;
      case 'payouts':
        return <PayoutManagement />;
      case 'terno':
        return <TerNoManagement />;
      case 'announcements':
        return <AnnouncementCenter />;
      case 'referrals':
        return <ReferralManagement />;
      case 'support':
        return <SupportCenter />;
      case 'support-tickets':
        return <SupportTickets />;
      case 'account-settings':
        return <AccountSettings />;
      case 'feedback':
        return <Feedback />;
      default:
        return <DashboardEnhanced />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
         collapsed={sidebarCollapsed}
  setCollapsed={setSidebarCollapsed}
        
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeProfileTab={activeProfileTab}
          setActiveProfileTab={setActiveProfileTab}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 pb-16 md:pb-0">
          <div className="container mx-auto p-4 lg:p-6 max-w-full">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNav activeTab={activeTab} />

            {/* Page Content */}
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
