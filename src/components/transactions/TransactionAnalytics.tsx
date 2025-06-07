import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  customer: string;
  timestamp: string;
  fraudScore: number;
  gateway: string;
  country: string;
  category: string;
}

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

const TransactionAnalytics = ({ transactions }: TransactionAnalyticsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  // Generate analytics data
  const analytics = useMemo(() => {
    const now = new Date();
    const periodDays = selectedPeriod === '24h' ? 1 : selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const startDate = new Date(now.getTime() - (periodDays * 24 * 60 * 60 * 1000));
    
    const filteredTransactions = transactions.filter(t => new Date(t.timestamp) >= startDate);
    
    // Summary statistics
    const totalVolume = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalCount = filteredTransactions.length;
    const avgTransactionValue = totalCount > 0 ? totalVolume / totalCount : 0;
    
    const statusCounts = filteredTransactions.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const successRate = totalCount > 0 ? ((statusCounts.completed || 0) / totalCount * 100) : 0;
    const failureRate = totalCount > 0 ? ((statusCounts.failed || 0) / totalCount * 100) : 0;
    const avgFraudScore = totalCount > 0 ? filteredTransactions.reduce((sum, t) => sum + t.fraudScore, 0) / totalCount : 0;
    
    // Daily trends
    const dailyData = [];
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      
      const dayTransactions = filteredTransactions.filter(t => {
        const tDate = new Date(t.timestamp);
        return tDate >= dayStart && tDate < dayEnd;
      });
      
      const dayVolume = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      const dayCount = dayTransactions.length;
      const daySuccessRate = dayCount > 0 ? (dayTransactions.filter(t => t.status === 'completed').length / dayCount * 100) : 0;
      
      dailyData.push({
        date: date.toLocaleDateString(),
        volume: dayVolume,
        count: dayCount,
        successRate: daySuccessRate,
        avgAmount: dayCount > 0 ? dayVolume / dayCount : 0
      });
    }
    
    // Payment method distribution
    const paymentMethodData = filteredTransactions.reduce((acc, t) => {
      const method = t.paymentMethod.split(' ')[0]; // Get just the card type
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const paymentMethodChart = Object.entries(paymentMethodData).map(([method, count]) => ({
      name: method,
      value: count,
      percentage: (count / totalCount * 100).toFixed(1)
    }));
    
    // Gateway performance
    const gatewayData = filteredTransactions.reduce((acc, t) => {
      if (!acc[t.gateway]) {
        acc[t.gateway] = { total: 0, successful: 0, volume: 0 };
      }
      acc[t.gateway].total += 1;
      acc[t.gateway].volume += t.amount;
      if (t.status === 'completed') {
        acc[t.gateway].successful += 1;
      }
      return acc;
    }, {} as Record<string, { total: number; successful: number; volume: number }>);
    
    const gatewayChart = Object.entries(gatewayData).map(([gateway, data]) => ({
      gateway,
      successRate: (data.successful / data.total * 100).toFixed(1),
      volume: data.volume,
      transactions: data.total
    }));
    
    return {
      summary: {
        totalVolume,
        totalCount,
        avgTransactionValue,
        successRate,
        failureRate,
        avgFraudScore
      },
      dailyData,
      paymentMethodChart,
      gatewayChart,
      statusCounts
    };
  }, [transactions, selectedPeriod]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaction Analytics</h1>
          <p className="text-muted-foreground">Insights and trends for your payment data</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">${analytics.summary.totalVolume.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12.5% vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{analytics.summary.successRate.toFixed(1)}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2.1% vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Transaction</p>
                <p className="text-2xl font-bold">${analytics.summary.avgTransactionValue.toFixed(0)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-sm text-red-600">-3.2% vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Fraud Score</p>
                <p className="text-2xl font-bold">{analytics.summary.avgFraudScore.toFixed(0)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">-5 vs previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Daily Volume Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Volume']} />
                    <Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Success Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Success Rate']} />
                    <Line type="monotone" dataKey="successRate" stroke="#00C49F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={analytics.paymentMethodChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analytics.paymentMethodChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, 'Transactions']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {analytics.paymentMethodChart.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <Badge variant="secondary">{item.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Transaction Count by Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Gateway Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.gatewayChart.map((gateway, index) => (
                  <div key={gateway.gateway} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium">{gateway.gateway}</p>
                        <p className="text-sm text-muted-foreground">
                          {gateway.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={parseFloat(gateway.successRate) > 95 ? "default" : 
                               parseFloat(gateway.successRate) > 85 ? "secondary" : "destructive"}
                      >
                        {gateway.successRate}% success
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${gateway.volume.toLocaleString()} volume
                      </p>
                    </div>
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

export default TransactionAnalytics;
