
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Mail, 
  AlertTriangle, 
  CreditCard, 
  TrendingUp,
  Users,
  Shield,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileNotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Email Notifications
    emailTransactions: true,
    emailChargebacks: true,
    emailSettlements: true,
    emailMarketing: false,
    emailSecurity: true,
    emailReports: true,
    
    // Push Notifications
    pushTransactions: true,
    pushChargebacks: true,
    pushSecurity: true,
    pushMarketing: false,
    
    // Frequency Settings
    transactionThreshold: '100',
    reportFrequency: 'weekly',
    summaryFrequency: 'daily'
  });

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage how and when you receive notifications about your account activity.
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about successful payments and failures
              </p>
            </div>
            <Switch
              checked={settings.emailTransactions}
              onCheckedChange={(checked) => updateSetting('emailTransactions', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Chargeback Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Immediate alerts for chargebacks and disputes
              </p>
            </div>
            <Switch
              checked={settings.emailChargebacks}
              onCheckedChange={(checked) => updateSetting('emailChargebacks', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Settlement Reports</Label>
              <p className="text-sm text-muted-foreground">
                Daily and weekly settlement summaries
              </p>
            </div>
            <Switch
              checked={settings.emailSettlements}
              onCheckedChange={(checked) => updateSetting('emailSettlements', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Login attempts, API key changes, and security updates
              </p>
            </div>
            <Switch
              checked={settings.emailSecurity}
              onCheckedChange={(checked) => updateSetting('emailSecurity', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Comprehensive business analytics and insights
              </p>
            </div>
            <Switch
              checked={settings.emailReports}
              onCheckedChange={(checked) => updateSetting('emailReports', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing & Updates</Label>
              <p className="text-sm text-muted-foreground">
                Product updates, tips, and promotional content
              </p>
            </div>
            <Switch
              checked={settings.emailMarketing}
              onCheckedChange={(checked) => updateSetting('emailMarketing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Browser Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Real-time transaction notifications in browser
              </p>
            </div>
            <Switch
              checked={settings.pushTransactions}
              onCheckedChange={(checked) => updateSetting('pushTransactions', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Critical Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Chargebacks, failed payments, and urgent issues
              </p>
            </div>
            <Switch
              checked={settings.pushChargebacks}
              onCheckedChange={(checked) => updateSetting('pushChargebacks', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Suspicious activity and security events
              </p>
            </div>
            <Switch
              checked={settings.pushSecurity}
              onCheckedChange={(checked) => updateSetting('pushSecurity', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Transaction Alert Threshold</Label>
              <Select value={settings.transactionThreshold} onValueChange={(value) => updateSetting('transactionThreshold', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All transactions</SelectItem>
                  <SelectItem value="100">Above $100</SelectItem>
                  <SelectItem value="500">Above $500</SelectItem>
                  <SelectItem value="1000">Above $1,000</SelectItem>
                  <SelectItem value="5000">Above $5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Report Frequency</Label>
              <Select value={settings.reportFrequency} onValueChange={(value) => updateSetting('reportFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileNotificationSettings;
