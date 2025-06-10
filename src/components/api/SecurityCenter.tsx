
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, CheckCircle, Lock, Eye, Globe, Ban } from 'lucide-react';

const SecurityCenter = () => {
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(true);
  const [rateLimitingEnabled, setRateLimitingEnabled] = useState(true);
  const [webhookSignatureEnabled, setWebhookSignatureEnabled] = useState(true);

  // Mock security events
  const securityEvents = [
    {
      id: '1',
      type: 'suspicious_activity',
      severity: 'high',
      description: 'Multiple failed authentication attempts from IP 192.168.1.100',
      timestamp: '2024-06-07 14:30:25',
      status: 'blocked',
      action: 'IP temporarily blocked'
    },
    {
      id: '2',
      type: 'rate_limit_exceeded',
      severity: 'medium',
      description: 'Rate limit exceeded for API key pk_test_123...',
      timestamp: '2024-06-07 13:45:15',
      status: 'throttled',
      action: 'Requests throttled for 1 hour'
    },
    {
      id: '3',
      type: 'unauthorized_access',
      severity: 'high',
      description: 'Invalid API key used from unauthorized domain',
      timestamp: '2024-06-07 12:20:45',
      status: 'denied',
      action: 'Request denied, alert sent'
    }
  ];

  // Mock IP whitelist
  const [ipWhitelist, setIpWhitelist] = useState([
    { id: '1', ip: '192.168.1.0/24', description: 'Office Network', active: true },
    { id: '2', ip: '10.0.0.0/8', description: 'Private Network', active: true },
    { id: '3', ip: '203.0.113.42', description: 'Production Server', active: true }
  ]);

  // Mock blocked IPs
  const blockedIps = [
    { id: '1', ip: '192.168.1.100', reason: 'Multiple failed attempts', blockedAt: '2024-06-07 14:30:25', expiresAt: '2024-06-08 14:30:25' },
    { id: '2', ip: '203.0.113.99', reason: 'Suspicious activity', blockedAt: '2024-06-07 10:15:30', expiresAt: 'Permanent' }
  ];

  // Security settings
  const securitySettings = {
    maxFailedAttempts: 5,
    lockoutDuration: 60, // minutes
    sessionTimeout: 24, // hours
    requireHttps: true,
    enableCors: true,
    webhookRetries: 3
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked': return <Ban className="h-4 w-4 text-red-500" />;
      case 'denied': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'throttled': return <Eye className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Center</h2>
        <p className="text-gray-600">Manage security settings, monitor threats, and configure access controls</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Security Score
              </CardTitle>
              <CardDescription>Overall security posture of your API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">85</div>
                  <div className="text-sm text-gray-600">Security Score</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">Good</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rate Limiting</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IP Whitelisting</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Webhook Security</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CORS Policy</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="sm">View Recommendations</Button>
                  <Button variant="outline" className="w-full" size="sm">Run Security Scan</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>Latest security incidents and actions taken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity} severity
                        </Badge>
                        <span className="text-sm text-gray-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      <p className="text-xs text-gray-600">Action taken: {event.action}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* IP Whitelist */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>IP Whitelist</CardTitle>
                    <CardDescription>Restrict API access to specific IP addresses</CardDescription>
                  </div>
                  <Switch
                    checked={ipWhitelistEnabled}
                    onCheckedChange={setIpWhitelistEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {ipWhitelist.map((ip) => (
                    <div key={ip.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-mono text-sm">{ip.ip}</div>
                        <div className="text-xs text-gray-500">{ip.description}</div>
                      </div>
                      <Switch checked={ip.active} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="192.168.1.0/24" className="flex-1" />
                  <Button size="sm">Add IP</Button>
                </div>
              </CardContent>
            </Card>

            {/* Blocked IPs */}
            <Card>
              <CardHeader>
                <CardTitle>Blocked IPs</CardTitle>
                <CardDescription>Currently blocked IP addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockedIps.map((blocked) => (
                    <div key={blocked.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm">{blocked.ip}</span>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Unblock
                        </Button>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Reason: {blocked.reason}</div>
                        <div>Blocked: {blocked.blockedAt}</div>
                        <div>Expires: {blocked.expiresAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Domain Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle>Domain Restrictions</CardTitle>
              <CardDescription>Configure CORS and domain-based access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Allowed Origins</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input value="https://yourdomain.com" readOnly />
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input value="https://app.yourdomain.com" readOnly />
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="https://newdomain.com" />
                      <Button size="sm">Add</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable CORS</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Require HTTPS</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Include Credentials</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
              <CardDescription>Real-time security monitoring and threat detection</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.type.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                      <TableCell className="text-sm">{event.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(event.status)}
                          <span className="text-sm capitalize">{event.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Security</CardTitle>
                <CardDescription>Configure general security parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Max Failed Login Attempts</Label>
                  <Input type="number" defaultValue={securitySettings.maxFailedAttempts} />
                </div>
                <div className="space-y-2">
                  <Label>Lockout Duration (minutes)</Label>
                  <Input type="number" defaultValue={securitySettings.lockoutDuration} />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (hours)</Label>
                  <Input type="number" defaultValue={securitySettings.sessionTimeout} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require HTTPS</Label>
                  <Switch defaultChecked={securitySettings.requireHttps} />
                </div>
              </CardContent>
            </Card>

            {/* API Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>API Security</CardTitle>
                <CardDescription>Configure API-specific security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-gray-500">Limit requests per minute per API key</p>
                  </div>
                  <Switch 
                    checked={rateLimitingEnabled}
                    onCheckedChange={setRateLimitingEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Webhook Signatures</Label>
                    <p className="text-sm text-gray-500">Verify webhook authenticity</p>
                  </div>
                  <Switch 
                    checked={webhookSignatureEnabled}
                    onCheckedChange={setWebhookSignatureEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Webhook Max Retries</Label>
                  <Input type="number" defaultValue={securitySettings.webhookRetries} />
                </div>
                <Button className="w-full">Save Security Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCenter;
