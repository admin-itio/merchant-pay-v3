
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Building, Bell, CreditCard, Users, Mail, Settings } from 'lucide-react';
import UserProfile from './UserProfile';
import ProfileSecurity from './ProfileSecurity';
import ProfileBusinessInfo from './ProfileBusinessInfo';
import ProfileNotificationSettings from './ProfileNotificationSettings';
import ProfileBilling from './ProfileBilling';
import SubAccountManagement from './SubAccountManagement';
import AuthorizedEmailManagement from './AuthorizedEmailManagement';
import AccountSettings from './AccountSettings';

const ProfileEnhanced = () => {
  const [activeTab, setActiveTab] = useState('user');

  const tabs = [
    { id: 'user', label: 'User Profile', icon: User, component: UserProfile },
    { id: 'business', label: 'Business Info', icon: Building, component: ProfileBusinessInfo },
    { id: 'security', label: 'Security', icon: Shield, component: ProfileSecurity },
    { id: 'sub-accounts', label: 'Sub Accounts', icon: Users, component: SubAccountManagement },
    { id: 'emails', label: 'Authorized Emails', icon: Mail, component: AuthorizedEmailManagement },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: ProfileNotificationSettings },
    { id: 'billing', label: 'Billing', icon: CreditCard, component: ProfileBilling },
    { id: 'settings', label: 'Account Settings', icon: Settings, component: AccountSettings },
  ];

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm lg:text-base text-gray-600 mt-2">Manage your account information, security settings, and business preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full min-w-max lg:min-w-0 bg-gray-100 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium px-2 lg:px-4 py-2"
                >
                  <Icon className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline lg:inline whitespace-nowrap">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-4 lg:mt-6">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ProfileEnhanced;
