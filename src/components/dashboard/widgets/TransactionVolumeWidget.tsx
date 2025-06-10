
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Activity } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const TransactionVolumeWidget = () => {
  const [volumeData, setVolumeData] = useState({
    total: 2847,
    successful: 2698,
    failed: 149,
    successRate: 94.8
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 12; i++) {
        data.push({
          period: i,
          volume: Math.floor(Math.random() * 500) + 200
        });
      }
      return data;
    };

    setChartData(generateData());

    const interval = setInterval(() => {
      setVolumeData(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 10) - 5
      }));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Transaction Volume
        </CardTitle>
        <div className="p-2 bg-blue-50 rounded-lg">
          <CreditCard className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {volumeData.total.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              {volumeData.successful} successful
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              {volumeData.failed} failed
            </span>
          </div>
        </div>
        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionVolumeWidget;
