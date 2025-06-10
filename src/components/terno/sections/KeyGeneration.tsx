import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Download, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface KeyGenerationProps {
  data: any;
  onChange: (data: any) => void;
  isEditing: boolean;
}

const KeyGeneration = ({ data, onChange, isEditing }: KeyGenerationProps) => {
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});
  const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);

  const apiKeys = [
    {
      id: 'public_key',
      label: 'Public Key',
      description: 'Safe to use in client-side code and public repositories',
      value: isEditing ? 'pk_live_51H7gF8L5XqK2eN4V8cH9J...' : 'pk_test_51H7gF8L5XqK2eN4V8cH9J...',
      type: 'public',
      environment: data.environment || 'sandbox'
    },
    {
      id: 'secret_key',
      label: 'Private Key',
      description: 'Keep this secure! Never expose in client-side code',
      value: isEditing ? 'sk_live_51H7gF8L5XqK2eN4V8cH9J...' : 'sk_test_51H7gF8L5XqK2eN4V8cH9J...',
      type: 'secret',
      environment: data.environment || 'sandbox'
    },
    {
      id: 'webhook_secret',
      label: 'Webhook Secret',
      description: 'Used to verify webhook signatures',
      value: 'whsec_1234567890abcdef...',
      type: 'webhook',
      environment: data.environment || 'sandbox'
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const regenerateKey = async (keyId: string) => {
    setRegeneratingKey(keyId);
    // Simulate API call
    setTimeout(() => {
      setRegeneratingKey(null);
      // In a real app, you would update the key value here
    }, 2000);
  };

  const downloadKeys = () => {
    const keysData = apiKeys.reduce((acc, key) => {
      acc[key.id] = key.value;
      return acc;
    }, {} as any);

    const dataStr = JSON.stringify(keysData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terno-keys-${data.environment || 'sandbox'}.json`;
    link.click();
  };

  const getKeyEnvironmentBadge = (environment: string) => {
    return environment === 'production' 
      ? <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">Production</Badge>
      : <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">Sandbox</Badge>;
  };

  const getKeyTypeBadge = (type: string) => {
    switch (type) {
      case 'public':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Public</Badge>;
      case 'secret':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Secret</Badge>;
      case 'webhook':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">Webhook</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Environment Warning */}
      {data.environment === 'production' && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                  Production Environment
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  You are viewing production API keys. Handle these with extreme care and never expose them in client-side code or public repositories.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys & Credentials
            </CardTitle>
            <div className="flex items-center gap-2">
              {getKeyEnvironmentBadge(data.environment || 'sandbox')}
              <Button variant="outline" size="sm" onClick={downloadKeys} className="gap-2">
                <Download className="h-4 w-4" />
                Download Keys
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your API keys and credentials for the {data.environment || 'sandbox'} environment. 
            These keys are used to authenticate your API requests and webhook signatures.
          </p>
        </CardContent>
      </Card>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((key) => (
          <Card key={key.id} className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{key.label}</h3>
                  {getKeyTypeBadge(key.type)}
                  {key.type === 'secret' && (
                    <Shield className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleKeyVisibility(key.id)}
                  >
                    {showKeys[key.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(key.value)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={regeneratingKey === key.id}
                      >
                        <RefreshCw className={`h-4 w-4 ${regeneratingKey === key.id ? 'animate-spin' : ''}`} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Regenerate {key.label}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will generate a new {key.label.toLowerCase()} and invalidate the current one. 
                          Any applications using the current key will need to be updated.
                          {key.type === 'secret' && (
                            <span className="block mt-2 text-red-600 font-medium">
                              Warning: This is a secret key for production environment!
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => regenerateKey(key.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Regenerate Key
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {key.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Key Value</Label>
                  <div className="relative">
                    <Input
                      type={showKeys[key.id] ? 'text' : 'password'}
                      value={key.value}
                      readOnly
                      className="font-mono bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-xs">Environment</Label>
                    <div className="mt-1">{key.environment}</div>
                  </div>
                  <div>
                    <Label className="text-xs">Type</Label>
                    <div className="mt-1 capitalize">{key.type}</div>
                  </div>
                  <div>
                    <Label className="text-xs">Status</Label>
                    <div className="mt-1 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">JavaScript (Client-side)</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const merchantpay = MerchantPay('${apiKeys[0].value}');

const payment = await merchantpay.createPayment({
  amount: 1000,
  currency: '${data.currency || 'MYR'}',
  // ... other parameters
});`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">cURL (Server-side)</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`curl -X POST https://api.merchantpay.com/v2/payments \\
  -H "Authorization: Bearer ${apiKeys[1].value}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "${data.currency || 'MYR'}",
    "terno": "${data.ternoNumber || 'TRN001'}"
  }'`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Webhook Verification</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const crypto = require('crypto');

const signature = req.headers['merchantpay-signature'];
const payload = req.body;
const secret = '${apiKeys[2].value}';

const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload, 'utf8')
  .digest('hex');

const isValid = signature === expectedSignature;`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Guidelines */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                API Key Security Guidelines
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                <li>• Never expose secret keys in client-side code or public repositories</li>
                <li>• Use environment variables to store keys in your server applications</li>
                <li>• Rotate keys regularly, especially after team member changes</li>
                <li>• Monitor API usage for unusual patterns that might indicate compromised keys</li>
                <li>• Use different keys for different environments (sandbox vs production)</li>
                <li>• Implement proper webhook signature verification</li>
                <li>• Store keys securely using your platform's secret management tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyGeneration;
