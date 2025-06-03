
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Activity, CreditCard, Users, Settings, HelpCircle } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import DashboardAnalytics from './DashboardAnalytics';

const DashboardEnhanced = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, component: DashboardOverview },
    { id: 'analytics', label: 'Analytics', icon: Activity, component: DashboardAnalytics },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
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

export default DashboardEnhanced;
