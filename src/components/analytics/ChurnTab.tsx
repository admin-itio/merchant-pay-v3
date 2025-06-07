
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ChurnTab = () => {
  const churnAnalysis = [
    { segment: 'High Value', riskScore: 12, retention: 95, value: 450000 },
    { segment: 'Medium Value', riskScore: 28, retention: 78, value: 180000 },
    { segment: 'New Customers', riskScore: 45, retention: 65, value: 45000 },
    { segment: 'Low Activity', riskScore: 72, retention: 23, value: 12000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Churn Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {churnAnalysis.map((segment, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{segment.segment}</h3>
                <Badge variant={segment.riskScore > 50 ? 'destructive' : segment.riskScore > 30 ? 'secondary' : 'default'}>
                  {segment.riskScore}% Risk
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Retention Rate</p>
                  <p className="font-semibold">{segment.retention}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Segment Value</p>
                  <p className="font-semibold">${segment.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurnTab;
