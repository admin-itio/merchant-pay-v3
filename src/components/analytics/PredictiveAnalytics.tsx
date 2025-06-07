
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap } from 'lucide-react';
import ReviewPricingStrategy from '../ai-insights/ReviewPricingStrategy';
import ReviewFlaggedTransactions from '../ai-insights/ReviewFlaggedTransactions';
import EngageRetentionCampaign from '../ai-insights/EngageRetentionCampaign';
import ExploreMarketExpansion from '../ai-insights/ExploreMarketExpansion';
import RunNewAnalysis from '../ai-insights/RunNewAnalysis';
import InsightsGrid from './InsightsGrid';
import ForecastTab from './ForecastTab';
import FraudTab from './FraudTab';
import ChurnTab from './ChurnTab';
import AnomalyTab from './AnomalyTab';

const PredictiveAnalytics = () => {
  const [currentView, setCurrentView] = useState<string>('main');

  const handleInsightAction = (actionKey: string) => {
    setCurrentView(actionKey);
  };

  const handleRunNewAnalysis = () => {
    setCurrentView('run-analysis');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  // Render different views based on currentView
  if (currentView === 'pricing-strategy') {
    return <ReviewPricingStrategy onBack={handleBackToMain} />;
  }
  
  if (currentView === 'flagged-transactions') {
    return <ReviewFlaggedTransactions onBack={handleBackToMain} />;
  }
  
  if (currentView === 'retention-campaign') {
    return <EngageRetentionCampaign onBack={handleBackToMain} />;
  }
  
  if (currentView === 'market-expansion') {
    return <ExploreMarketExpansion onBack={handleBackToMain} />;
  }
  
  if (currentView === 'run-analysis') {
    return <RunNewAnalysis onBack={handleBackToMain} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Brain className="h-6 w-6" />
            AI-Powered Predictive Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Machine learning insights and predictions</p>
        </div>
        
        <Button className="flex items-center gap-2" onClick={handleRunNewAnalysis}>
          <Zap className="h-4 w-4" />
          Run New Analysis
        </Button>
      </div>

      <InsightsGrid onInsightAction={handleInsightAction} />

      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <ForecastTab />
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <FraudTab />
        </TabsContent>

        <TabsContent value="churn" className="space-y-4">
          <ChurnTab />
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <AnomalyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
