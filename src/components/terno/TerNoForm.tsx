
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Key, Eye, EyeOff } from 'lucide-react';

interface TerNoFormProps {
  terno?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const TerNoForm = ({ terno, onClose, onSave }: TerNoFormProps) => {
  const [formData, setFormData] = useState({
    businessName: terno?.businessName || '',
    businessUrl: terno?.businessUrl || '',
    businessDescription: terno?.businessDescription || '',
    terminalType: terno?.terminalType || '',
    dbaName: terno?.dbaName || '',
    customerServiceNo: terno?.customerServiceNo || '',
    customerServiceEmail: terno?.customerServiceEmail || '',
    termsConditionsUrl: terno?.termsConditionsUrl || '',
    refundPolicyUrl: terno?.refundPolicyUrl || '',
    privacyPolicyUrl: terno?.privacyPolicyUrl || '',
    contactUsUrl: terno?.contactUsUrl || '',
    logoUrl: terno?.logoUrl || '',
    notificationEmail: terno?.notificationEmail || '',
    returnUrl: terno?.returnUrl || '',
    webhookUrl: terno?.webhookUrl || '',
    gateway: terno?.gateway || '',
    status: terno?.status || 'pending',
    // Notification settings
    notificationSettings: terno?.notificationSettings || {
      approved: false,
      declined: false,
      withdraw: false,
      chargeback: false,
      refund: false,
      customer: false
    },
    // Orchestration rules - ensure it's always an array
    orchestrationRules: Array.isArray(terno?.orchestrationRules) ? terno.orchestrationRules : []
  });

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [generatedKeys, setGeneratedKeys] = useState<{publicKey: string, privateKey: string} | null>(null);

  const generateKeyPair = () => {
    // In real implementation, this would call a secure API
    const publicKey = `MTE3MjhfOTUxXzIwMjUwNTA3Tg${Math.random().toString(36).substr(2, 20)}`;
    const privateKey = `PRIV_${Math.random().toString(36).substr(2, 32).toUpperCase()}`;
    setGeneratedKeys({ publicKey, privateKey });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      publicKey: generatedKeys?.publicKey,
      privateKey: generatedKeys?.privateKey
    });
  };

  const addOrchestrationRule = () => {
    setFormData({
      ...formData,
      orchestrationRules: [...formData.orchestrationRules, {
        id: Date.now(),
        name: '',
        priority: 1,
        conditions: [],
        actions: []
      }]
    });
  };

  const removeOrchestrationRule = (index: number) => {
    setFormData({
      ...formData,
      orchestrationRules: formData.orchestrationRules.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to TerNo List
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {terno ? 'Edit TerNo' : 'Add New TerNo'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure terminal number settings and gateway connections
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="Add New Business of your choice"
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessUrl">Business URL *</Label>
                <Input
                  id="businessUrl"
                  value={formData.businessUrl}
                  onChange={(e) => setFormData({...formData, businessUrl: e.target.value})}
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                placeholder="Describe your business..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="terminalType">Terminal Type</Label>
                <Input
                  id="terminalType"
                  value={formData.terminalType}
                  onChange={(e) => setFormData({...formData, terminalType: e.target.value})}
                  placeholder="Start typing the Terminal Type"
                />
              </div>
              <div>
                <Label htmlFor="dbaName">DBA/Brand Name</Label>
                <Input
                  id="dbaName"
                  value={formData.dbaName}
                  onChange={(e) => setFormData({...formData, dbaName: e.target.value})}
                  placeholder="Doing Business As name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerServiceNo">Customer Service No.</Label>
                <Input
                  id="customerServiceNo"
                  value={formData.customerServiceNo}
                  onChange={(e) => setFormData({...formData, customerServiceNo: e.target.value})}
                  placeholder="+1-800-123-4567"
                />
              </div>
              <div>
                <Label htmlFor="customerServiceEmail">Customer Service Email</Label>
                <Input
                  id="customerServiceEmail"
                  type="email"
                  value={formData.customerServiceEmail}
                  onChange={(e) => setFormData({...formData, customerServiceEmail: e.target.value})}
                  placeholder="support@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URLs and Policies */}
        <Card>
          <CardHeader>
            <CardTitle>URLs and Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="termsConditionsUrl">T & C URL</Label>
                <Input
                  id="termsConditionsUrl"
                  value={formData.termsConditionsUrl}
                  onChange={(e) => setFormData({...formData, termsConditionsUrl: e.target.value})}
                  placeholder="https://example.com/terms"
                />
              </div>
              <div>
                <Label htmlFor="refundPolicyUrl">URL of Refund Policy</Label>
                <Input
                  id="refundPolicyUrl"
                  value={formData.refundPolicyUrl}
                  onChange={(e) => setFormData({...formData, refundPolicyUrl: e.target.value})}
                  placeholder="https://example.com/refund"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="privacyPolicyUrl">URL of Privacy Policy</Label>
                <Input
                  id="privacyPolicyUrl"
                  value={formData.privacyPolicyUrl}
                  onChange={(e) => setFormData({...formData, privacyPolicyUrl: e.target.value})}
                  placeholder="https://example.com/privacy"
                />
              </div>
              <div>
                <Label htmlFor="contactUsUrl">URL of Contact US</Label>
                <Input
                  id="contactUsUrl"
                  value={formData.contactUsUrl}
                  onChange={(e) => setFormData({...formData, contactUsUrl: e.target.value})}
                  placeholder="https://example.com/contact"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logoUrl">URL of Logo</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl}
                onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  value={formData.notificationEmail}
                  onChange={(e) => setFormData({...formData, notificationEmail: e.target.value})}
                  placeholder="notifications@example.com"
                />
              </div>
              <div>
                <Label htmlFor="returnUrl">Return URL</Label>
                <Input
                  id="returnUrl"
                  value={formData.returnUrl}
                  onChange={(e) => setFormData({...formData, returnUrl: e.target.value})}
                  placeholder="https://example.com/return"
                />
              </div>
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={(e) => setFormData({...formData, webhookUrl: e.target.value})}
                  placeholder="https://example.com/webhook"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gateway">Gateway</Label>
                <Select value={formData.gateway} onValueChange={(value) => setFormData({...formData, gateway: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="razorpay">Razorpay</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="payu">PayU</SelectItem>
                    <SelectItem value="cashfree">Cashfree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Public/Private Key Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button type="button" onClick={generateKeyPair} variant="outline">
                Generate New Key Pair
              </Button>
              {generatedKeys && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Keys Generated Successfully
                </Badge>
              )}
            </div>

            {generatedKeys && (
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <Label>Public Key</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={generatedKeys.publicKey} readOnly className="font-mono text-xs" />
                    <Button type="button" variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedKeys.publicKey)}>
                      Copy
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    Private Key
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      value={showPrivateKey ? generatedKeys.privateKey : '•'.repeat(generatedKeys.privateKey.length)} 
                      readOnly 
                      className="font-mono text-xs" 
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedKeys.privateKey)}>
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Alert Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(formData.notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={Boolean(value)}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        notificationSettings: {
                          ...formData.notificationSettings,
                          [key]: checked === true
                        }
                      })
                    }
                  />
                  <Label htmlFor={key} className="capitalize text-sm">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orchestration Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Orchestration Rules
              <Button type="button" onClick={addOrchestrationRule} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.orchestrationRules.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No orchestration rules configured. Click "Add Rule" to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.orchestrationRules.map((rule: any, index: number) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Rule #{index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeOrchestrationRule(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Rule Name</Label>
                        <Input
                          value={rule.name}
                          onChange={(e) => {
                            const updatedRules = [...formData.orchestrationRules];
                            updatedRules[index].name = e.target.value;
                            setFormData({...formData, orchestrationRules: updatedRules});
                          }}
                          placeholder="Rule name"
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Input
                          type="number"
                          value={rule.priority}
                          onChange={(e) => {
                            const updatedRules = [...formData.orchestrationRules];
                            updatedRules[index].priority = parseInt(e.target.value);
                            setFormData({...formData, orchestrationRules: updatedRules});
                          }}
                          placeholder="1"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {terno ? 'Update TerNo' : 'Create TerNo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TerNoForm;
