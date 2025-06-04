
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  CreditCard, 
  Clock, 
  Users, 
  Settings,
  MarkAsUnread,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'High Decline Rate Detected',
      message: 'Credit card transactions showing 15% decline rate in the last hour',
      timestamp: '2 minutes ago',
      read: false,
      priority: 'high',
      category: 'payments',
      data: { declineRate: '15%', affectedTransactions: 23 }
    },
    {
      id: 2,
      type: 'success',
      title: 'Settlement Completed',
      message: 'Daily settlement of ₹4,56,789 has been successfully processed',
      timestamp: '15 minutes ago',
      read: false,
      priority: 'medium',
      category: 'settlements',
      data: { amount: '₹4,56,789', settlementId: 'SET-2024-001' }
    },
    {
      id: 3,
      type: 'warning',
      title: 'Webhook Delivery Failed',
      message: 'Failed to deliver webhook to endpoint /api/payments (Status: 500)',
      timestamp: '1 hour ago',
      read: true,
      priority: 'medium',
      category: 'technical',
      data: { endpoint: '/api/payments', statusCode: 500, retryCount: 3 }
    },
    {
      id: 4,
      type: 'info',
      title: 'New Customer Registered',
      message: 'New merchant "Tech Solutions Ltd" has completed registration',
      timestamp: '2 hours ago',
      read: true,
      priority: 'low',
      category: 'customers',
      data: { merchantName: 'Tech Solutions Ltd', registrationId: 'REG-2024-145' }
    },
    {
      id: 5,
      type: 'alert',
      title: 'Chargeback Initiated',
      message: 'Chargeback for transaction TXN-2024-5678 (₹12,500) has been initiated',
      timestamp: '3 hours ago',
      read: false,
      priority: 'high',
      category: 'disputes',
      data: { transactionId: 'TXN-2024-5678', amount: '₹12,500', reason: 'Fraud' }
    },
    {
      id: 6,
      type: 'success',
      title: 'API Rate Limit Reset',
      message: 'Your API rate limit has been reset. Current usage: 2,456/10,000',
      timestamp: '4 hours ago',
      read: true,
      priority: 'low',
      category: 'technical',
      data: { currentUsage: 2456, limit: 10000 }
    },
    {
      id: 7,
      type: 'warning',
      title: 'Unusual Transaction Pattern',
      message: 'Detected unusual transaction pattern from IP 192.168.1.100',
      timestamp: '5 hours ago',
      read: false,
      priority: 'medium',
      category: 'security',
      data: { ipAddress: '192.168.1.100', transactionCount: 45, timeframe: '30 minutes' }
    },
    {
      id: 8,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM IST',
      timestamp: '6 hours ago',
      read: true,
      priority: 'medium',
      category: 'system',
      data: { startTime: '2:00 AM IST', endTime: '4:00 AM IST', services: ['Payments', 'Settlements'] }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payments': return <CreditCard className="h-4 w-4" />;
      case 'settlements': return <Clock className="h-4 w-4" />;
      case 'customers': return <Users className="h-4 w-4" />;
      case 'technical': return <Settings className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-gray-600 mt-1">Stay updated with your payment activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MarkAsUnread className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search notifications..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`border-l-4 ${
                notification.priority === 'high' ? 'border-l-red-500' :
                notification.priority === 'medium' ? 'border-l-yellow-500' :
                'border-l-green-500'
              } ${!notification.read ? 'bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            {getCategoryIcon(notification.category)}
                            <span className="text-xs">{notification.category}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          {notification.data && (
                            <div className="flex gap-2">
                              {Object.entries(notification.data).map(([key, value]) => (
                                <Badge key={key} variant="secondary" className="text-xs">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button variant="ghost" size="sm">
                        <MarkAsUnread className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! No new notifications to show.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
