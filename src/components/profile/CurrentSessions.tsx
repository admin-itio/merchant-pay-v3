
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, MapPin, Trash2, Shield, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  loginTime: string;
  lastActive: string;
  trusted: boolean;
  current: boolean;
}

const CurrentSessions = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'Desktop',
      browser: 'Chrome',
      os: 'Windows 11',
      location: 'New York, NY',
      ip: '192.168.1.100',
      loginTime: '2024-06-11 09:00',
      lastActive: '2024-06-11 14:30',
      trusted: true,
      current: true
    },
    {
      id: '2',
      device: 'Mobile',
      browser: 'Safari',
      os: 'iOS 17',
      location: 'New York, NY',
      ip: '192.168.1.101',
      loginTime: '2024-06-11 08:45',
      lastActive: '2024-06-11 14:25',
      trusted: true,
      current: false
    },
    {
      id: '3',
      device: 'Tablet',
      browser: 'Chrome',
      os: 'Android 14',
      location: 'Boston, MA',
      ip: '192.168.2.50',
      loginTime: '2024-06-10 16:30',
      lastActive: '2024-06-10 18:15',
      trusted: false,
      current: false
    }
  ]);

  const handleTerminateSession = (sessionId: string) => {
    setSessions(sessions => sessions.filter(session => session.id !== sessionId));
    toast({
      title: "Session Terminated",
      description: "The selected session has been terminated successfully.",
    });
  };

  const handleRevokeTrust = (sessionId: string) => {
    setSessions(sessions => sessions.map(session => 
      session.id === sessionId ? { ...session, trusted: false } : session
    ));
    toast({
      title: "Trust Revoked",
      description: "Device trust has been revoked. 2FA will be required on next login.",
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Current Sessions & Trusted Devices
        </CardTitle>
        <CardDescription>
          Monitor your active login sessions and manage trusted devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device & Browser</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Login Time</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Trust Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const DeviceIcon = getDeviceIcon(session.device);
              return (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DeviceIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">
                          {session.browser} on {session.os}
                        </div>
                        <div className="text-sm text-gray-500">
                          {session.device} • {session.ip}
                        </div>
                      </div>
                    </div>
                  </TableCell>
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
                    <div className="flex items-center gap-2">
                      {session.trusted ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Trusted
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not Trusted</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      {session.trusted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevokeTrust(session.id)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          Revoke Trust
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CurrentSessions;
