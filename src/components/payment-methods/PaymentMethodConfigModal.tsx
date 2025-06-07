
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentMethodConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod?: any;
}

const PaymentMethodConfigModal = ({ isOpen, onClose, paymentMethod }: PaymentMethodConfigModalProps) => {
  const [config, setConfig] = useState({
    enabled: true,
    minAmount: '',
    maxAmount: '',
    currencies: [],
    countries: [],
    retryAttempts: '3',
    timeout: '30'
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Configure {paymentMethod?.name || 'Payment Method'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="limits">Limits</TabsTrigger>
            <TabsTrigger value="routing">Routing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enabled">Enable Payment Method</Label>
                  <Switch 
                    id="enabled" 
                    checked={config.enabled}
                    onCheckedChange={(checked) => setConfig({...config, enabled: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Processing Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minAmount">Minimum Amount</Label>
                    <Input 
                      id="minAmount" 
                      placeholder="0.00"
                      value={config.minAmount}
                      onChange={(e) => setConfig({...config, minAmount: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAmount">Maximum Amount</Label>
                    <Input 
                      id="maxAmount" 
                      placeholder="10000.00"
                      value={config.maxAmount}
                      onChange={(e) => setConfig({...config, maxAmount: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Routing Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Supported Countries</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input 
                      id="retryAttempts" 
                      value={config.retryAttempts}
                      onChange={(e) => setConfig({...config, retryAttempts: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input 
                      id="timeout" 
                      value={config.timeout}
                      onChange={(e) => setConfig({...config, timeout: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodConfigModal;
