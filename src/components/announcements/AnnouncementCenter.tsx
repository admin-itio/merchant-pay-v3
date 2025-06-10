
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  Eye, 
  EyeOff,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Mock announcements data - in real app this would come from API
const mockAnnouncements = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    content: 'We will be performing scheduled maintenance on our payment gateway on Sunday, June 9th from 2:00 AM to 4:00 AM UTC. During this time, some services may be temporarily unavailable.',
    type: 'maintenance',
    priority: 'high',
    createdAt: '2025-06-05T10:00:00Z',
    isRead: false,
    isActive: true
  },
  {
    id: '2',
    title: 'New Payment Method Added',
    content: 'We are excited to announce that we have added support for Apple Pay and Google Pay. You can now enable these payment methods in your TerNo configuration.',
    type: 'feature',
    priority: 'medium',
    createdAt: '2025-06-03T14:30:00Z',
    isRead: true,
    isActive: true
  },
  {
    id: '3',
    title: 'Security Enhancement',
    content: 'We have implemented additional security measures including 2FA requirements for all production accounts. Please ensure your account is properly configured.',
    type: 'security',
    priority: 'high',
    createdAt: '2025-06-01T09:15:00Z',
    isRead: false,
    isActive: true
  },
  {
    id: '4',
    title: 'API Rate Limit Updates',
    content: 'Starting July 1st, we will be implementing new API rate limits to ensure optimal performance for all merchants. Please review our updated documentation.',
    type: 'api',
    priority: 'medium',
    createdAt: '2025-05-28T16:45:00Z',
    isRead: true,
    isActive: true
  },
  {
    id: '5',
    title: 'Holiday Schedule Notice',
    content: 'Please note that settlements will be delayed during the upcoming holiday period. Normal processing will resume on the next business day.',
    type: 'general',
    priority: 'low',
    createdAt: '2025-05-25T11:20:00Z',
    isRead: true,
    isActive: false
  }
];

const AnnouncementCenter = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [activeTab, setActiveTab] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return AlertTriangle;
      case 'security':
        return AlertCircle;
      case 'feature':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'security':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'api':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, isRead: true }
          : announcement
      )
    );
  };

  const markAsUnread = (id: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, isRead: false }
          : announcement
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    switch (activeTab) {
      case 'unread':
        return !announcement.isRead && announcement.isActive;
      case 'archived':
        return !announcement.isActive;
      default:
        return announcement.isActive;
    }
  });

  const unreadCount = announcements.filter(a => !a.isRead && a.isActive).length;

  return (
    <div className="space-y-6 p-4 lg:p-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Announcements
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Stay updated with the latest news and updates
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-red-500 hover:bg-red-500 text-white">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No announcements
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {activeTab === 'unread' 
                      ? "You're all caught up! No unread announcements."
                      : activeTab === 'archived'
                      ? "No archived announcements."
                      : "No announcements available."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => {
                const TypeIcon = getTypeIcon(announcement.type);
                return (
                  <Card 
                    key={announcement.id} 
                    className={`transition-all duration-200 hover:shadow-md ${
                      !announcement.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <TypeIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {announcement.title}
                              </CardTitle>
                              {!announcement.isRead && (
                                <div className={`h-2 w-2 rounded-full ${getPriorityColor(announcement.priority)}`} />
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <Badge className={getTypeColor(announcement.type)}>
                                {announcement.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {announcement.priority} priority
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-3 w-3" />
                                {formatDate(announcement.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {announcement.isRead ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsUnread(announcement.id)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(announcement.id)}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {announcement.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnnouncementCenter;
