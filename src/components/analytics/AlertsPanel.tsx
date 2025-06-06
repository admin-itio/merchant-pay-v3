
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const AlertsPanel = () => {
  const recentAlerts = [
    { type: 'warning', message: 'High decline rate detected for Card payments', time: '2 min ago' },
    { type: 'info', message: 'Settlement of ₹4,56,789 processed successfully', time: '15 min ago' },
    { type: 'error', message: 'Failed webhook delivery to endpoint /payments', time: '1 hour ago' },
    { type: 'success', message: 'New integration with Bank of India completed', time: '3 hours ago' }
  ];

  return (
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
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === 'error' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <span className="text-sm dark:text-gray-200">{alert.message}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
