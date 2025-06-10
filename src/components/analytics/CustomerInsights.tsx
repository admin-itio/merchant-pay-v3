
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  Star, 
  ShoppingCart, 
  CreditCard,
  MapPin,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const CustomerInsights = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const customerSegments = [
    {
      name: 'VIP Customers',
      count: 1247,
      revenue: 4500000,
      avgSpend: 3610,
      retention: 94,
      growth: 12.3,
      color: '#8B5CF6'
    },
    {
      name: 'Regular Customers',
      count: 8934,
      revenue: 12300000,
      avgSpend: 1376,
      retention: 78,
      growth: 8.7,
      color: '#06B6D4'
    },
    {
      name: 'New Customers',
      count: 3456,
      revenue: 2100000,
      avgSpend: 608,
      retention: 45,
      growth: 23.1,
      color: '#10B981'
    },
    {
      name: 'At-Risk Customers',
      count: 892,
      revenue: 890000,
      avgSpend: 998,
      retention: 23,
      growth: -15.6,
      color: '#EF4444'
    }
  ];

  const customerJourney = [
    { stage: 'Awareness', count: 15000, conversion: 100 },
    { stage: 'Interest', count: 8500, conversion: 56.7 },
    { stage: 'Consideration', count: 4200, conversion: 49.4 },
    { stage: 'Purchase', count: 2800, conversion: 66.7 },
    { stage: 'Retention', count: 2100, conversion: 75.0 },
    { stage: 'Advocacy', count: 650, conversion: 31.0 }
  ];

  const geographicData = [
    { region: 'North America', customers: 4567, revenue: 8900000, growth: 12.4 },
    { region: 'Europe', customers: 3421, revenue: 6700000, growth: 8.9 },
    { region: 'Asia Pacific', customers: 5832, revenue: 4200000, growth: 28.3 },
    { region: 'Latin America', customers: 1234, revenue: 1800000, growth: 19.7 },
    { region: 'Middle East', customers: 876, revenue: 1300000, growth: 15.2 }
  ];

  const paymentPreferences = [
    { method: 'Credit Card', percentage: 45, count: 7200 },
    { method: 'Digital Wallet', percentage: 28, count: 4480 },
    { method: 'Bank Transfer', percentage: 15, count: 2400 },
    { method: 'Buy Now Pay Later', percentage: 8, count: 1280 },
    { method: 'Cryptocurrency', percentage: 4, count: 640 }
  ];

  const customerLifetime = [
    { month: 'Month 1', value: 150, churn: 15 },
    { month: 'Month 3', value: 280, churn: 12 },
    { month: 'Month 6', value: 450, churn: 8 },
    { month: 'Month 12', value: 720, churn: 5 },
    { month: 'Month 24', value: 1200, churn: 3 },
    { month: 'Month 36', value: 1650, churn: 2 }
  ];

  const topCustomers = [
    { name: 'TechCorp Solutions', id: 'CUST-001', revenue: 450000, transactions: 1247, since: '2021-03-15', status: 'VIP' },
    { name: 'Global Retail Ltd', id: 'CUST-002', revenue: 380000, transactions: 892, since: '2020-11-08', status: 'VIP' },
    { name: 'Digital Innovations', id: 'CUST-003', revenue: 320000, transactions: 756, since: '2022-01-22', status: 'Regular' },
    { name: 'E-commerce Plus', id: 'CUST-004', revenue: 280000, transactions: 634, since: '2021-07-10', status: 'Regular' },
    { name: 'StartupXYZ', id: 'CUST-005', revenue: 150000, transactions: 423, since: '2023-02-14', status: 'New' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Customer Intelligence Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Deep insights into customer behavior and preferences</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="vip">VIP Only</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Customer Segments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerSegments.map((segment, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: segment.color }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{segment.name}</h3>
                <Badge variant={segment.growth > 0 ? 'default' : 'destructive'}>
                  {segment.growth > 0 ? '+' : ''}{segment.growth}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Customers</span>
                  <span className="font-medium">{segment.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
                  <span className="font-medium">${(segment.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Avg Spend</span>
                  <span className="font-medium">${segment.avgSpend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Retention</span>
                  <span className="font-medium">{segment.retention}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="payment">Payment Behavior</TabsTrigger>
          <TabsTrigger value="lifetime">Lifetime Value</TabsTrigger>
          <TabsTrigger value="top">Top Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerJourney} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={100} />
                  <Tooltip formatter={(value, name) => [
                    name === 'count' ? value.toLocaleString() : `${value}%`,
                    name === 'count' ? 'Customers' : 'Conversion Rate'
                  ]} />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Overall Conversion</p>
                  <p className="font-semibold text-green-600">18.7%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Best Stage</p>
                  <p className="font-semibold">Retention (75%)</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Drop-off Point</p>
                  <p className="font-semibold text-orange-600">Advocacy (31%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {geographicData.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{region.region}</h3>
                        <Badge variant={region.growth > 15 ? 'default' : 'secondary'}>
                          +{region.growth}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Customers</p>
                          <p className="font-semibold">{region.customers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Revenue</p>
                          <p className="font-semibold">${(region.revenue / 1000000).toFixed(1)}M</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="customers"
                      label={({ region, customers }) => `${region}: ${customers.toLocaleString()}`}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {paymentPreferences.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{method.method}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{method.count.toLocaleString()} customers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{method.percentage}%</p>
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${method.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={paymentPreferences}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({ method, percentage }) => `${method}: ${percentage}%`}
                    >
                      {paymentPreferences.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifetime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Customer Lifetime Value Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerLifetime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} name="LTV ($)" />
                  <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={3} name="Churn Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg LTV</p>
                  <p className="font-semibold">$1,247</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Payback Period</p>
                  <p className="font-semibold">8.3 months</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Churn Rate</p>
                  <p className="font-semibold text-red-600">2.1%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">ROI</p>
                  <p className="font-semibold text-green-600">340%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Performing Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {customer.id} • Customer since {new Date(customer.since).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold">${customer.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{customer.transactions} transactions</p>
                        </div>
                        <Badge variant={customer.status === 'VIP' ? 'default' : customer.status === 'Regular' ? 'secondary' : 'outline'}>
                          {customer.status}
                        </Badge>
                      </div>
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

export default CustomerInsights;
