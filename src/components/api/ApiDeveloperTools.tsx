
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, Eye, EyeOff, Plus, Trash2, Download, Key, Webhook, Code, BookOpen, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiDeveloperTools = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [newKeyName, setNewKeyName] = useState('');

  // Mock data for API keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_51234567890abcdef...',
      created: '2024-01-15',
      lastUsed: '2024-06-03',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'pk_test_51234567890abcdef...',
      created: '2024-02-01',
      lastUsed: '2024-06-04',
      permissions: ['read'],
      status: 'active'
    }
  ]);

  // Mock data for webhooks
  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      url: 'https://api.example.com/webhooks/payment',
      events: ['payment.success', 'payment.failed'],
      status: 'active',
      lastDelivery: '2024-06-04 14:30:25',
      deliveryStatus: 'success'
    },
    {
      id: '2',
      url: 'https://api.example.com/webhooks/refund',
      events: ['refund.created'],
      status: 'active',
      lastDelivery: '2024-06-04 12:15:10',
      deliveryStatus: 'failed'
    }
  ]);

  // Mock webhook events
  const webhookEvents = [
    { id: '1', event: 'payment.success', timestamp: '2024-06-04 14:30:25', status: 'delivered', attempts: 1 },
    { id: '2', event: 'payment.failed', timestamp: '2024-06-04 14:25:10', status: 'delivered', attempts: 1 },
    { id: '3', event: 'refund.created', timestamp: '2024-06-04 12:15:10', status: 'failed', attempts: 3 }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard",
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const createNewApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key",
        variant: "destructive",
      });
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `pk_${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: ['read'],
      status: 'active'
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    toast({
      title: "API Key Created",
      description: `New API key "${newKeyName}" has been created successfully`,
    });
  };

  const deleteApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "API key has been deleted successfully",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API & Developer Tools</h1>
        <p className="text-gray-600 mt-2">Manage your API keys, webhooks, and access developer resources</p>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="sdks" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            SDKs & Tools
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>Generate a new API key for your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter API key name"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={createNewApiKey} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Key
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your existing API keys</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">
                            {showApiKey[apiKey.id] ? apiKey.key : `${apiKey.key.substring(0, 12)}...`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showApiKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {apiKey.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={apiKey.status === 'active' ? 'default' : 'destructive'}>
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteApiKey(apiKey.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Endpoints</CardTitle>
                <CardDescription>Configure webhook URLs for real-time notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{webhook.url}</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(webhook.deliveryStatus)}
                        <Badge variant={webhook.status === 'active' ? 'default' : 'destructive'}>
                          {webhook.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Events: </span>
                      <div className="flex gap-1 mt-1">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last delivery: {webhook.lastDelivery} ({webhook.deliveryStatus})
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook Endpoint
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Events</CardTitle>
                <CardDescription>Monitor webhook delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {webhookEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium text-sm">{event.event}</div>
                        <div className="text-xs text-gray-500">{event.timestamp}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(event.status)}
                        <span className="text-sm">{event.attempts} attempt{event.attempts > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'JavaScript SDK', version: 'v2.1.0', description: 'For web applications' },
              { name: 'Python SDK', version: 'v1.8.3', description: 'For server-side applications' },
              { name: 'PHP SDK', version: 'v1.5.2', description: 'For PHP applications' },
              { name: 'Node.js SDK', version: 'v3.2.1', description: 'For Node.js applications' },
              { name: 'Ruby SDK', version: 'v2.0.4', description: 'For Ruby applications' },
              { name: 'Go SDK', version: 'v1.3.0', description: 'For Go applications' }
            ].map((sdk) => (
              <Card key={sdk.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{sdk.name}</CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="outline">{sdk.version}</Badge>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download SDK
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Quick start examples for popular frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">JavaScript</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{`import PaymentGateway from 'payment-sdk';

const gateway = new PaymentGateway({
  apiKey: 'your-api-key'
});

const payment = await gateway.createPayment({
  amount: 1000,
  currency: 'USD'
});`}</code>
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Python</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{`import payment_gateway

gateway = payment_gateway.Client(
    api_key='your-api-key'
)

payment = gateway.create_payment(
    amount=1000,
    currency='USD'
)`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'API Reference', description: 'Complete API documentation with examples', icon: BookOpen },
              { title: 'Quick Start Guide', description: 'Get up and running in minutes', icon: Key },
              { title: 'Webhook Guide', description: 'Learn how to handle webhook events', icon: Webhook },
              { title: 'Error Codes', description: 'Complete list of error codes and solutions', icon: AlertCircle },
              { title: 'Testing Guide', description: 'Test your integration with our sandbox', icon: Code },
              { title: 'Security Best Practices', description: 'Keep your integration secure', icon: CheckCircle }
            ].map((doc) => {
              const Icon = doc.icon;
              return (
                <Card key={doc.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                    </div>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Read Documentation
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Developer Community</CardTitle>
              <CardDescription>Connect with other developers and get support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <div className="font-medium">Developer Forum</div>
                  <div className="text-sm text-gray-600">Ask questions and share knowledge</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <div className="font-medium">Discord Community</div>
                  <div className="text-sm text-gray-600">Real-time chat with developers</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <div className="font-medium">GitHub Repository</div>
                  <div className="text-sm text-gray-600">Contribute to our open source SDKs</div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDeveloperTools;
