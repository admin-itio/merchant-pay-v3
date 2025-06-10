
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Smartphone, Globe, Info } from 'lucide-react';

interface NotificationSettingsProps {
  data: any;
  onChange: (data: any) => void;
}

const NotificationSettings = ({ data, onChange }: NotificationSettingsProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const notificationTypes = [
    {
      id: 'payment_success',
      label: 'Payment Success',
      description: 'Successful payment transactions',
      category: 'transactions'
    },
    {
      id: 'payment_failed',
      label: 'Payment Failed',
      description: 'Failed payment attempts',
      category: 'transactions'
    },
    {
      id: 'refund_processed',
      label: 'Refund Processed',
      description: 'Refund transactions completed',
      category: 'transactions'
    },
    {
      id: 'chargeback_received',
      label: 'Chargeback Received',
      description: 'New chargeback disputes',
      category: 'disputes'
    },
    {
      id: 'settlement_completed',
      label: 'Settlement Completed',
      description: 'Funds settled to your account',
      category: 'settlements'
    },
    {
      id: 'api_errors',
      label: 'API Errors',
      description: 'Integration and API issues',
      category: 'technical'
    },
    {
      id: 'security_alerts',
      label: 'Security Alerts',
      description: 'Suspicious activities and security events',
      category: 'security'
    },
    {
      id: 'system_maintenance',
      label: 'System Maintenance',
      description: 'Planned maintenance and downtime',
      category: 'system'
    }
  ];

  const getNotificationSetting = (type: string, channel: string) => {
    return data.notifications?.[type]?.[channel] || false;
  };

  const updateNotificationSetting = (type: string, channel: string, enabled: boolean) => {
    const currentNotifications = data.notifications || {};
    const typeSettings = currentNotifications[type] || {};
    
    const updatedNotifications = {
      ...currentNotifications,
      [type]: {
        ...typeSettings,
        [channel]: enabled
      }
    };
    
    handleInputChange('notifications', updatedNotifications);
  };

  const channels = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'sms', label: 'SMS', icon: Smartphone },
    { id: 'webhook', label: 'Webhook', icon: Globe },
    { id: 'push', label: 'Push', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send notifications via email
                  </p>
                </div>
                <Switch
                  checked={data.emailEnabled || true}
                  onCheckedChange={(checked) => handleInputChange('emailEnabled', checked)}
                />
              </div>

              {data.emailEnabled && (
                <div className="space-y-2 ml-4">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="admin@company.com"
                    value={data.emailAddress || ''}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={data.smsEnabled || false}
                  onCheckedChange={(checked) => handleInputChange('smsEnabled', checked)}
                />
              </div>

              {data.smsEnabled && (
                <div className="space-y-2 ml-4">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+60123456789"
                    value={data.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Webhook Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send real-time webhooks
                  </p>
                </div>
                <Switch
                  checked={data.webhookEnabled || true}
                  onCheckedChange={(checked) => handleInputChange('webhookEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    In-app push notifications
                  </p>
                </div>
                <Switch
                  checked={data.pushEnabled || true}
                  onCheckedChange={(checked) => handleInputChange('pushEnabled', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select value={data.frequency || 'immediate'} onValueChange={(value) => handleInputChange('frequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={data.timezone || 'Asia/Kuala_Lumpur'} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kuala_Lumpur">Malaysia (UTC+8)</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                  <SelectItem value="Asia/Bangkok">Thailand (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Jakarta">Indonesia (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Manila">Philippines (UTC+8)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quietHoursStart">Quiet Hours Start</Label>
              <Input
                id="quietHoursStart"
                type="time"
                value={data.quietHoursStart || '22:00'}
                onChange={(e) => handleInputChange('quietHoursStart', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quietHoursEnd">Quiet Hours End</Label>
              <Input
                id="quietHoursEnd"
                type="time"
                value={data.quietHoursEnd || '08:00'}
                onChange={(e) => handleInputChange('quietHoursEnd', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quiet Days</Label>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={day}
                    checked={data.quietDays?.includes(day) || false}
                    onChange={(e) => {
                      const currentDays = data.quietDays || [];
                      const updatedDays = e.target.checked
                        ? [...currentDays, day]
                        : currentDays.filter((d: string) => d !== day);
                      handleInputChange('quietDays', updatedDays);
                    }}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={day} className="text-sm font-normal">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Types Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b font-medium">Notification Type</th>
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <th key={channel.id} className="text-center p-3 border-b font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{channel.label}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((notification) => (
                  <tr key={notification.id} className="border-b">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{notification.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.description}
                        </div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {notification.category}
                        </Badge>
                      </div>
                    </td>
                    {channels.map((channel) => (
                      <td key={channel.id} className="text-center p-3">
                        <Switch
                          checked={getNotificationSetting(notification.id, channel.id)}
                          onCheckedChange={(checked) => 
                            updateNotificationSetting(notification.id, channel.id, checked)
                          }
                          disabled={!data[`${channel.id}Enabled`]}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Batch Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Group similar notifications together
                </p>
              </div>
              <Switch
                checked={data.batchNotifications || false}
                onCheckedChange={(checked) => handleInputChange('batchNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Smart Filtering</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Filter out redundant notifications
                </p>
              </div>
              <Switch
                checked={data.smartFiltering || true}
                onCheckedChange={(checked) => handleInputChange('smartFiltering', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Priority Routing</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Route high-priority alerts differently
                </p>
              </div>
              <Switch
                checked={data.priorityRouting || true}
                onCheckedChange={(checked) => handleInputChange('priorityRouting', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Delivery Confirmation</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Require delivery acknowledgment
                </p>
              </div>
              <Switch
                checked={data.deliveryConfirmation || false}
                onCheckedChange={(checked) => handleInputChange('deliveryConfirmation', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Info */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Notification Guidelines
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Critical security alerts bypass quiet hours settings</li>
                <li>• SMS notifications may incur additional charges</li>
                <li>• Webhook notifications require a valid endpoint URL</li>
                <li>• Test notification delivery before going live</li>
                <li>• Configure multiple channels for redundancy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
