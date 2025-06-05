
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Activity, Globe, Brain, Zap, Users } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import DashboardAnalytics from './DashboardAnalytics';
import WorldMapAnalytics from '../analytics/WorldMapAnalytics';
import PredictiveAnalytics from '../analytics/PredictiveAnalytics';
import RealTimeDashboard from '../analytics/RealTimeDashboard';
import CustomerInsights from '../analytics/CustomerInsights';

const DashboardEnhanced = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, component: DashboardOverview },
    { id: 'analytics', label: 'Analytics', icon: Activity, component: DashboardAnalytics },
    { id: 'world-map', label: 'Global View', icon: Globe, component: WorldMapAnalytics },
    { id: 'predictive', label: 'AI Insights', icon: Brain, component: PredictiveAnalytics },
    { id: 'realtime', label: 'Real-time', icon: Zap, component: RealTimeDashboard },
    { id: 'customers', label: 'Customers', icon: Users, component: CustomerInsights },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-gray-100 dark:bg-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-sm font-medium px-3 py-2"
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

export default DashboardEnhanced;
