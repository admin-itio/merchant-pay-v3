
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard,
  Clock,
  Shield,
  Settings
} from 'lucide-react';

const ProfileNotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    transactionAlerts: true,
    chargebackNotifications: true,
    settlementUpdates: true,
    fraudAlerts: true,
    systemMaintenance: false,
    weeklyReports: true,
    monthlyReports: true
  });

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    chargebacks: true,
    largeTransactions: false,
    systemDowntime: true
  });

  const notificationCategories = [
    {
      title: 'Transaction Notifications',
      icon: CreditCard,
      description: 'Get notified about payment activities',
      settings: [
        { key: 'transactionAlerts', label: 'Transaction Alerts', description: 'Failed, successful, and pending transactions' },
        { key: 'largeTransactions', label: 'Large Transaction Alerts', description: 'Transactions above ₹50,000' },
        { key: 'settlementUpdates', label: 'Settlement Updates', description: 'Daily settlement notifications' }
      ]
    },
    {
      title: 'Security & Fraud',
      icon: Shield,
      description: 'Important security notifications',
      settings: [
        { key: 'fraudAlerts', label: 'Fraud Alerts', description: 'Suspicious transaction patterns' },
        { key: 'chargebackNotifications', label: 'Chargeback Notifications', description: 'New chargeback initiated' },
        { key: 'criticalAlerts', label: 'Critical Security Alerts', description: 'Account security issues' }
      ]
    },
    {
      title: 'System & Reports',
      icon: Settings,
      description: 'System updates and reports',
      settings: [
        { key: 'systemMaintenance', label: 'System Maintenance', description: 'Scheduled maintenance notifications' },
        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly transaction summary' },
        { key: 'monthlyReports', label: 'Monthly Reports', description: 'Monthly business reports' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure how and when you want to receive notifications
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <Input type="email" defaultValue="admin@techsolutions.com" />
              <p className="text-xs text-gray-500 mt-1">Primary email for notifications</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Smartphone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              <Input type="tel" defaultValue="+91 9876543210" />
              <p className="text-xs text-gray-500 mt-1">For SMS alerts</p>
            </div>
          </div>

          {/* Notification Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Frequency
            </label>
            <Select defaultValue="immediate">
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-3 ml-7">
                  {category.settings.map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{setting.label}</h4>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <Switch
                        checked={emailNotifications[setting.key as keyof typeof emailNotifications] || false}
                        onCheckedChange={(checked) => {
                          setEmailNotifications(prev => ({
                            ...prev,
                            [setting.key]: checked
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
          <p className="text-sm text-gray-600">
            SMS notifications for critical alerts only
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Critical Alerts</h4>
                <p className="text-xs text-gray-500">System failures and security issues</p>
              </div>
              <Switch
                checked={smsNotifications.criticalAlerts}
                onCheckedChange={(checked) => 
                  setSmsNotifications(prev => ({ ...prev, criticalAlerts: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Chargeback Alerts</h4>
                <p className="text-xs text-gray-500">Immediate chargeback notifications</p>
              </div>
              <Switch
                checked={smsNotifications.chargebacks}
                onCheckedChange={(checked) => 
                  setSmsNotifications(prev => ({ ...prev, chargebacks: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Large Transactions</h4>
                <p className="text-xs text-gray-500">Transactions above ₹1,00,000</p>
              </div>
              <Switch
                checked={smsNotifications.largeTransactions}
                onCheckedChange={(checked) => 
                  setSmsNotifications(prev => ({ ...prev, largeTransactions: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">System Downtime</h4>
                <p className="text-xs text-gray-500">Service interruption alerts</p>
              </div>
              <Switch
                checked={smsNotifications.systemDowntime}
                onCheckedChange={(checked) => 
                  setSmsNotifications(prev => ({ ...prev, systemDowntime: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Notification Settings</Button>
      </div>
    </div>
  );
};

export default ProfileNotificationSettings;
