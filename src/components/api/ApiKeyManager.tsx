
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Eye, EyeOff, Plus, Trash2, Settings, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
  status: 'active' | 'inactive';
  environment: 'production' | 'development' | 'staging';
  rateLimit: number;
  usageCount: number;
}

const ApiKeyManager = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnvironment, setNewKeyEnvironment] = useState<'production' | 'development' | 'staging'>('development');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['read']);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_51234567890abcdef1234567890abcdef12345678',
      created: '2024-01-15',
      lastUsed: '2024-06-07',
      permissions: ['read', 'write', 'admin'],
      status: 'active',
      environment: 'production',
      rateLimit: 1000,
      usageCount: 45670
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'pk_test_51234567890abcdef1234567890abcdef12345678',
      created: '2024-02-01',
      lastUsed: '2024-06-07',
      permissions: ['read', 'write'],
      status: 'active',
      environment: 'development',
      rateLimit: 100,
      usageCount: 1234
    },
    {
      id: '3',
      name: 'Staging API Key',
      key: 'pk_stage_51234567890abcdef1234567890abcdef12345678',
      created: '2024-03-10',
      lastUsed: '2024-06-05',
      permissions: ['read'],
      status: 'inactive',
      environment: 'staging',
      rateLimit: 500,
      usageCount: 567
    }
  ]);

  const availablePermissions = [
    { id: 'read', label: 'Read', description: 'View transactions and data' },
    { id: 'write', label: 'Write', description: 'Create and update transactions' },
    { id: 'delete', label: 'Delete', description: 'Delete transactions and data' },
    { id: 'admin', label: 'Admin', description: 'Full administrative access' },
    { id: 'webhook', label: 'Webhook', description: 'Manage webhook endpoints' },
    { id: 'reports', label: 'Reports', description: 'Generate and access reports' }
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

    if (newKeyPermissions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one permission",
        variant: "destructive",
      });
      return;
    }

    const prefix = newKeyEnvironment === 'production' ? 'pk_live_' : 
                  newKeyEnvironment === 'staging' ? 'pk_stage_' : 'pk_test_';
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `${prefix}${Math.random().toString(36).substr(2, 48)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: newKeyPermissions,
      status: 'active',
      environment: newKeyEnvironment,
      rateLimit: newKeyEnvironment === 'production' ? 1000 : newKeyEnvironment === 'staging' ? 500 : 100,
      usageCount: 0
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyPermissions(['read']);
    setNewKeyEnvironment('development');
    
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

  const toggleKeyStatus = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const togglePermission = (permission: string) => {
    setNewKeyPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production': return 'bg-red-100 text-red-800 border-red-200';
      case 'staging': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'development': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUsagePercentage = (apiKey: ApiKey) => {
    return Math.round((apiKey.usageCount / apiKey.rateLimit) * 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>Generate a new API key for your applications with specific permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">API Key Name</Label>
              <Input
                id="keyName"
                placeholder="Enter API key name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select value={newKeyEnvironment} onValueChange={(value: any) => setNewKeyEnvironment(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Switch
                    id={permission.id}
                    checked={newKeyPermissions.includes(permission.id)}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor={permission.id} className="text-sm font-medium">
                      {permission.label}
                    </Label>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={createNewApiKey} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your existing API keys and monitor their usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
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
                        {showApiKey[apiKey.id] ? apiKey.key : `${apiKey.key.substring(0, 20)}...`}
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
                  <TableCell>
                    <Badge className={getEnvironmentColor(apiKey.environment)}>
                      {apiKey.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {apiKey.usageCount.toLocaleString()} / {apiKey.rateLimit.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            getUsagePercentage(apiKey) > 80 ? 'bg-red-500' : 
                            getUsagePercentage(apiKey) > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(getUsagePercentage(apiKey), 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        {getUsagePercentage(apiKey)}% used
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={apiKey.status === 'active'}
                        onCheckedChange={() => toggleKeyStatus(apiKey.id)}
                      />
                      <Badge variant={apiKey.status === 'active' ? 'default' : 'destructive'}>
                        {apiKey.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApiKey(apiKey.id)}
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
    </div>
  );
};

export default ApiKeyManager;
