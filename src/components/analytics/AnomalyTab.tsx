
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const AnomalyTab = () => {
  const anomalyDetection = [
    { 
      type: 'Transaction Spike', 
      severity: 'high', 
      confidence: 94, 
      description: 'Unusual 340% increase in transaction volume from IP block 192.168.1.0/24',
      timestamp: '2 min ago',
      action: 'Auto-flagged for review'
    },
    { 
      type: 'Geographic Anomaly', 
      severity: 'medium', 
      confidence: 87, 
      description: 'Multiple high-value transactions from new geographic region',
      timestamp: '15 min ago',
      action: 'Enhanced verification applied'
    },
    { 
      type: 'Velocity Check', 
      severity: 'low', 
      confidence: 76, 
      description: 'Card used in 3 different cities within 1 hour',
      timestamp: '45 min ago',
      action: 'Temporary hold applied'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalyDetection.map((anomaly, index) => (
            <div key={index} className={`p-4 border rounded-lg ${
              anomaly.severity === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
              anomaly.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
              'border-gray-200 bg-gray-50 dark:bg-gray-800'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${
                    anomaly.severity === 'high' ? 'text-red-600' :
                    anomaly.severity === 'medium' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                  <span className="font-semibold text-sm">{anomaly.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{anomaly.confidence}% confident</Badge>
                  <span className="text-xs text-gray-500">{anomaly.timestamp}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{anomaly.description}</p>
              <p className="text-xs text-gray-500"><strong>Action:</strong> {anomaly.action}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyTab;
