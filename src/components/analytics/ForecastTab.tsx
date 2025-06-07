
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const ForecastTab = () => {
  const revenueForcast = [
    { month: 'Jan', actual: 450000, predicted: 465000, confidence: 92 },
    { month: 'Feb', actual: 520000, predicted: 510000, confidence: 88 },
    { month: 'Mar', actual: 480000, predicted: 495000, confidence: 90 },
    { month: 'Apr', actual: null, predicted: 580000, confidence: 85 },
    { month: 'May', actual: null, predicted: 620000, confidence: 83 },
    { month: 'Jun', actual: null, predicted: 675000, confidence: 80 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>6-Month Revenue Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueForcast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              `$${value?.toLocaleString()}`,
              name === 'actual' ? 'Actual Revenue' : 'Predicted Revenue'
            ]} />
            <Area type="monotone" dataKey="actual" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            <Area type="monotone" dataKey="predicted" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Predicted Growth</p>
            <p className="font-semibold text-green-600">+23.4%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Confidence Level</p>
            <p className="font-semibold">85.3%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">Next Month</p>
            <p className="font-semibold">$580K</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastTab;
