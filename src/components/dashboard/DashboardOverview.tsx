
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CreditCard, 
  ArrowUpRight,
  Activity,
  Calendar,
  Phone,
  MessageSquare
} from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Active Customers',
      value: '24,891',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Transactions',
      value: '156,234',
      change: '+15.3%',
      trend: 'up',
      icon: CreditCard,
      description: 'vs last month'
    },
    {
      title: 'Success Rate',
      value: '98.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      description: 'vs last month'
    }
  ];

  const recentTransactions = [
    { id: 'TXN001', customer: 'Amazon Prime', amount: '$23.60', status: 'completed', time: '17:45 • 18/10/23' },
    { id: 'TXN002', customer: 'Netflix', amount: '$403.60', status: 'completed', time: '17:41 • 18/10/23' },
    { id: 'TXN003', customer: 'from Allen', amount: '$253.60', status: 'completed', time: '17:35 • 18/10/23' },
    { id: 'TXN004', customer: 'Send to Jack', amount: '$323.60', status: 'pending', time: '17:45 • 18/10/23' },
    { id: 'TXN005', customer: 'from Allen', amount: '$223.60', status: 'completed', time: '17:25 • 18/10/23' },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <Card key={index} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${
                    index === 0 ? 'bg-blue-100' : 
                    index === 1 ? 'bg-green-100' : 
                    index === 2 ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      index === 0 ? 'text-blue-600' : 
                      index === 1 ? 'text-green-600' : 
                      index === 2 ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Monthly
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total Balance</CardTitle>
              <Badge variant="secondary" className="text-xs">
                32% <TrendingUp className="h-3 w-3 ml-1" />
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold">$120,000</p>
              <p className="text-sm text-gray-600">
                Your total balance of this month compared to the last month from all of your contacts.
              </p>
            </div>
            <div className="h-64 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Swap Your Cards</CardTitle>
              <Button variant="link" size="sm" className="text-xs p-0">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-300">My Account</p>
              <p className="text-lg font-mono">6952 8525 9632 9632</p>
              <div className="flex justify-between items-end mt-3">
                <div>
                  <p className="text-xs text-gray-300">Account Balance</p>
                  <p className="text-lg font-bold">$ 2000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-300">IFSC Code</p>
                  <p className="text-sm">FDRL00052</p>
                </div>
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Recent Transactions</h3>
                <Button variant="link" size="sm" className="text-xs p-0">View All</Button>
              </div>
              <div className="space-y-3">
                {recentTransactions.slice(0, 4).map((transaction, index) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-red-600' : 
                        index === 2 ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {transaction.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.customer}</p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{transaction.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Frequent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequent Transactions</CardTitle>
            <p className="text-sm text-gray-600">Your most used contacts</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                    i === 1 ? 'from-pink-400 to-pink-600' :
                    i === 2 ? 'from-blue-400 to-blue-600' :
                    i === 3 ? 'from-red-400 to-red-600' :
                    i === 4 ? 'from-green-400 to-green-600' :
                    'from-orange-400 to-orange-600'
                  } flex items-center justify-center`}>
                    {i === 5 ? (
                      <span className="text-white text-xl">+</span>
                    ) : (
                      <span className="text-white text-xs">U{i}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Get Detailed Report
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Analytics</CardTitle>
              <Badge variant="secondary" className="text-xs">Last 6 Months</Badge>
            </div>
            <p className="text-sm text-gray-600">You can analyse your finances in detail below.</p>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 text-sm">Analytics Chart</p>
            </div>
          </CardContent>
        </Card>

        {/* Support Section - Bottom Left */}
        <Card className="relative">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Have any problems or have suggestion?</h3>
                <p className="text-sm text-gray-600 mb-3">Try Contact Customer Support</p>
                <Button 
                  size="sm" 
                  className="bg-orange-500 hover:bg-orange-600 text-white mb-2 w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Need Help? Call US
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
