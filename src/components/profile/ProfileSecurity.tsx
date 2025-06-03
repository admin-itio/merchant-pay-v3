
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Clock, Globe, Trash2 } from 'lucide-react';

const ProfileSecurity = () => {
  const [antiPhishingCode, setAntiPhishingCode] = useState('');
  const [antiPhishingEnabled, setAntiPhishingEnabled] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const deviceHistory = [
    { device: 'MacBook Pro - Chrome', location: 'New York, US', ip: '192.168.1.1', lastActive: '2 hours ago', current: true },
    { device: 'iPhone 14 - Safari', location: 'New York, US', ip: '192.168.1.2', lastActive: '1 day ago', current: false },
    { device: 'Windows PC - Edge', location: 'London, UK', ip: '81.2.69.142', lastActive: '3 days ago', current: false }
  ];

  const whitelistedIPs = [
    { ip: '192.168.1.1', label: 'Office Network', added: '2024-01-15' },
    { ip: '203.0.113.0/24', label: 'Home Network Range', added: '2024-01-10' }
  ];

  return (
    <div className="space-y-6">
      {/* Anti-Phishing Code */}
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Anti-Phishing Protection</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Set a 6-digit code that appears in all our emails to verify authenticity</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-gray-900">Enable Anti-Phishing Code</p>
                <p className="text-sm text-gray-600">Show your personal code in system emails</p>
              </div>
            </div>
            <Switch 
              checked={antiPhishingEnabled} 
              onCheckedChange={setAntiPhishingEnabled}
            />
          </div>
          
          {antiPhishingEnabled && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Anti-Phishing Code</label>
                <InputOTP maxLength={6} value={antiPhishingCode} onChange={setAntiPhishingCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-gray-600 mt-2">This code will appear in all emails from MyPay to verify authenticity</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Save Code</Button>
                <Button variant="outline" size="sm">Generate Random</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Two-Factor Authentication</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${twoFAEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Shield className={`h-4 w-4 ${twoFAEnabled ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">2FA Status</p>
                <p className="text-sm text-gray-600">
                  {twoFAEnabled ? 'Two-factor authentication is active' : 'Two-factor authentication is disabled'}
                </p>
              </div>
            </div>
            <Badge variant={twoFAEnabled ? 'default' : 'secondary'}>
              {twoFAEnabled ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {!twoFAEnabled ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Setup Two-Factor Authentication</h4>
                <p className="text-sm text-blue-700 mb-4">Choose your preferred 2FA method:</p>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Authenticator App (Recommended)
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    📱 SMS Verification
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    📧 Email OTP
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">Reset 2FA</Button>
                <Button variant="outline">Backup Codes</Button>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setTwoFAEnabled(false)}
              >
                Disable 2FA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card className="border-green-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Password & Login Settings</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Manage your password and login preferences</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <Input 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
            <Button>Update Password</Button>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Login Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Require OTP for new devices</p>
                  <p className="text-sm text-gray-600">Send OTP when logging in from unrecognized devices</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email login notifications</p>
                  <p className="text-sm text-gray-600">Get notified of all login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device & Login History */}
      <Card className="border-orange-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Globe className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Device & Login History</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Monitor devices and locations accessing your account</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {deviceHistory.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${device.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Globe className={`h-4 w-4 ${device.current ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{device.device}</p>
                    <p className="text-sm text-gray-600">{device.location} • {device.ip}</p>
                    <p className="text-xs text-gray-500">Last active: {device.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.current && <Badge variant="default">Current</Badge>}
                  {!device.current && (
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IP Whitelisting */}
      <Card className="border-indigo-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">IP Address Whitelisting</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Restrict account access to specific IP addresses</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Enable IP Whitelisting</p>
              <p className="text-sm text-gray-600">Only allow login from specified IP addresses</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Enter IP address (e.g., 192.168.1.1)" className="flex-1" />
              <Input placeholder="Label (optional)" className="w-40" />
              <Button>Add IP</Button>
            </div>
            
            {whitelistedIPs.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.ip}</p>
                  <p className="text-sm text-gray-600">{item.label} • Added: {item.added}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Closure */}
      <Card className="border-red-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-red-900">Danger Zone</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Irreversible account actions</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-2">Request Account Closure</h4>
            <p className="text-sm text-red-700 mb-4">
              This will initiate the account closure process. All data will be permanently deleted after a 30-day grace period.
            </p>
            <Button variant="destructive">Request Account Closure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSecurity;
