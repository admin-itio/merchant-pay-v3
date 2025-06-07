
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RefreshCw } from 'lucide-react';
import AlertsPanel from '@/components/analytics/AlertsPanel';
import MetricsCards from '@/components/analytics/MetricsCards';
import AnalyticsCharts from '@/components/analytics/AnalyticsCharts';
import FraudAnalysis from '@/components/analytics/FraudAnalysis';
import TopTerminals from '@/components/analytics/TopTerminals';
import HourlyTrends from '@/components/analytics/HourlyTrends';
import ReportsSection from '@/components/analytics/ReportsSection';
import AnalyticsEnhanced from '@/components/analytics/AnalyticsEnhanced';
import TransactionsAnalytics from '@/components/analytics/TransactionsAnalytics';

const DashboardAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time insights and comprehensive merchant reports</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <AlertsPanel />
      <MetricsCards />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Analysis</TabsTrigger>
          <TabsTrigger value="terminals">Top Terminals</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionsAnalytics />
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <FraudAnalysis />
        </TabsContent>

        <TabsContent value="terminals" className="space-y-6">
          <TopTerminals />
        </TabsContent>

        <TabsContent value="hourly" className="space-y-6">
          <HourlyTrends />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsSection />
        </TabsContent>

        <TabsContent value="enhanced" className="space-y-6">
          <AnalyticsEnhanced />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAnalytics;
