
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Shield, Eye, ExternalLink, Info, CheckCircle, AlertCircle } from 'lucide-react';

interface URLsAndPoliciesProps {
  data: any;
  onChange: (data: any) => void;
}

const URLsAndPolicies = ({ data, onChange }: URLsAndPoliciesProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const testUrl = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const validateUrl = (url: string) => {
    if (!url) return null;
    try {
      new URL(url);
      return url.startsWith('https://');
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Webhook Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="webhookUrl"
                  placeholder="https://your-domain.com/webhook"
                  value={data.webhookUrl || ''}
                  onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                />
                {data.webhookUrl && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {validateUrl(data.webhookUrl) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testUrl(data.webhookUrl)}
                disabled={!data.webhookUrl}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Endpoint to receive real-time payment notifications
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookSecret">Webhook Secret</Label>
            <Input
              id="webhookSecret"
              type="password"
              placeholder="webhook_secret_key"
              value={data.webhookSecret || ''}
              onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secret key for webhook signature verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Webhook Retries</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Retry failed webhook deliveries
                </p>
              </div>
              <Switch
                checked={data.webhookRetries || true}
                onCheckedChange={(checked) => handleInputChange('webhookRetries', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Webhook Signature Verification</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify webhook authenticity
                </p>
              </div>
              <Switch
                checked={data.webhookVerification || true}
                onCheckedChange={(checked) => handleInputChange('webhookVerification', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Webhook Events</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'payment.success',
                'payment.failed',
                'payment.pending',
                'refund.processed',
                'dispute.created',
                'settlement.completed'
              ].map((event) => (
                <div key={event} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={event}
                    checked={data.webhookEvents?.includes(event) || false}
                    onChange={(e) => {
                      const currentEvents = data.webhookEvents || [];
                      const updatedEvents = e.target.checked
                        ? [...currentEvents, event]
                        : currentEvents.filter((ev: string) => ev !== event);
                      handleInputChange('webhookEvents', updatedEvents);
                    }}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={event} className="text-sm font-normal">
                    {event}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Redirect URLs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Redirect URLs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="successUrl">Success URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="successUrl"
                  placeholder="https://your-domain.com/success"
                  value={data.successUrl || ''}
                  onChange={(e) => handleInputChange('successUrl', e.target.value)}
                />
                {data.successUrl && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {validateUrl(data.successUrl) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testUrl(data.successUrl)}
                disabled={!data.successUrl}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirect customers here after successful payment
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="failureUrl">Failure URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="failureUrl"
                  placeholder="https://your-domain.com/failure"
                  value={data.failureUrl || ''}
                  onChange={(e) => handleInputChange('failureUrl', e.target.value)}
                />
                {data.failureUrl && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {validateUrl(data.failureUrl) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testUrl(data.failureUrl)}
                disabled={!data.failureUrl}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirect customers here after failed payment
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancelUrl">Cancel URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="cancelUrl"
                  placeholder="https://your-domain.com/cancel"
                  value={data.cancelUrl || ''}
                  onChange={(e) => handleInputChange('cancelUrl', e.target.value)}
                />
                {data.cancelUrl && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {validateUrl(data.cancelUrl) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testUrl(data.cancelUrl)}
                disabled={!data.cancelUrl}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirect customers here when they cancel payment
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allowedDomains">Allowed Domains</Label>
            <Textarea
              id="allowedDomains"
              placeholder="your-domain.com&#10;subdomain.your-domain.com&#10;*.your-domain.com"
              value={data.allowedDomains || ''}
              onChange={(e) => handleInputChange('allowedDomains', e.target.value)}
              rows={3}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              One domain per line. Use * for wildcards (e.g., *.example.com)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipWhitelist">IP Whitelist</Label>
            <Textarea
              id="ipWhitelist"
              placeholder="192.168.1.1&#10;10.0.0.0/24&#10;203.0.113.0/24"
              value={data.ipWhitelist || ''}
              onChange={(e) => handleInputChange('ipWhitelist', e.target.value)}
              rows={3}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              One IP address or CIDR block per line. Leave empty to allow all IPs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>CORS Enabled</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Allow cross-origin requests
                </p>
              </div>
              <Switch
                checked={data.corsEnabled || true}
                onCheckedChange={(checked) => handleInputChange('corsEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SSL Required</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Require HTTPS for all requests
                </p>
              </div>
              <Switch
                checked={data.sslRequired || true}
                onCheckedChange={(checked) => handleInputChange('sslRequired', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URL Validation Status */}
      <Card>
        <CardHeader>
          <CardTitle>URL Validation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Webhook URL', url: data.webhookUrl, key: 'webhook' },
              { label: 'Success URL', url: data.successUrl, key: 'success' },
              { label: 'Failure URL', url: data.failureUrl, key: 'failure' },
              { label: 'Cancel URL', url: data.cancelUrl, key: 'cancel' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                    {item.url || 'Not configured'}
                  </div>
                </div>
                <div>
                  {!item.url ? (
                    <Badge variant="outline">Not Set</Badge>
                  ) : validateUrl(item.url) ? (
                    <Badge className="bg-green-100 text-green-800">Valid HTTPS</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Invalid URL</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Security Best Practices
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                <li>• All URLs must use HTTPS in production environment</li>
                <li>• Webhook secrets should be strong and unique</li>
                <li>• Regularly rotate webhook secrets and API keys</li>
                <li>• Implement proper webhook signature verification</li>
                <li>• Test all URLs before deploying to production</li>
                <li>• Use IP whitelisting for enhanced security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default URLsAndPolicies;
