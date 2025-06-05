
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
  Mail,
  MailOpen,
  Trash2,
  Filter,
  Search,
  X,
  Check,
  Dot
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([
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
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Notification marked as read",
      duration: 2000,
    });
  };

  const markAsUnread = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
    toast({
      title: "Notification marked as unread",
      duration: 2000,
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      duration: 2000,
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

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
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payments': return <CreditCard className="h-4 w-4" />;
      case 'settlements': return <Clock className="h-4 w-4" />;
      case 'customers': return <Users className="h-4 w-4" />;
      case 'technical': return <Settings className="h-4 w-4" />;
      case 'disputes': return <AlertTriangle className="h-4 w-4" />;
      case 'security': return <Settings className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         notification.category === filter;
    
    const matchesSearch = searchTerm === '' ||
                         notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const categoryCount = (category: string) => notifications.filter(n => n.category === category).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white px-3 py-1 text-sm">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-gray-600 mt-2">Stay updated with your payment activities and system alerts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <MailOpen className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications by title, message, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-6 bg-gray-100 p-1">
          <TabsTrigger value="all" className="text-sm">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-sm">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-sm">
            Payments ({categoryCount('payments')})
          </TabsTrigger>
          <TabsTrigger value="settlements" className="text-sm">
            Settlements ({categoryCount('settlements')})
          </TabsTrigger>
          <TabsTrigger value="disputes" className="text-sm">
            Disputes ({categoryCount('disputes')})
          </TabsTrigger>
          <TabsTrigger value="technical" className="text-sm">
            Technical ({categoryCount('technical')})
          </TabsTrigger>
          <TabsTrigger value="security" className="text-sm">
            Security ({categoryCount('security')})
          </TabsTrigger>
          <TabsTrigger value="system" className="text-sm">
            System ({categoryCount('system')})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-0">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-l-4 transition-all duration-200 hover:shadow-md ${
                  notification.priority === 'high' ? 'border-l-red-500' :
                  notification.priority === 'medium' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                } ${!notification.read ? 'bg-blue-50 shadow-sm' : 'bg-white'}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="flex-shrink-0 mt-2">
                          <Dot className="h-6 w-6 text-blue-600 animate-pulse" />
                        </div>
                      )}
                      
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className={`font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`${getPriorityColor(notification.priority)} text-xs font-medium`}
                          >
                            {notification.priority.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            {getCategoryIcon(notification.category)}
                            <span className="text-xs font-medium capitalize">{notification.category}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">
                            {notification.timestamp}
                          </span>
                          {notification.data && (
                            <div className="flex gap-2 flex-wrap">
                              {Object.entries(notification.data).slice(0, 2).map(([key, value]) => (
                                <Badge key={key} variant="secondary" className="text-xs">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                        title={notification.read ? "Mark as unread" : "Mark as read"}
                      >
                        {notification.read ? (
                          <Mail className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        title="Delete notification"
                      >
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

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching notifications' : 'No notifications found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `No notifications match "${searchTerm}". Try a different search term.`
                : filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications in this category."
              }
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
