
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DefaultRoutingStrategyProps {
  data: any;
  onChange: (data: any) => void;
}

const DefaultRoutingStrategy = ({ data, onChange }: DefaultRoutingStrategyProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Routing Strategy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryProcessor">Primary Processor</Label>
            <Select value={data.primaryProcessor || ''} onValueChange={(value) => handleInputChange('primaryProcessor', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary processor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="adyen">Adyen</SelectItem>
                <SelectItem value="worldpay">Worldpay</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallbackProcessor">Fallback Processor</Label>
            <Select value={data.fallbackProcessor || ''} onValueChange={(value) => handleInputChange('fallbackProcessor', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fallback processor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="adyen">Adyen</SelectItem>
                <SelectItem value="worldpay">Worldpay</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="routingLogic">Routing Logic</Label>
            <Select value={data.routingLogic || 'cost-optimized'} onValueChange={(value) => handleInputChange('routingLogic', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select routing logic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost-optimized">Cost Optimized</SelectItem>
                <SelectItem value="success-rate">Success Rate</SelectItem>
                <SelectItem value="speed">Fastest Processing</SelectItem>
                <SelectItem value="geographic">Geographic</SelectItem>
                <SelectItem value="round-robin">Round Robin</SelectItem>
              </SelectContent>
            </Select>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultRoutingStrategy;
