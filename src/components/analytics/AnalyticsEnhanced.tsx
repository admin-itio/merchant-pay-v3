
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, Clock, Brain } from 'lucide-react';
import ReportBuilder from './ReportBuilder';
import ScheduledReports from './ScheduledReports';
import AdvancedAnalytics from './AdvancedAnalytics';

const AnalyticsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('builder');

  const tabs = [
    { id: 'builder', label: 'Report Builder', icon: BarChart3, component: ReportBuilder },
    { id: 'scheduled', label: 'Scheduled Reports', icon: Clock, component: ScheduledReports },
    { id: 'advanced', label: 'Advanced Analytics', icon: Brain, component: AdvancedAnalytics },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting</h1>
        <p className="text-gray-600 mt-2">Build custom reports, schedule automated delivery, and gain advanced insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800">
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

export default AnalyticsEnhanced;
