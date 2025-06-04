
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Building, Bell, CreditCard, Users } from 'lucide-react';
import ProfileSecurity from './ProfileSecurity';
import ProfileBusinessInfo from './ProfileBusinessInfo';
import ProfileNotificationSettings from './ProfileNotificationSettings';
import ProfileBilling from './ProfileBilling';
import SubAccountManagement from './SubAccountManagement';

const ProfileEnhanced = () => {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business Info', icon: Building, component: ProfileBusinessInfo },
    { id: 'security', label: 'Security', icon: Shield, component: ProfileSecurity },
    { id: 'sub-accounts', label: 'Sub Accounts', icon: Users, component: SubAccountManagement },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: ProfileNotificationSettings },
    { id: 'billing', label: 'Billing', icon: CreditCard, component: ProfileBilling },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information, security settings, and business preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ProfileEnhanced;
