
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Calendar,
  Filter,
  Globe,
  Target,
  Activity,
  Mail,
  Users,
  Percent,
  Clock,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const DashboardAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [region, setRegion] = useState('all');
  const [reportFrequency, setReportFrequency] = useState('weekly');

  // Enhanced sample data with realistic merchant-focused metrics
  const transactionData = [
    { date: 'Jan 1', successful: 4250, failed: 187, volume: 185000, chargebacks: 12, refunds: 45 },
    { date: 'Jan 2', successful: 3890, failed: 145, volume: 156000, chargebacks: 8, refunds: 38 },
    { date: 'Jan 3', successful: 4100, failed: 203, volume: 174000, chargebacks: 15, refunds: 52 },
    { date: 'Jan 4', successful: 4580, failed: 165, volume: 198000, chargebacks: 9, refunds: 41 },
    { date: 'Jan 5', successful: 3950, failed: 178, volume: 167000, chargebacks: 11, refunds: 47 },
    { date: 'Jan 6', successful: 4320, failed: 192, volume: 189000, chargebacks: 13, refunds: 55 },
    { date: 'Jan 7', successful: 4670, failed: 156, volume: 203000, chargebacks: 7, refunds: 43 }
  ];

  const hourlyData = [
    { hour: '00:00', transactions: 45, volume: 12500 },
    { hour: '01:00', transactions: 23, volume: 6800 },
    { hour: '02:00', transactions: 18, volume: 5200 },
    { hour: '03:00', transactions: 12, volume: 3400 },
    { hour: '04:00', transactions: 15, volume: 4100 },
    { hour: '05:00', transactions: 28, volume: 7800 },
    { hour: '06:00', transactions: 65, volume: 18200 },
    { hour: '07:00', transactions: 89, volume: 24500 },
    { hour: '08:00', transactions: 134, volume: 36800 },
    { hour: '09:00', transactions: 189, volume: 52300 },
    { hour: '10:00', transactions: 234, volume: 64700 },
    { hour: '11:00', transactions: 267, volume: 73800 },
    { hour: '12:00', transactions: 298, volume: 82400 },
    { hour: '13:00', transactions: 245, volume: 67800 },
    { hour: '14:00', transactions: 278, volume: 76900 },
    { hour: '15:00', transactions: 312, volume: 86200 },
    { hour: '16:00', transactions: 289, volume: 79800 },
    { hour: '17:00', transactions: 256, volume: 70800 },
    { hour: '18:00', transactions: 198, volume: 54700 },
    { hour: '19:00', transactions: 167, volume: 46200 },
    { hour: '20:00', transactions: 145, volume: 40100 },
    { hour: '21:00', transactions: 123, volume: 34000 },
    { hour: '22:00', transactions: 89, volume: 24600 },
    { hour: '23:00', transactions: 67, volume: 18500 }
  ];

  const paymentMethodData = [
    { name: 'Credit Card', value: 42, color: '#8B5CF6', volume: 420000, count: 1680 },
    { name: 'Debit Card', value: 28, color: '#06B6D4', volume: 280000, count: 1120 },
    { name: 'UPI', value: 18, color: '#10B981', volume: 180000, count: 720 },
    { name: 'Net Banking', value: 8, color: '#F59E0B', volume: 80000, count: 320 },
    { name: 'Digital Wallet', value: 4, color: '#EF4444', volume: 40000, count: 160 }
  ];

  const topMerchantsData = [
    { merchant: 'E-commerce Store A', volume: 145000, transactions: 567, successRate: 96.8 },
    { merchant: 'Subscription Service B', volume: 98000, transactions: 234, successRate: 98.2 },
    { merchant: 'Digital Marketplace C', volume: 87000, transactions: 445, successRate: 94.5 },
    { merchant: 'SaaS Platform D', volume: 76000, transactions: 189, successRate: 97.1 },
    { merchant: 'Online Retailer E', volume: 65000, transactions: 356, successRate: 95.3 }
  ];

  const fraudAnalysisData = [
    { range: '0-20 (Low)', count: 3200, percentage: 89.2, color: '#10B981' },
    { range: '21-50 (Medium)', count: 280, percentage: 7.8, color: '#F59E0B' },
    { range: '51-80 (High)', count: 85, percentage: 2.4, color: '#EF4444' },
    { range: '81-100 (Critical)', count: 21, percentage: 0.6, color: '#DC2626' }
  ];

  const metrics = [
    {
      title: 'Total Volume',
      value: '₹12,45,67,890',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Last 7 days',
      additionalInfo: '3,586 transactions'
    },
    {
      title: 'Success Rate',
      value: '96.8%',
      change: '+1.4%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Payment success',
      additionalInfo: '3,468 successful'
    },
    {
      title: 'Avg Transaction',
      value: '₹3,474',
      change: '+8.7%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Per transaction',
      additionalInfo: 'Up from ₹3,195'
    },
    {
      title: 'Chargeback Rate',
      value: '0.18%',
      change: '-0.05%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Last 30 days',
      additionalInfo: '6 disputes'
    },
    {
      title: 'Active Customers',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: 'This month',
      additionalInfo: '347 new customers'
    },
    {
      title: 'Conversion Rate',
      value: '78.9%',
      change: '+2.1%',
      trend: 'up',
      icon: Percent,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      description: 'Cart to payment',
      additionalInfo: '4,544 attempts'
    },
    {
      title: 'Avg Settlement',
      value: '2.3 days',
      change: '-0.2 days',
      trend: 'down',
      icon: Clock,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Settlement time',
      additionalInfo: 'Faster by 4 hours'
    },
    {
      title: 'Revenue Today',
      value: '₹1,78,945',
      change: '+23.5%',
      trend: 'up',
      icon: Target,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      description: 'Today vs yesterday',
      additionalInfo: '89 transactions'
    }
  ];

  const recentAlerts = [
    { type: 'warning', message: 'High decline rate detected for Card payments', time: '2 min ago' },
    { type: 'info', message: 'Settlement of ₹4,56,789 processed successfully', time: '15 min ago' },
    { type: 'error', message: 'Failed webhook delivery to endpoint /payments', time: '1 hour ago' },
    { type: 'success', message: 'New integration with Bank of India completed', time: '3 hours ago' }
  ];

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

      {/* Real-time Alerts */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'error' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {metric.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-gray-600 text-xs mt-1">{metric.title}</p>
                  <p className="text-gray-500 text-xs">{metric.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{metric.additionalInfo}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Analysis</TabsTrigger>
          <TabsTrigger value="merchants">Top Merchants</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Transaction Volume Trend (7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'volume' ? `₹${value.toLocaleString()}` : value,
                      name === 'volume' ? 'Volume' : name
                    ]} />
                    <Area type="monotone" dataKey="volume" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Success vs Failed Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="successful" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {paymentMethodData.map((method, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: method.color }}
                          />
                          <span className="font-medium">{method.name}</span>
                        </div>
                        <span className="text-sm font-medium">{method.value}%</span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Volume: ₹{method.volume.toLocaleString()}</div>
                        <div>Transactions: {method.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Fraud Score Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fraudAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Risk Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudAnalysisData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="font-medium">{item.range}</p>
                          <p className="text-sm text-gray-600">{item.count} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.percentage}%</p>
                        <p className="text-sm text-gray-600">of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Performing Merchants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMerchantsData.map((merchant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{merchant.merchant}</p>
                        <p className="text-sm text-gray-600">{merchant.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{merchant.volume.toLocaleString()}</p>
                      <Badge variant={merchant.successRate > 95 ? 'default' : 'secondary'}>
                        {merchant.successRate}% success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Hourly Transaction Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'volume' ? `₹${value.toLocaleString()}` : value,
                    name === 'volume' ? 'Volume' : 'Transactions'
                  ]} />
                  <Area type="monotone" dataKey="transactions" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Transaction Report (CSV)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Settlement Report (Excel)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Fraud Analysis (PDF)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Merchant Performance (CSV)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Automated Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Analytics</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients</label>
                  <Input placeholder="admin@merchant.com, finance@merchant.com" />
                </div>
                <Button className="w-full">Setup Automated Reports</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAnalytics;
