
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TechnicalConfigurationProps {
  formData: any;
  setFormData: (data: any) => void;
}

const TechnicalConfiguration = ({ formData, setFormData }: TechnicalConfigurationProps) => {
  return (
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
  );
};

export default TechnicalConfiguration;
