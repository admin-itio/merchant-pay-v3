
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Zap,
  Eye,
  Shield
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('revenue');

  // Predictive data models
  const revenueForcast = [
    { month: 'Jan', actual: 450000, predicted: 465000, confidence: 92 },
    { month: 'Feb', actual: 520000, predicted: 510000, confidence: 88 },
    { month: 'Mar', actual: 480000, predicted: 495000, confidence: 90 },
    { month: 'Apr', actual: null, predicted: 580000, confidence: 85 },
    { month: 'May', actual: null, predicted: 620000, confidence: 83 },
    { month: 'Jun', actual: null, predicted: 675000, confidence: 80 },
  ];

  const fraudPrediction = [
    { hour: '00:00', risk: 15, transactions: 45 },
    { hour: '06:00', risk: 8, transactions: 120 },
    { hour: '12:00', risk: 25, transactions: 340 },
    { hour: '18:00', risk: 45, transactions: 280 },
    { hour: '24:00', risk: 20, transactions: 90 },
  ];

  const churnAnalysis = [
    { segment: 'High Value', riskScore: 12, retention: 95, value: 450000 },
    { segment: 'Medium Value', riskScore: 28, retention: 78, value: 180000 },
    { segment: 'New Customers', riskScore: 45, retention: 65, value: 45000 },
    { segment: 'Low Activity', riskScore: 72, retention: 23, value: 12000 },
  ];

  const anomalyDetection = [
    { 
      type: 'Transaction Spike', 
      severity: 'high', 
      confidence: 94, 
      description: 'Unusual 340% increase in transaction volume from IP block 192.168.1.0/24',
      timestamp: '2 min ago',
      action: 'Auto-flagged for review'
    },
    { 
      type: 'Geographic Anomaly', 
      severity: 'medium', 
      confidence: 87, 
      description: 'Multiple high-value transactions from new geographic region',
      timestamp: '15 min ago',
      action: 'Enhanced verification applied'
    },
    { 
      type: 'Velocity Check', 
      severity: 'low', 
      confidence: 76, 
      description: 'Card used in 3 different cities within 1 hour',
      timestamp: '45 min ago',
      action: 'Temporary hold applied'
    },
  ];

  const insights = [
    {
      title: 'Revenue Optimization',
      impact: 'High',
      description: 'Implementing dynamic pricing could increase revenue by 12-18%',
      action: 'Review pricing strategy',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Fraud Prevention',
      impact: 'Critical',
      description: 'AI model detected 15 potential fraud patterns requiring immediate attention',
      action: 'Review flagged transactions',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Customer Retention',
      impact: 'Medium',
      description: '23% of high-value customers show early churn indicators',
      action: 'Engage retention campaigns',
      icon: Target,
      color: 'text-orange-600'
    },
    {
      title: 'Market Opportunity',
      impact: 'High',
      description: 'Southeast Asian markets show 45% growth potential',
      action: 'Explore market expansion',
      icon: Eye,
      color: 'text-blue-600'
    },
  ];

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
        
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Run New Analysis
        </Button>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                  <Badge variant={insight.impact === 'Critical' ? 'destructive' : insight.impact === 'High' ? 'default' : 'secondary'}>
                    {insight.impact}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-2">{insight.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  {insight.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Month Revenue Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueForcast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    `$${value?.toLocaleString()}`,
                    name === 'actual' ? 'Actual Revenue' : 'Predicted Revenue'
                  ]} />
                  <Area type="monotone" dataKey="actual" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="predicted" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Predicted Growth</p>
                  <p className="font-semibold text-green-600">+23.4%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Confidence Level</p>
                  <p className="font-semibold">85.3%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Next Month</p>
                  <p className="font-semibold">$580K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Fraud Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudPrediction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-800 dark:text-red-200">High Risk Period Detected</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Fraud risk peaks at 6 PM daily. Consider implementing enhanced verification during this period.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Churn Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churnAnalysis.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{segment.segment}</h3>
                      <Badge variant={segment.riskScore > 50 ? 'destructive' : segment.riskScore > 30 ? 'secondary' : 'default'}>
                        {segment.riskScore}% Risk
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Retention Rate</p>
                        <p className="font-semibold">{segment.retention}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Segment Value</p>
                        <p className="font-semibold">${segment.value.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalyDetection.map((anomaly, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    anomaly.severity === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
                    anomaly.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-gray-200 bg-gray-50 dark:bg-gray-800'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          anomaly.severity === 'high' ? 'text-red-600' :
                          anomaly.severity === 'medium' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`} />
                        <span className="font-semibold text-sm">{anomaly.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{anomaly.confidence}% confident</Badge>
                        <span className="text-xs text-gray-500">{anomaly.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{anomaly.description}</p>
                    <p className="text-xs text-gray-500"><strong>Action:</strong> {anomaly.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
