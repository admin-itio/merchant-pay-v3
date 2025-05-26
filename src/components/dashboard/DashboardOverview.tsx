
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, DollarSign, CreditCard, Users, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Transactions',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: CreditCard,
      description: 'vs last month'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+5.1%',
      changeType: 'positive',
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '-0.3%',
      changeType: 'negative',
      icon: TrendingUp,
      description: 'vs last month'
    }
  ];

  const recentTransactions = [
    { id: '1', customer: 'Alice Johnson', amount: '$159.99', status: 'Success', time: '2 mins ago' },
    { id: '2', customer: 'Bob Smith', amount: '$89.50', status: 'Pending', time: '5 mins ago' },
    { id: '3', customer: 'Carol Davis', amount: '$299.99', status: 'Success', time: '12 mins ago' },
    { id: '4', customer: 'David Wilson', amount: '$45.00', status: 'Failed', time: '18 mins ago' },
    { id: '5', customer: 'Eva Brown', amount: '$199.99', status: 'Success', time: '25 mins ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{transaction.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.status === 'Success' 
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
