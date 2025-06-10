
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Shield, Smartphone, Key, Clock, MapPin, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  lastActive: string;
  location: string;
  current: boolean;
}

interface LoginSession {
  id: string;
  device: string;
  location: string;
  loginTime: string;
  lastActive: string;
  current: boolean;
}

const ProfileSecurity = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const [trustedDevices, setTrustedDevices] = useState<SecurityDevice[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      lastActive: '2024-06-07 14:30',
      location: 'New York, NY',
      current: true
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: '2024-06-07 14:25',
      location: 'New York, NY',
      current: false
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastActive: '2024-06-06 09:15',
      location: 'Boston, MA',
      current: false
    }
  ]);

  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([
    {
      id: '1',
      device: 'Chrome on MacBook Pro',
      location: 'New York, NY',
      loginTime: '2024-06-07 08:00',
      lastActive: '2024-06-07 14:30',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      loginTime: '2024-06-07 07:45',
      lastActive: '2024-06-07 14:25',
      current: false
    },
    {
      id: '3',
      device: 'Chrome on Windows',
      location: 'Boston, MA',
      loginTime: '2024-06-06 09:00',
      lastActive: '2024-06-06 17:30',
      current: false
    }
  ]);

  const backupCodes = [
    '8A4B-9C2D', '7E3F-1G5H', '6I9J-2K4L', '5M8N-3O7P',
    '4Q1R-9S6T', '3U7V-2W5X', '2Y6Z-1A8B', '1C5D-9E3F'
  ];

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed",
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRemoveDevice = (deviceId: string) => {
    setTrustedDevices(devices => devices.filter(device => device.id !== deviceId));
    toast({
      title: "Device Removed",
      description: "The device has been removed from your trusted devices",
    });
  };

  const handleTerminateSession = (sessionId: string) => {
    setLoginSessions(sessions => sessions.filter(session => session.id !== sessionId));
    toast({
      title: "Session Terminated",
      description: "The login session has been terminated",
    });
  };

  const handleGenerateBackupCodes = () => {
    toast({
      title: "Backup Codes Generated",
      description: "New backup codes have been generated. Store them securely.",
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return '📱';
      case 'desktop': return '💻';
      case 'tablet': return '📋';
      default: return '🖥️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Management
          </CardTitle>
          <CardDescription>Change your account password and manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <Button onClick={handlePasswordChange} className="w-full md:w-auto">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">
                Require a verification code in addition to your password
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Backup Codes</Label>
                  <p className="text-sm text-gray-500">
                    Use these codes if you don't have access to your authenticator app
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                  >
                    {showBackupCodes ? 'Hide' : 'Show'} Codes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateBackupCodes}
                  >
                    Generate New
                  </Button>
                </div>
              </div>

              {showBackupCodes && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-gray-50 rounded-lg">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="font-mono text-sm p-2 bg-white rounded border">
                      {code}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Alerts
          </CardTitle>
          <CardDescription>Configure security notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Login Alerts</Label>
              <p className="text-sm text-gray-500">
                Receive notifications when someone logs into your account
              </p>
            </div>
            <Switch
              checked={loginAlertsEnabled}
              onCheckedChange={setLoginAlertsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trusted Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Trusted Devices
          </CardTitle>
          <CardDescription>Manage devices that don't require two-factor authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trustedDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getDeviceIcon(device.type)}</span>
                      <span className="font-medium">{device.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {device.lastActive}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {device.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    {device.current ? (
                      <Badge variant="default">Current Device</Badge>
                    ) : (
                      <Badge variant="secondary">Trusted</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!device.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDevice(device.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Login Sessions
          </CardTitle>
          <CardDescription>Monitor and manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device & Browser</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Login Time</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.device}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell>{session.loginTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {session.current ? (
                        <Badge variant="default">Current Session</Badge>
                      ) : (
                        <span>{session.lastActive}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                      >
                        Terminate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSecurity;
