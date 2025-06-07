
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Info, Globe, Shield, Clock } from 'lucide-react';

interface TechnicalConfigurationProps {
  data: any;
  onChange: (data: any) => void;
}

const TechnicalConfiguration = ({ data, onChange }: TechnicalConfigurationProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiVersion">API Version</Label>
                <Select value={data.apiVersion || 'v2'} onValueChange={(value) => handleInputChange('apiVersion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select API version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1">Version 1.0 (Legacy)</SelectItem>
                    <SelectItem value="v2">Version 2.0 (Recommended)</SelectItem>
                    <SelectItem value="v3">Version 3.0 (Beta)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  placeholder="30"
                  value={data.timeout || '30'}
                  onChange={(e) => handleInputChange('timeout', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxRetries">Max Retry Attempts</Label>
                <Input
                  id="maxRetries"
                  type="number"
                  placeholder="3"
                  value={data.maxRetries || '3'}
                  onChange={(e) => handleInputChange('maxRetries', e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Sandbox Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use test endpoints for development
                  </p>
                </div>
                <Switch
                  checked={data.sandboxMode || false}
                  onCheckedChange={(checked) => handleInputChange('sandboxMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="encryptionLevel">Encryption Level</Label>
                <Select value={data.encryptionLevel || 'aes256'} onValueChange={(value) => handleInputChange('encryptionLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select encryption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes128">AES-128</SelectItem>
                    <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                    <SelectItem value="rsa2048">RSA-2048</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require IP Whitelisting</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Restrict API access to specific IPs
                  </p>
                </div>
                <Switch
                  checked={data.ipWhitelisting || false}
                  onCheckedChange={(checked) => handleInputChange('ipWhitelisting', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Rate Limiting</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Limit requests per minute
                  </p>
                </div>
                <Switch
                  checked={data.rateLimiting || true}
                  onCheckedChange={(checked) => handleInputChange('rateLimiting', checked)}
                />
              </div>

              {data.rateLimiting && (
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Requests per Minute</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    placeholder="1000"
                    value={data.rateLimit || '1000'}
                    onChange={(e) => handleInputChange('rateLimit', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Transaction Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Transaction Amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="minAmount"
                    type="number"
                    step="0.01"
                    placeholder="1.00"
                    value={data.minAmount || '1.00'}
                    onChange={(e) => handleInputChange('minAmount', e.target.value)}
                  />
                  <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <span className="text-sm">{data.currency || 'USD'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAmount">Maximum Transaction Amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="maxAmount"
                    type="number"
                    step="0.01"
                    placeholder="10000.00"
                    value={data.maxAmount || '10000.00'}
                    onChange={(e) => handleInputChange('maxAmount', e.target.value)}
                  />
                  <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <span className="text-sm">{data.currency || 'USD'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  placeholder="15"
                  value={data.sessionTimeout || '15'}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Settlement</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically settle transactions
                  </p>
                </div>
                <Switch
                  checked={data.autoSettlement || true}
                  onCheckedChange={(checked) => handleInputChange('autoSettlement', checked)}
                />
              </div>

              {data.autoSettlement && (
                <div className="space-y-2">
                  <Label htmlFor="settlementDelay">Settlement Delay (hours)</Label>
                  <Select value={data.settlementDelay || '24'} onValueChange={(value) => handleInputChange('settlementDelay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="72">72 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Credit Card</Badge>
                <Badge variant="outline">Debit Card</Badge>
                <Badge variant="outline">E-Wallet</Badge>
                <Badge variant="outline">Bank Transfer</Badge>
                <Badge variant="outline">QR Payment</Badge>
                <Badge variant="outline">Cryptocurrency</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Payment methods are configured based on your country and business type settings.
                Contact support to enable additional payment methods.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Notes */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Technical Configuration Notes
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• API version changes may require code updates in your integration</li>
                <li>• Higher timeout values may improve success rates for slow connections</li>
                <li>• Rate limiting helps protect against abuse and ensures fair usage</li>
                <li>• Auto settlement can be disabled for manual review workflows</li>
                <li>• Contact technical support for advanced configuration options</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalConfiguration;
