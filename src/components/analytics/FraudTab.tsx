
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const FraudTab = () => {
  const fraudPrediction = [
    { hour: '00:00', risk: 15, transactions: 45 },
    { hour: '06:00', risk: 8, transactions: 120 },
    { hour: '12:00', risk: 25, transactions: 340 },
    { hour: '18:00', risk: 45, transactions: 280 },
    { hour: '24:00', risk: 20, transactions: 90 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Fraud Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fraudPrediction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="font-semibold text-red-800 dark:text-red-200">High Risk Period Detected</span>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            Fraud risk peaks at 6 PM daily. Consider implementing enhanced verification during this period.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudTab;
