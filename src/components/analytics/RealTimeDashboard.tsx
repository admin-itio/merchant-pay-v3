
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RealTimeDashboard = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [liveData, setLiveData] = useState({
    tps: 245, // transactions per second
    activeUsers: 12847,
    revenue: 1234567,
    successRate: 96.8,
    activeConnections: 3456,
    serverLoad: 67
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        tps: prev.tps + (Math.random() - 0.5) * 20,
        activeUsers: prev.activeUsers + Math.floor((Math.random() - 0.5) * 100),
        revenue: prev.revenue + Math.floor(Math.random() * 10000),
        successRate: Math.max(90, Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 2)),
        activeConnections: prev.activeConnections + Math.floor((Math.random() - 0.5) * 50),
        serverLoad: Math.max(0, Math.min(100, prev.serverLoad + (Math.random() - 0.5) * 10))
      }));
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const realtimeMetrics = [
    {
      title: 'Transactions/Second',
      value: Math.round(liveData.tps),
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+2.3%'
    },
    {
      title: 'Active Users',
      value: liveData.activeUsers.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+5.7%'
    },
    {
      title: 'Revenue (Live)',
      value: `$${(liveData.revenue / 1000000).toFixed(2)}M`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '+12.4%'
    },
    {
      title: 'Success Rate',
      value: `${liveData.successRate.toFixed(1)}%`,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      trend: '+0.3%'
    }
  ];

  const systemHealth = [
    {
      name: 'API Gateway',
      status: 'healthy',
      responseTime: '45ms',
      uptime: '99.99%'
    },
    {
      name: 'Payment Processor',
      status: 'healthy',
      responseTime: '120ms',
      uptime: '99.95%'
    },
    {
      name: 'Database Cluster',
      status: 'warning',
      responseTime: '230ms',
      uptime: '99.87%'
    },
    {
      name: 'Fraud Detection',
      status: 'healthy',
      responseTime: '67ms',
      uptime: '100%'
    }
  ];

  const recentTransactions = [
    { id: 'TXN-001', amount: 1250, status: 'success', country: 'US', time: '2s ago' },
    { id: 'TXN-002', amount: 890, status: 'success', country: 'UK', time: '4s ago' },
    { id: 'TXN-003', amount: 2100, status: 'pending', country: 'IN', time: '6s ago' },
    { id: 'TXN-004', amount: 567, status: 'failed', country: 'DE', time: '8s ago' },
    { id: 'TXN-005', amount: 3400, status: 'success', country: 'SG', time: '12s ago' }
  ];

  const generateRealtimeChart = () => {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(now.getTime() - (19 - i) * 5000).toLocaleTimeString('en-US', { 
        hour12: false, 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      value: Math.floor(Math.random() * 100 + 150)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-600" />
          )}
          <div>
            <p className="font-medium">
              {isConnected ? 'Connected to Real-time Feed' : 'Connection Lost'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsConnected(!isConnected)}
        >
          {isConnected ? 'Disconnect' : 'Reconnect'}
        </Button>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realtimeMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metric.trend}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                </div>
                {/* Animated pulse effect */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Transaction Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={generateRealtimeChart()}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      system.status === 'healthy' ? 'bg-green-500' :
                      system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{system.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {system.responseTime} • {system.uptime} uptime
                      </p>
                    </div>
                  </div>
                  <Badge variant={system.status === 'healthy' ? 'default' : 'secondary'}>
                    {system.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Load */}
        <Card>
          <CardHeader>
            <CardTitle>Server Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU Usage</span>
                <span>{Math.round(liveData.serverLoad)}%</span>
              </div>
              <Progress value={liveData.serverLoad} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Network I/O</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Active Connections</span>
                <span>{Math.round(liveData.activeConnections)}</span>
              </div>
              <Progress value={(liveData.activeConnections / 5000) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Live Transaction Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((txn, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      txn.status === 'success' ? 'bg-green-500' :
                      txn.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{txn.id}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {txn.country} • {txn.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${txn.amount}</p>
                    <Badge variant={
                      txn.status === 'success' ? 'default' :
                      txn.status === 'pending' ? 'secondary' : 'destructive'
                    } className="text-xs">
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeDashboard;
