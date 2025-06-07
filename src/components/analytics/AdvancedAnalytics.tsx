
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, Brain, Target, Zap } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const trendData = [
    { date: '2024-01-01', revenue: 45000, transactions: 1250, conversion: 94.2, fraud: 2.1 },
    { date: '2024-01-02', revenue: 52000, transactions: 1430, conversion: 95.1, fraud: 1.8 },
    { date: '2024-01-03', revenue: 48000, transactions: 1320, conversion: 93.8, fraud: 2.3 },
    { date: '2024-01-04', revenue: 58000, transactions: 1580, conversion: 96.2, fraud: 1.5 },
    { date: '2024-01-05', revenue: 61000, transactions: 1650, conversion: 95.8, fraud: 1.9 },
    { date: '2024-01-06', revenue: 55000, transactions: 1490, conversion: 94.5, fraud: 2.0 },
    { date: '2024-01-07', revenue: 67000, transactions: 1820, conversion: 97.1, fraud: 1.2 }
  ];

  const cohortData = [
    { month: 'Jan', week1: 100, week2: 85, week3: 72, week4: 65 },
    { month: 'Feb', week1: 100, week2: 88, week3: 76, week4: 68 },
    { month: 'Mar', week1: 100, week2: 82, week3: 70, week4: 62 },
    { month: 'Apr', week1: 100, week2: 90, week3: 78, week4: 71 }
  ];

  const segmentData = [
    { name: 'Premium', value: 35, revenue: 450000, color: '#8B5CF6' },
    { name: 'Standard', value: 45, revenue: 320000, color: '#06B6D4' },
    { name: 'Basic', value: 20, revenue: 180000, color: '#10B981' }
  ];

  const performanceMetrics = [
    { 
      title: 'Revenue Growth', 
      value: '+24.5%', 
      change: '+3.2%', 
      trend: 'up', 
      icon: TrendingUp,
      color: 'text-green-600' 
    },
    { 
      title: 'Conversion Rate', 
      value: '94.8%', 
      change: '+1.2%', 
      trend: 'up', 
      icon: Target,
      color: 'text-blue-600' 
    },
    { 
      title: 'Fraud Rate', 
      value: '1.8%', 
      change: '-0.3%', 
      trend: 'down', 
      icon: Brain,
      color: 'text-red-600' 
    },
    { 
      title: 'Processing Speed', 
      value: '1.2s', 
      change: '-0.1s', 
      trend: 'down', 
      icon: Zap,
      color: 'text-purple-600' 
    }
  ];

  const predictiveInsights = [
    {
      title: 'Revenue Forecast',
      prediction: 'Expected 15% increase next month',
      confidence: 89,
      type: 'positive'
    },
    {
      title: 'Fraud Alert',
      prediction: 'Potential spike in fraudulent activities detected',
      confidence: 76,
      type: 'warning'
    },
    {
      title: 'Customer Churn',
      prediction: '12% of premium customers at risk',
      confidence: 82,
      type: 'negative'
    },
    {
      title: 'Peak Hours',
      prediction: 'Traffic surge expected 2-4 PM today',
      confidence: 94,
      type: 'info'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'negative': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === 'up' ? 
                        <TrendingUp className="h-3 w-3 text-green-600" /> :
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      }
                      <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Transaction Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" fill="#8B5CF6" fillOpacity={0.3} stroke="#8B5CF6" />
                  <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#06B6D4" strokeWidth={2} />
                  <Bar yAxisId="right" dataKey="fraud" fill="#EF4444" opacity={0.7} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohort" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Cohort</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="week1" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="week2" stroke="#06B6D4" strokeWidth={2} />
                  <Line type="monotone" dataKey="week3" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="week4" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segmentData.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <p className="font-medium">{segment.name}</p>
                          <p className="text-sm text-gray-600">{segment.value}% of customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${segment.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {predictiveInsights.map((insight, index) => (
              <Card key={index} className={`border-2 ${getInsightColor(insight.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <p className="text-sm text-gray-700 mt-1">{insight.prediction}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          {insight.confidence}% confidence
                        </Badge>
                        <Activity className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
