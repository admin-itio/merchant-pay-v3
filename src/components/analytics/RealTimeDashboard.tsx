
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  DollarSign,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
  BarChart3,
  Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const RealTimeDashboard = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [liveData, setLiveData] = useState([]);
  const [metrics, setMetrics] = useState({
    transactionsPerMinute: 24,
    successRate: 96.8,
    totalVolume: 245789,
    activeUsers: 1247
  });
  const { toast } = useToast();

  // Simulate live data updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint = {
        time: now.toLocaleTimeString(),
        transactions: Math.floor(Math.random() * 50) + 10,
        volume: Math.floor(Math.random() * 10000) + 1000,
        timestamp: now.getTime()
      };

      setLiveData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 points
      });

      // Update metrics randomly
      setMetrics(prev => ({
        transactionsPerMinute: Math.floor(Math.random() * 10) + 20,
        successRate: 95 + Math.random() * 4,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 1000),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected" : "Connected",
      description: isConnected 
        ? "Real-time data stream has been stopped" 
        : "Real-time data stream is now active",
      variant: isConnected ? "destructive" : "default"
    });
  };

  const recentTransactions = [
    { id: 'TXN001', amount: 1234.56, status: 'completed', time: '2 sec ago' },
    { id: 'TXN002', amount: 89.99, status: 'completed', time: '5 sec ago' },
    { id: 'TXN003', amount: 2456.78, status: 'pending', time: '8 sec ago' },
    { id: 'TXN004', amount: 156.34, status: 'failed', time: '12 sec ago' },
    { id: 'TXN005', amount: 789.45, status: 'completed', time: '15 sec ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Real-Time Transaction Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor live transaction activity and system performance</p>
          
          {/* Live Data Info */}
          <div className="flex items-center gap-2 mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Info className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Live data updates every 2 seconds. Transactions are processed per minute and displayed in real-time.
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="live-mode" className="text-sm font-medium">
              Live Mode
            </Label>
            <Switch
              id="live-mode"
              checked={isConnected}
              onCheckedChange={handleToggleConnection}
            />
          </div>
          <Badge 
            variant={isConnected ? "default" : "destructive"}
            className="flex items-center gap-1"
          >
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions/Min</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.transactionsPerMinute}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">Live updates</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.successRate.toFixed(1)}%</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Activity className="h-3 w-3 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">Real-time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Volume</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.totalVolume.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <BarChart3 className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600">Updating</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeUsers}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Users className="h-3 w-3 text-orange-600 mr-1" />
              <span className="text-xs text-orange-600">Online now</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Transaction Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Transaction Flow
            <Badge variant="outline" className="ml-2">
              {isConnected ? "Live" : "Paused"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                  name="Transactions"
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={false}
                  name="Volume ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Chart Information:</strong> Blue line shows transaction count per minute, Red line shows transaction volume in dollars. 
              Data updates every 2 seconds when connected. Click "Disconnect" to pause real-time updates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{transaction.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${transaction.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{transaction.status}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">All Systems Operational</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">No issues detected</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">High Transaction Volume</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Processing 24 transactions/min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeDashboard;
