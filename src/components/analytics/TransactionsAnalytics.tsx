
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TransactionsAnalytics = () => {
  const transactionTrends = [
    { date: 'Jan 1', successful: 4250, failed: 187, pending: 45 },
    { date: 'Jan 2', successful: 3890, failed: 145, pending: 38 },
    { date: 'Jan 3', successful: 4100, failed: 203, pending: 52 },
    { date: 'Jan 4', successful: 4580, failed: 165, pending: 41 },
    { date: 'Jan 5', successful: 3950, failed: 178, pending: 47 },
    { date: 'Jan 6', successful: 4320, failed: 192, pending: 55 },
    { date: 'Jan 7', successful: 4670, failed: 156, pending: 43 }
  ];

  const transactionStats = [
    { 
      title: 'Total Transactions', 
      value: '32,847', 
      change: '+12.5%', 
      trend: 'up',
      description: 'Total number of transactions processed'
    },
    { 
      title: 'Success Rate', 
      value: '94.2%', 
      change: '+2.1%', 
      trend: 'up',
      description: 'Percentage of successful transactions'
    },
    { 
      title: 'Average Amount', 
      value: '₹2,847', 
      change: '-1.2%', 
      trend: 'down',
      description: 'Average transaction amount'
    },
    { 
      title: 'Failed Transactions', 
      value: '1,890', 
      change: '-8.5%', 
      trend: 'down',
      description: 'Number of failed transactions'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transactionStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Transaction Status Trends
            </CardTitle>
            <p className="text-sm text-gray-600">
              Track successful, failed, and pending transactions over time to identify patterns and issues.
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="successful" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Transaction Volume</CardTitle>
            <p className="text-sm text-gray-600">
              View your daily transaction counts to understand peak processing times and plan capacity.
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="successful" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsAnalytics;
