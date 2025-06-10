
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const RevenueWidget = () => {
  const [revenueData, setRevenueData] = useState({
    current: 124567,
    previous: 98234,
    trend: 'up',
    percentage: 26.8
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Generate real-time chart data
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          hour: i,
          revenue: Math.floor(Math.random() * 5000) + 2000
        });
      }
      return data;
    };

    setChartData(generateData());

    // Update data every 30 seconds
    const interval = setInterval(() => {
      setRevenueData(prev => ({
        ...prev,
        current: prev.current + Math.floor(Math.random() * 1000) - 500
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total Revenue
        </CardTitle>
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign className="h-4 w-4 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(revenueData.current)}
        </div>
        <div className="flex items-center gap-1 mt-1">
          {revenueData.trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${
            revenueData.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            +{revenueData.percentage}%
          </span>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueWidget;
