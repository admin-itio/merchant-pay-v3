
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PerformanceWidget = () => {
  const [performanceData, setPerformanceData] = useState({
    successRate: 98.5,
    avgResponseTime: 245,
    uptime: 99.9,
    errorRate: 0.3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        ...prev,
        successRate: Math.max(95, Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 0.5)),
        avgResponseTime: Math.max(150, Math.min(500, prev.avgResponseTime + Math.floor((Math.random() - 0.5) * 50)))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (rate: number) => {
    if (rate >= 98) return 'text-green-600';
    if (rate >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          System Performance
        </CardTitle>
        <div className="p-2 bg-emerald-50 rounded-lg">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Success Rate</span>
              <span className={`text-sm font-bold ${getStatusColor(performanceData.successRate)}`}>
                {performanceData.successRate.toFixed(1)}%
              </span>
            </div>
            <Progress value={performanceData.successRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <Clock className="h-3 w-3 mx-auto mb-1 text-blue-600" />
              <div className="text-xs font-medium">{performanceData.avgResponseTime}ms</div>
              <div className="text-xs text-gray-500">Response</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <CheckCircle className="h-3 w-3 mx-auto mb-1 text-green-600" />
              <div className="text-xs font-medium">{performanceData.uptime}%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <AlertTriangle className="h-3 w-3 mx-auto mb-1 text-red-600" />
              <div className="text-xs font-medium">{performanceData.errorRate}%</div>
              <div className="text-xs text-gray-500">Errors</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceWidget;
