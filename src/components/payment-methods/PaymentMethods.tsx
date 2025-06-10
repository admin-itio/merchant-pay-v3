
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, CreditCard, Smartphone, Globe } from 'lucide-react';
import PaymentMethodConfigModal from './PaymentMethodConfigModal';
import GlobalSettingsModal from './GlobalSettingsModal';

const PaymentMethods = () => {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 1,
      name: 'Credit Cards',
      icon: CreditCard,
      enabled: true,
      description: 'Visa, Mastercard, American Express',
      transactions: '1,234',
      volume: '$45,230'
    },
    {
      id: 2,
      name: 'Digital Wallets',
      icon: Smartphone,
      enabled: true,
      description: 'PayPal, Apple Pay, Google Pay',
      transactions: '567',
      volume: '$23,450'
    },
    {
      id: 3,
      name: 'Bank Transfers',
      icon: Globe,
      enabled: false,
      description: 'ACH, Wire transfers',
      transactions: '89',
      volume: '$12,100'
    }
  ];

  const handleConfigure = (method: any) => {
    setSelectedMethod(method);
    setConfigModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <p className="text-gray-600">Configure and manage your payment processing options</p>
        </div>
        <Button onClick={() => setGlobalSettingsOpen(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Global Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                  </div>
                  <Switch checked={method.enabled} />
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={method.enabled ? "default" : "secondary"}>
                      {method.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Transactions:</span>
                    <span className="font-medium">{method.transactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Volume:</span>
                    <span className="font-medium">{method.volume}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleConfigure(method)}
                  >
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <PaymentMethodConfigModal 
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        paymentMethod={selectedMethod}
      />

      <GlobalSettingsModal 
        isOpen={globalSettingsOpen}
        onClose={() => setGlobalSettingsOpen(false)}
      />
    </div>
  );
};

export default PaymentMethods;
