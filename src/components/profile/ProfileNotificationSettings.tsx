
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, Smartphone, Volume2, Clock, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettings {
  email: {
    transactions: boolean;
    settlements: boolean;
    security: boolean;
    reports: boolean;
    marketing: boolean;
    system: boolean;
  };
  push: {
    transactions: boolean;
    settlements: boolean;
    security: boolean;
    reports: boolean;
    system: boolean;
  };
  sms: {
    security: boolean;
    urgent: boolean;
  };
  frequency: {
    reports: 'daily' | 'weekly' | 'monthly';
    summaries: 'daily' | 'weekly' | 'monthly';
  };
  thresholds: {
    transactionAmount: string;
    failureRate: string;
    lowBalance: string;
  };
}

const ProfileNotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      transactions: true,
      settlements: true,
      security: true,
      reports: true,
      marketing: false,
      system: true,
    },
    push: {
      transactions: true,
      settlements: true,
      security: true,
      reports: false,
      system: true,
    },
    sms: {
      security: true,
      urgent: true,
    },
    frequency: {
      reports: 'weekly',
      summaries: 'daily',
    },
    thresholds: {
      transactionAmount: '10000',
      failureRate: '5',
      lowBalance: '1000',
    },
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const updateSetting = (category: keyof NotificationSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const notificationTypes = [
    {
      key: 'transactions',
      label: 'Transaction Notifications',
      description: 'Alerts for new transactions, refunds, and chargebacks',
      icon: '💳'
    },
    {
      key: 'settlements',
      label: 'Settlement Notifications',
      description: 'Updates on payouts and settlement processing',
      icon: '💰'
    },
    {
      key: 'security',
      label: 'Security Alerts',
      description: 'Login attempts, API usage, and security events',
      icon: '🔒'
    },
    {
      key: 'reports',
      label: 'Reports & Analytics',
      description: 'Scheduled reports and performance summaries',
      icon: '📊'
    },
    {
      key: 'system',
      label: 'System Updates',
      description: 'Maintenance, outages, and platform updates',
      icon: '⚙️'
    },
    {
      key: 'marketing',
      label: 'Marketing Communications',
      description: 'Product updates, tips, and promotional content',
      icon: '📢'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how and when you want to receive notifications
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">All Notifications</h3>
                <p className="text-sm text-gray-500">Enable/disable all notifications</p>
              </div>
            </div>
            <Switch className="mt-3" defaultChecked />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-medium">Security Only</h3>
                <p className="text-sm text-gray-500">Critical security alerts only</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Apply
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Volume2 className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-medium">Do Not Disturb</h3>
                <p className="text-sm text-gray-500">Pause non-critical notifications</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Enable
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Choose which events trigger email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <Label className="font-medium">{type.label}</Label>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </div>
              <Switch
                checked={settings.email[type.key as keyof typeof settings.email]}
                onCheckedChange={(checked) => updateSetting('email', type.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>Real-time notifications on your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationTypes.filter(type => type.key !== 'marketing').map((type) => (
            <div key={type.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <Label className="font-medium">{type.label}</Label>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </div>
              <Switch
                checked={settings.push[type.key as keyof typeof settings.push]}
                onCheckedChange={(checked) => updateSetting('push', type.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
          <CardDescription>Critical alerts via SMS (charges may apply)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <Label className="font-medium">Security Alerts</Label>
                <p className="text-sm text-gray-500">Critical security events and breaches</p>
              </div>
            </div>
            <Switch
              checked={settings.sms.security}
              onCheckedChange={(checked) => updateSetting('sms', 'security', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <Label className="font-medium">Urgent Alerts</Label>
                <p className="text-sm text-gray-500">System outages and critical issues</p>
              </div>
            </div>
            <Switch
              checked={settings.sms.urgent}
              onCheckedChange={(checked) => updateSetting('sms', 'urgent', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Notification Frequency
          </CardTitle>
          <CardDescription>Control how often you receive summary notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Report Frequency</Label>
              <Select
                value={settings.frequency.reports}
                onValueChange={(value: any) => updateSetting('frequency', 'reports', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Summary Frequency</Label>
              <Select
                value={settings.frequency.summaries}
                onValueChange={(value: any) => updateSetting('frequency', 'summaries', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert Thresholds
          </CardTitle>
          <CardDescription>Set thresholds for automatic alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>High-Value Transaction Alert ($)</Label>
              <Select
                value={settings.thresholds.transactionAmount}
                onValueChange={(value) => updateSetting('thresholds', 'transactionAmount', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                  <SelectItem value="10000">$10,000</SelectItem>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="50000">$50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Failure Rate Alert (%)</Label>
              <Select
                value={settings.thresholds.failureRate}
                onValueChange={(value) => updateSetting('thresholds', 'failureRate', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1%</SelectItem>
                  <SelectItem value="3">3%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Low Balance Alert ($)</Label>
              <Select
                value={settings.thresholds.lowBalance}
                onValueChange={(value) => updateSetting('thresholds', 'lowBalance', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">$100</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileNotificationSettings;
