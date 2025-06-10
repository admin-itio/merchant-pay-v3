
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const ApiMonitoring = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for API metrics
  const apiMetrics = {
    totalRequests: 145672,
    successRate: 99.2,
    avgResponseTime: 127,
    errorRate: 0.8,
    rateLimitHits: 23,
    uniqueApiKeys: 12
  };

  // Mock data for request trends
  const requestTrends = [
    { time: '00:00', requests: 1200, errors: 12, responseTime: 120 },
    { time: '04:00', requests: 800, errors: 8, responseTime: 110 },
    { time: '08:00', requests: 2400, errors: 18, responseTime: 135 },
    { time: '12:00', requests: 3200, errors: 28, responseTime: 145 },
    { time: '16:00', requests: 2800, errors: 22, responseTime: 138 },
    { time: '20:00', requests: 1800, errors: 15, responseTime: 125 },
  ];

  // Mock data for endpoint performance
  const endpointData = [
    { endpoint: '/api/v1/payments', requests: 45632, avgTime: 145, errorRate: 0.5 },
    { endpoint: '/api/v1/transactions', requests: 34521, avgTime: 98, errorRate: 0.3 },
    { endpoint: '/api/v1/refunds', requests: 12345, avgTime: 203, errorRate: 1.2 },
    { endpoint: '/api/v1/webhooks', requests: 8976, avgTime: 67, errorRate: 0.8 },
    { endpoint: '/api/v1/customers', requests: 6543, avgTime: 134, errorRate: 0.4 }
  ];

  // Mock data for status code distribution
  const statusCodes = [
    { name: '2xx Success', value: 95.2, color: '#10b981' },
    { name: '4xx Client Error', value: 3.8, color: '#f59e0b' },
    { name: '5xx Server Error', value: 1.0, color: '#ef4444' }
  ];

  // Mock data for recent alerts
  const recentAlerts = [
    {
      id: '1',
      type: 'error_rate',
      severity: 'high',
      message: 'Error rate exceeded 5% for /api/v1/refunds endpoint',
      timestamp: '2024-06-07 14:25:30',
      status: 'active'
    },
    {
      id: '2',
      type: 'rate_limit',
      severity: 'medium',
      message: 'Rate limit threshold reached for API key pk_test_123',
      timestamp: '2024-06-07 13:45:15',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'response_time',
      severity: 'low',
      message: 'Average response time increased by 20% in the last hour',
      timestamp: '2024-06-07 13:10:45',
      status: 'investigating'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'investigating': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">API Monitoring</h2>
          <p className="text-gray-600">Monitor API performance, track usage, and manage alerts</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last Hour</SelectItem>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{apiMetrics.totalRequests.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{apiMetrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold">{apiMetrics.avgResponseTime}ms</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-red-600">{apiMetrics.errorRate}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rate Limits</p>
                <p className="text-2xl font-bold text-yellow-600">{apiMetrics.rateLimitHits}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Keys</p>
                <p className="text-2xl font-bold">{apiMetrics.uniqueApiKeys}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Trends</CardTitle>
            <CardDescription>API requests and errors over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={requestTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>Average response time over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={requestTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responseTime" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Endpoint Performance</CardTitle>
            <CardDescription>Performance metrics by API endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Avg Time</TableHead>
                  <TableHead>Error Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpointData.map((endpoint, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{endpoint.endpoint}</TableCell>
                    <TableCell>{endpoint.requests.toLocaleString()}</TableCell>
                    <TableCell>{endpoint.avgTime}ms</TableCell>
                    <TableCell>
                      <Badge variant={endpoint.errorRate > 1 ? 'destructive' : 'default'}>
                        {endpoint.errorRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {endpoint.errorRate > 1 ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Codes</CardTitle>
            <CardDescription>Distribution of HTTP status codes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusCodes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusCodes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {statusCodes.map((status, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: status.color }}
                    />
                    <span>{status.name}</span>
                  </div>
                  <span className="font-medium">{status.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Monitor system alerts and incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(alert.status)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity} priority
                    </Badge>
                    <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <Badge variant="outline">
                    {alert.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiMonitoring;
