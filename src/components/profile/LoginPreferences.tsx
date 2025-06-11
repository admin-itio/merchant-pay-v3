
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { LogIn, Clock, Home, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginPreferences = () => {
  const { toast } = useToast();
  const [loginRedirection, setLoginRedirection] = useState('dashboard');
  const [sessionTimeout, setSessionTimeout] = useState('system-default');
  const [customSessionTime, setCustomSessionTime] = useState('30');
  const [rememberLastPage, setRememberLastPage] = useState(false);

  const redirectionOptions = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'customers', label: 'Customer Management' },
    { value: 'payment-methods', label: 'Payment Methods' },
    { value: 'profile', label: 'Profile Settings' },
    { value: 'orchestration', label: 'Orchestration Rules' },
    { value: 'settlements', label: 'Settlements' },
    { value: 'payouts', label: 'Payout Management' },
    { value: 'terno', label: 'TerNo Management' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'referrals', label: 'Referral Management' },
    { value: 'support', label: 'Support Center' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'where-i-left', label: 'Where I Left (Last Visited Page)' }
  ];

  const sessionTimeouts = [
    { value: 'system-default', label: 'System Default (30 minutes)' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' },
    { value: 'custom', label: 'Custom' }
  ];

  const customTimeOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4 hours' },
    { value: '360', label: '6 hours' },
    { value: '480', label: '8 hours' },
    { value: '720', label: '12 hours' },
    { value: '1440', label: '24 hours' }
  ];

  const handleSavePreferences = () => {
    // Store preferences in localStorage
    const preferences = {
      loginRedirection,
      sessionTimeout: sessionTimeout === 'custom' ? customSessionTime : sessionTimeout,
      rememberLastPage
    };
    
    localStorage.setItem('userLoginPreferences', JSON.stringify(preferences));
    
    toast({
      title: "Login Preferences Saved",
      description: "Your login preferences have been updated successfully.",
    });
  };

  const handleSessionTimeoutChange = (value: string) => {
    setSessionTimeout(value);
    if (value !== 'custom') {
      setCustomSessionTime('30');
    }
  };

  return (
    <div className="space-y-6">
      {/* Login Redirection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Login Redirection Preferences
          </CardTitle>
          <CardDescription>
            Choose where you want to be redirected after successful login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginRedirection">Default Landing Page</Label>
            <Select value={loginRedirection} onValueChange={setLoginRedirection}>
              <SelectTrigger>
                <SelectValue placeholder="Select default page after login" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {redirectionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              This page will be your default destination after logging in
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Remember Last Visited Page</Label>
              <p className="text-sm text-gray-500">
                Override default setting and return to where you left off
              </p>
            </div>
            <Switch
              checked={rememberLastPage}
              onCheckedChange={setRememberLastPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Session Management Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Session Management
          </CardTitle>
          <CardDescription>
            Configure automatic logout settings due to inactivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout</Label>
            <Select value={sessionTimeout} onValueChange={handleSessionTimeoutChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select session timeout" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {sessionTimeouts.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              You will be automatically logged out after this period of inactivity
            </p>
          </div>

          {sessionTimeout === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="customSessionTime">Custom Session Time</Label>
              <Select value={customSessionTime} onValueChange={setCustomSessionTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select custom time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {customTimeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Security Note</h4>
                <p className="text-sm text-blue-700">
                  Shorter session timeouts provide better security but may require more frequent logins. 
                  The system default of 30 minutes follows Spring Boot security best practices.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSavePreferences} className="w-full">
        Save Login Preferences
      </Button>
    </div>
  );
};

export default LoginPreferences;
