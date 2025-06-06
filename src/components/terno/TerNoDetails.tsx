
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Copy, Eye, EyeOff, Key, Globe, Settings, Bell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TerNoDetailsProps {
  terno: any;
  onClose: () => void;
  onEdit: () => void;
}

const TerNoDetails = ({ terno, onClose, onEdit }: TerNoDetailsProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In real app, show toast notification
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to TerNo List
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              TerNo Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Complete configuration for {terno.businessName}
            </p>
          </div>
        </div>
        <Button onClick={onEdit} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit TerNo
        </Button>
      </div>

      {/* Status and Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Business Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Business Name:</span>
                  <p className="font-medium">{terno.businessName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Business URL:</span>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{terno.businessUrl}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">TerNo:</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300">
                    {terno.terNo}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Status & Gateway</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(terno.status)}`} />
                    <span className="capitalize font-medium">{terno.status}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gateway:</span>
                  <p className="font-medium">{terno.gateway}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                  <p className="font-medium">{terno.createdAt}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Configuration</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Orchestration Rules:</span>
                  <Badge variant="secondary" className="ml-2">{terno.orchestrationRules}</Badge>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Terminal Type:</span>
                  <p className="font-medium">{terno.terminalType || 'Not configured'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keys Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Key Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Public Key</h3>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Public Key (Used for verification)</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(terno.publicKey)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-xs font-mono block break-all bg-white dark:bg-gray-900 p-2 rounded border">
                  {terno.publicKey}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Private Key</h3>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Private Key (Keep secure)</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(terno.privateKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <code className="text-xs font-mono block break-all bg-white dark:bg-gray-900 p-2 rounded border">
                  {showPrivateKey ? terno.privateKey : '•'.repeat(32)}
                </code>
                {!showPrivateKey && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    ⚠️ Private key is hidden for security
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Technical Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">URLs</h3>
              <div className="space-y-2">
                {[
                  { label: 'Return URL', value: terno.returnUrl },
                  { label: 'Webhook URL', value: terno.webhookUrl },
                  { label: 'Terms & Conditions', value: terno.termsConditionsUrl },
                  { label: 'Privacy Policy', value: terno.privacyPolicyUrl }
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</span>
                    <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-1 rounded">
                      {item.value || 'Not configured'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Contact Information</h3>
              <div className="space-y-2">
                {[
                  { label: 'Customer Service No.', value: terno.customerServiceNo },
                  { label: 'Customer Service Email', value: terno.customerServiceEmail },
                  { label: 'Notification Email', value: terno.notificationEmail }
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</span>
                    <p className="text-sm font-medium">{item.value || 'Not configured'}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Additional</h3>
              <div className="space-y-2">
                {[
                  { label: 'DBA/Brand Name', value: terno.dbaName },
                  { label: 'Logo URL', value: terno.logoUrl },
                  { label: 'Contact US URL', value: terno.contactUsUrl }
                ].map((item, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</span>
                    <p className="text-sm font-medium">{item.value || 'Not configured'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(terno.notificationSettings || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm capitalize">{key}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orchestration Rules Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Orchestration Rules Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {terno.orchestrationRules > 0 ? (
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {terno.orchestrationRules} Rules Configured
              </Badge>
              <p className="text-gray-600 dark:text-gray-400">
                Active orchestration rules managing payment flow and routing
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">No orchestration rules configured</p>
              <Button variant="outline" onClick={onEdit}>
                Configure Rules
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TerNoDetails;
