
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Bell,
  BellOff,
  RefreshCw,
  Zap
} from 'lucide-react';

interface TransactionAlert {
  id: string;
  type: 'fraud' | 'failure' | 'volume' | 'chargeback';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  count?: number;
  threshold?: number;
  acknowledged: boolean;
}

interface LiveMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

const TransactionMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [alerts, setAlerts] = useState<TransactionAlert[]>([
    {
      id: 'alert-1',
      type: 'fraud',
      severity: 'high',
      title: 'High Fraud Score Detected',
      description: '3 transactions with fraud scores above 85 detected in the last 5 minutes',
      timestamp: new Date().toISOString(),
      count: 3,
      threshold: 85,
      acknowledged: false
    },
    {
      id: 'alert-2',
      type: 'failure',
      severity: 'medium',
      title: 'Payment Gateway Failures',
      description: 'Stripe gateway showing 15% failure rate (above 10% threshold)',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      count: 8,
      threshold: 10,
      acknowledged: false
    },
    {
      id: 'alert-3',
      type: 'volume',
      severity: 'low',
      title: 'Volume Spike',
      description: 'Transaction volume 25% above normal for this time period',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      acknowledged: true
    }
  ]);

  const [liveMetrics, setLiveMetrics] = useState<LiveMetric[]>([
    { label: 'Transactions/min', value: 47, change: '+12%', trend: 'up', status: 'good' },
    { label: 'Success Rate', value: '94.2%', change: '-1.2%', trend: 'down', status: 'warning' },
    { label: 'Avg Response Time', value: '245ms', change: '+15ms', trend: 'up', status: 'good' },
    { label: 'Active Fraud Cases', value: 5, change: '+2', trend: 'up', status: 'critical' }
  ]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fraud': return AlertTriangle;
      case 'failure': return XCircle;
      case 'volume': return TrendingUp;
      case 'chargeback': return Clock;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Real-Time Monitoring</h1>
          <p className="text-muted-foreground">Live transaction monitoring and alerting</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isMonitoring ? "default" : "outline"}
            size="sm"
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
            {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="flex items-center">
                  <Activity className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : metric.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                ) : (
                  <Zap className="h-4 w-4 text-gray-600 mr-1" />
                )}
                <span className="text-sm text-muted-foreground">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Active Alerts ({unacknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unacknowledgedAlerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                    <AlertIcon className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm mt-1">{alert.description}</p>
                          <p className="text-xs mt-2 opacity-70">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                icon: CheckCircle,
                color: 'text-green-600',
                title: 'Payment processed successfully',
                description: 'Transaction TXN-2024-156 for $299.99',
                time: '2 minutes ago'
              },
              {
                icon: XCircle,
                color: 'text-red-600',
                title: 'Payment failed',
                description: 'Transaction TXN-2024-157 declined by issuer',
                time: '3 minutes ago'
              },
              {
                icon: AlertTriangle,
                color: 'text-orange-600',
                title: 'High fraud score detected',
                description: 'Transaction TXN-2024-158 flagged for review',
                time: '5 minutes ago'
              },
              {
                icon: CheckCircle,
                color: 'text-green-600',
                title: 'Refund processed',
                description: 'Refund for TXN-2024-145 completed',
                time: '7 minutes ago'
              }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Payment Gateway', status: 'operational', uptime: '99.9%' },
              { name: 'Fraud Detection', status: 'operational', uptime: '99.8%' },
              { name: 'Notification Service', status: 'degraded', uptime: '98.5%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                </div>
                <Badge 
                  variant={service.status === 'operational' ? 'default' : 'destructive'}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionMonitoring;
