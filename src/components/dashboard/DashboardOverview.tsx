import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SupportSection from '@/components/layout/SupportSection';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardOverview = () => {
  // Sample data for charts
  const transactionData = [
    { name: 'Mon', transactions: 65, revenue: 2400 },
    { name: 'Tue', transactions: 78, revenue: 2800 },
    { name: 'Wed', transactions: 52, revenue: 1900 },
    { name: 'Thu', transactions: 91, revenue: 3200 },
    { name: 'Fri', transactions: 84, revenue: 2900 },
    { name: 'Sat', transactions: 67, revenue: 2100 },
    { name: 'Sun', transactions: 45, revenue: 1600 }
  ];

  const paymentMethodData = [
    { name: 'Credit Cards', value: 60, color: '#3B82F6' },
    { name: 'Digital Wallets', value: 25, color: '#10B981' },
    { name: 'Bank Transfers', value: 15, color: '#F59E0B' }
  ];

  const recentTransactions = [
    { id: 'TXN001', customer: 'John Smith', amount: '$245.00', status: 'completed', time: '2 min ago' },
    { id: 'TXN002', customer: 'Sarah Johnson', amount: '$89.50', status: 'pending', time: '5 min ago' },
    { id: 'TXN003', customer: 'Mike Davis', amount: '$1,234.00', status: 'completed', time: '8 min ago' },
    { id: 'TXN004', customer: 'Emma Wilson', amount: '$67.25', status: 'failed', time: '12 min ago' },
    { id: 'TXN005', customer: 'David Brown', amount: '$156.75', status: 'completed', time: '15 min ago' }
  ];

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-0 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Monitor your payment processing performance and key metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-xs lg:text-sm">
            <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm" className="text-xs lg:text-sm">
            <Filter className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="text-xs lg:text-sm">
            <Download className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            Export
          </Button>
          <Button size="sm" className="text-xs lg:text-sm">
            <RefreshCw className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card className="hover-lift">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 lg:space-y-2">
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-xl lg:text-2xl font-bold">$24,531</p>
                <div className="flex items-center text-xs lg:text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  +12.5%
                </div>
              </div>
              <div className="rounded-full bg-green-100 p-2 lg:p-3">
                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 lg:space-y-2">
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Transactions</p>
                <p className="text-xl lg:text-2xl font-bold">1,247</p>
                <div className="flex items-center text-xs lg:text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  +8.2%
                </div>
              </div>
              <div className="rounded-full bg-blue-100 p-2 lg:p-3">
                <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 lg:space-y-2">
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-xl lg:text-2xl font-bold">94.2%</p>
                <div className="flex items-center text-xs lg:text-sm text-red-600">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  -2.1%
                </div>
              </div>
              <div className="rounded-full bg-yellow-100 p-2 lg:p-3">
                <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 lg:space-y-2">
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-xl lg:text-2xl font-bold">892</p>
                <div className="flex items-center text-xs lg:text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  +15.3%
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-2 lg:p-3">
                <Users className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Transaction Volume Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-base lg:text-lg">Transaction Volume</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Daily transaction count and revenue</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-base lg:text-lg">Payment Methods</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Distribution by volume</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs lg:text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-base lg:text-lg">Recent Transactions</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="space-y-3 lg:space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 lg:p-3 rounded-lg border">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-3 w-3 lg:h-4 lg:w-4" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-medium">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs lg:text-sm font-medium">{transaction.amount}</p>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={
                          transaction.status === 'completed' ? 'default' :
                          transaction.status === 'pending' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health and Alerts */}
        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-base lg:text-lg">System Health</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Performance metrics and alerts</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="space-y-4 lg:space-y-6">
              <div>
                <div className="flex justify-between text-xs lg:text-sm mb-2">
                  <span>API Response Time</span>
                  <span>245ms</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs lg:text-sm mb-2">
                  <span>System Uptime</span>
                  <span>99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-green-800">All Systems Operational</p>
                    <p className="text-xs text-green-600">No issues detected</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-yellow-800">High Transaction Volume</p>
                    <p className="text-xs text-yellow-600">Monitor for potential delays</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-blue-50">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-blue-800">Scheduled Maintenance</p>
                    <p className="text-xs text-blue-600">Tomorrow 2:00 AM - 4:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Section - Fixed position at bottom left */}
      <SupportSection />
    </div>
  );
};

export default DashboardOverview;
