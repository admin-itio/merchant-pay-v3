
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Settings, RefreshCw, CheckCircle, XCircle, AlertCircle, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  secret: string;
  created: string;
  lastDelivery: string;
  deliveryStatus: 'success' | 'failed' | 'pending';
  totalDeliveries: number;
  successRate: number;
}

interface WebhookEvent {
  id: string;
  event: string;
  timestamp: string;
  status: 'delivered' | 'failed' | 'pending';
  attempts: number;
  webhookId: string;
  responseCode?: number;
  errorMessage?: string;
}

const WebhookManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('endpoints');
  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Payment Webhook',
      url: 'https://api.example.com/webhooks/payment',
      events: ['payment.success', 'payment.failed', 'payment.pending'],
      status: 'active',
      secret: 'whsec_1234567890abcdef',
      created: '2024-01-15',
      lastDelivery: '2024-06-07 14:30:25',
      deliveryStatus: 'success',
      totalDeliveries: 15420,
      successRate: 99.2
    },
    {
      id: '2',
      name: 'Refund Webhook',
      url: 'https://api.example.com/webhooks/refund',
      events: ['refund.created', 'refund.processed'],
      status: 'active',
      secret: 'whsec_abcdef1234567890',
      created: '2024-02-01',
      lastDelivery: '2024-06-07 12:15:10',
      deliveryStatus: 'failed',
      totalDeliveries: 3456,
      successRate: 98.5
    },
    {
      id: '3',
      name: 'Dispute Webhook',
      url: 'https://api.example.com/webhooks/dispute',
      events: ['dispute.created', 'dispute.resolved'],
      status: 'inactive',
      secret: 'whsec_fedcba0987654321',
      created: '2024-03-10',
      lastDelivery: '2024-06-05 09:20:15',
      deliveryStatus: 'success',
      totalDeliveries: 234,
      successRate: 96.8
    }
  ]);

  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([
    { id: '1', event: 'payment.success', timestamp: '2024-06-07 14:30:25', status: 'delivered', attempts: 1, webhookId: '1', responseCode: 200 },
    { id: '2', event: 'payment.failed', timestamp: '2024-06-07 14:25:10', status: 'delivered', attempts: 1, webhookId: '1', responseCode: 200 },
    { id: '3', event: 'refund.created', timestamp: '2024-06-07 12:15:10', status: 'failed', attempts: 3, webhookId: '2', responseCode: 500, errorMessage: 'Internal Server Error' },
    { id: '4', event: 'payment.pending', timestamp: '2024-06-07 11:45:30', status: 'pending', attempts: 1, webhookId: '1' },
    { id: '5', event: 'dispute.created', timestamp: '2024-06-05 09:20:15', status: 'delivered', attempts: 1, webhookId: '3', responseCode: 200 }
  ]);

  const availableEvents = [
    { id: 'payment.success', label: 'Payment Success', description: 'Triggered when a payment is successfully processed' },
    { id: 'payment.failed', label: 'Payment Failed', description: 'Triggered when a payment fails' },
    { id: 'payment.pending', label: 'Payment Pending', description: 'Triggered when a payment is pending' },
    { id: 'refund.created', label: 'Refund Created', description: 'Triggered when a refund is created' },
    { id: 'refund.processed', label: 'Refund Processed', description: 'Triggered when a refund is processed' },
    { id: 'dispute.created', label: 'Dispute Created', description: 'Triggered when a dispute is created' },
    { id: 'dispute.resolved', label: 'Dispute Resolved', description: 'Triggered when a dispute is resolved' },
    { id: 'account.updated', label: 'Account Updated', description: 'Triggered when account information is updated' }
  ];

  const createWebhook = () => {
    if (!newWebhookName.trim() || !newWebhookUrl.trim() || selectedEvents.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one event",
        variant: "destructive",
      });
      return;
    }

    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: newWebhookName,
      url: newWebhookUrl,
      events: selectedEvents,
      status: 'active',
      secret: `whsec_${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split('T')[0],
      lastDelivery: 'Never',
      deliveryStatus: 'pending',
      totalDeliveries: 0,
      successRate: 0
    };

    setWebhooks([...webhooks, newWebhook]);
    setNewWebhookName('');
    setNewWebhookUrl('');
    setSelectedEvents([]);

    toast({
      title: "Webhook Created",
      description: `Webhook "${newWebhookName}" has been created successfully`,
    });
  };

  const deleteWebhook = (webhookId: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
    toast({
      title: "Webhook Deleted",
      description: "Webhook has been deleted successfully",
    });
  };

  const toggleWebhookStatus = (webhookId: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === webhookId 
        ? { ...webhook, status: webhook.status === 'active' ? 'inactive' : 'active' }
        : webhook
    ));
  };

  const toggleEvent = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const retryWebhookEvent = (eventId: string) => {
    setWebhookEvents(webhookEvents.map(event => 
      event.id === eventId 
        ? { ...event, status: 'pending', attempts: event.attempts + 1 }
        : event
    ));

    toast({
      title: "Retry Initiated",
      description: "Webhook event retry has been initiated",
    });
  };

  const testWebhook = (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;

    toast({
      title: "Test Webhook Sent",
      description: `Test payload sent to ${webhook.name}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="events">Event Log</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Webhook</CardTitle>
              <CardDescription>Set up a new webhook endpoint to receive real-time notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookName">Webhook Name</Label>
                  <Input
                    id="webhookName"
                    placeholder="Enter webhook name"
                    value={newWebhookName}
                    onChange={(e) => setNewWebhookName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://your-app.com/webhook"
                    value={newWebhookUrl}
                    onChange={(e) => setNewWebhookUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Events to Subscribe</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Switch
                        id={event.id}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => toggleEvent(event.id)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={event.id} className="text-sm font-medium cursor-pointer">
                          {event.label}
                        </Label>
                        <p className="text-xs text-gray-500">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={createWebhook} className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Webhook
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
              <CardDescription>Manage your webhook endpoints and monitor their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Last Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="font-mono text-sm max-w-xs truncate">{webhook.url}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.slice(0, 2).map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                          {webhook.events.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{webhook.events.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {webhook.totalDeliveries.toLocaleString()} deliveries
                          </div>
                          <div className="text-xs text-gray-500">
                            {webhook.successRate}% success rate
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(webhook.deliveryStatus)}
                          <span className="text-sm">{webhook.lastDelivery}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={webhook.status === 'active'}
                            onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                          />
                          <Badge variant={webhook.status === 'active' ? 'default' : 'destructive'}>
                            {webhook.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => testWebhook(webhook.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteWebhook(webhook.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Event Log</CardTitle>
              <CardDescription>Monitor webhook delivery status and troubleshoot failed events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Webhook</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhookEvents.map((event) => {
                    const webhook = webhooks.find(w => w.id === event.webhookId);
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.event}</TableCell>
                        <TableCell className="text-sm">{event.timestamp}</TableCell>
                        <TableCell>{webhook?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(event.status)}
                            <span className="text-sm capitalize">{event.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{event.attempts}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {event.responseCode && (
                              <Badge variant={event.responseCode === 200 ? 'default' : 'destructive'}>
                                {event.responseCode}
                              </Badge>
                            )}
                            {event.errorMessage && (
                              <p className="text-xs text-red-600 max-w-xs truncate">
                                {event.errorMessage}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {event.status === 'failed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => retryWebhookEvent(event.id)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Testing</CardTitle>
              <CardDescription>Test your webhook endpoints with sample payloads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Send Test Event</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Select Webhook</Label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option value="">Choose a webhook...</option>
                        {webhooks.map((webhook) => (
                          <option key={webhook.id} value={webhook.id}>
                            {webhook.name} - {webhook.url}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Event Type</Label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option value="">Choose an event...</option>
                        {availableEvents.map((event) => (
                          <option key={event.id} value={event.id}>
                            {event.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Event
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Sample Payload</h4>
                  <Textarea
                    rows={12}
                    readOnly
                    value={JSON.stringify({
                      "event": "payment.success",
                      "timestamp": "2024-06-07T14:30:25Z",
                      "data": {
                        "id": "txn_1234567890",
                        "amount": 1000,
                        "currency": "USD",
                        "status": "completed",
                        "merchant_id": "merchant_123",
                        "created_at": "2024-06-07T14:30:20Z"
                      },
                      "signature": "t=1623456789,v1=abc123def456..."
                    }, null, 2)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebhookManager;
