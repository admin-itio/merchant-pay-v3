
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Users, 
  Target, 
  TrendingUp, 
  Info, 
  BarChart3, 
  PieChart, 
  Activity,
  Zap,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedAnalytics = () => {
  const [selectedSegment, setSelectedSegment] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');

  // Sample data for visualizations
  const cohortData = [
    { month: 'Jan', retention: 100, revenue: 45000 },
    { month: 'Feb', retention: 78, revenue: 35100 },
    { month: 'Mar', retention: 65, revenue: 29250 },
    { month: 'Apr', retention: 58, revenue: 26100 },
    { month: 'May', retention: 52, revenue: 23400 },
    { month: 'Jun', retention: 48, revenue: 21600 }
  ];

  const segmentData = [
    { segment: 'High Value', customers: 245, revenue: 125000, avgOrder: 510 },
    { segment: 'Regular', customers: 1250, revenue: 187500, avgOrder: 150 },
    { segment: 'New Users', customers: 890, revenue: 89000, avgOrder: 100 },
    { segment: 'At Risk', customers: 156, revenue: 23400, avgOrder: 150 }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Revenue Optimization',
      insight: 'Customers who make purchases on weekends have 23% higher average order value',
      action: 'Consider weekend promotions or targeted campaigns',
      impact: 'Potential 12% revenue increase'
    },
    {
      type: 'warning',
      title: 'Churn Risk Alert',
      insight: '156 customers show declining transaction patterns',
      action: 'Launch retention campaign with personalized offers',
      impact: 'Prevent estimated ₹45,000 revenue loss'
    },
    {
      type: 'trend',
      title: 'Payment Method Shift',
      insight: 'UPI transactions increased 34% while card usage decreased 12%',
      action: 'Optimize UPI checkout flow and consider UPI-specific offers',
      impact: 'Improve conversion by 8%'
    }
  ];

  const predictiveMetrics = [
    { metric: 'Expected Monthly Revenue', value: '₹2,45,000', confidence: 'High (92%)', trend: '+15%' },
    { metric: 'Customer Churn Rate', value: '3.2%', confidence: 'Medium (78%)', trend: '+0.5%' },
    { metric: 'Transaction Success Rate', value: '96.8%', confidence: 'High (94%)', trend: '+1.2%' },
    { metric: 'Average Order Value', value: '₹1,847', confidence: 'High (89%)', trend: '+8%' }
  ];

  const segmentColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'trend': return <Activity className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Advanced Analytics Hub
          </CardTitle>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Purpose:</strong> Unlock deeper business insights with AI-powered analytics, customer segmentation, 
              cohort analysis, and predictive modeling to drive strategic decision-making.
            </p>
            <p className="text-xs text-purple-600 mt-2">
              <strong>Use Cases:</strong> Customer lifetime value prediction • Churn prevention • Revenue forecasting • Market segmentation • Behavioral analysis
            </p>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="cohort" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="cohort" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Cohort Analysis
              </CardTitle>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>What is Cohort Analysis?</strong> Track how groups of customers behave over time. 
                  See how many customers from each month continue to make purchases and generate revenue.
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  <strong>Why use it?</strong> Understand customer retention • Measure customer lifetime value • Identify the best acquisition channels • Plan retention strategies
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select cohort period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Cohorts</SelectItem>
                    <SelectItem value="quarterly">Quarterly Cohorts</SelectItem>
                    <SelectItem value="weekly">Weekly Cohorts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'retention' ? `${value}%` : `₹${value.toLocaleString()}`,
                    name === 'retention' ? 'Retention Rate' : 'Revenue'
                  ]} />
                  <Line type="monotone" dataKey="retention" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">6-Month Retention</p>
                  <p className="text-2xl font-bold text-blue-700">48%</p>
                  <p className="text-xs text-blue-600">Above industry average of 35%</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900">Customer LTV</p>
                  <p className="text-2xl font-bold text-green-700">₹4,250</p>
                  <p className="text-xs text-green-600">Average customer lifetime value</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-900">Best Cohort</p>
                  <p className="text-2xl font-bold text-purple-700">January</p>
                  <p className="text-xs text-purple-600">Highest retention and revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Segmentation
              </CardTitle>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>What is Segmentation?</strong> Group customers based on behavior, value, and engagement patterns. 
                  Each segment represents different customer types with unique characteristics.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  <strong>Benefits:</strong> Personalized marketing • Targeted offers • Better customer service • Improved retention strategies
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select segment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Value-based</SelectItem>
                    <SelectItem value="behavior">Behavior-based</SelectItem>
                    <SelectItem value="geography">Geography-based</SelectItem>
                    <SelectItem value="lifecycle">Lifecycle-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={segmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {segmentData.map((segment, index) => (
                    <div key={segment.segment} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{segment.segment}</h3>
                        <Badge style={{ backgroundColor: segmentColors[index] }} className="text-white">
                          {segment.customers} customers
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>Revenue: ₹{segment.revenue.toLocaleString()}</span>
                        <span>Avg Order: ₹{segment.avgOrder}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>What are AI Insights?</strong> Machine learning algorithms analyze your data to discover hidden patterns, 
                  opportunities, and risks that might not be obvious in regular reports.
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  <strong>How it helps:</strong> Automatic pattern detection • Actionable recommendations • Risk alerts • Revenue opportunities • Data-driven decisions
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{insight.insight}</p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">Recommended Action:</p>
                          <p className="text-sm text-gray-600">{insight.action}</p>
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Predictive Analytics
              </CardTitle>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-indigo-800">
                  <strong>What is Predictive Analytics?</strong> Use historical data and machine learning to forecast future trends, 
                  customer behavior, and business metrics with confidence levels.
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  <strong>Applications:</strong> Revenue forecasting • Churn prediction • Demand planning • Risk assessment • Capacity planning
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictiveMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{metric.metric}</h3>
                      <Badge variant="outline">{metric.confidence}</Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        <p className="text-xs text-gray-500">Predicted for next 30 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{metric.trend}</p>
                        <p className="text-xs text-gray-500">vs last period</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Model Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700">Prediction Accuracy</p>
                    <p className="font-bold text-blue-900">87.3%</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Data Points Used</p>
                    <p className="font-bold text-blue-900">50,000+</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Last Updated</p>
                    <p className="font-bold text-blue-900">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
