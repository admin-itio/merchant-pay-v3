
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Globe, Settings } from 'lucide-react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'visa',
      name: 'Visa',
      type: 'card',
      icon: CreditCard,
      enabled: true,
      processingFee: '2.9% + $0.30',
      description: 'Accept Visa credit and debit cards worldwide',
      supported: ['US', 'EU', 'CA', 'AU']
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      type: 'card',
      icon: CreditCard,
      enabled: true,
      processingFee: '2.9% + $0.30',
      description: 'Accept Mastercard credit and debit cards worldwide',
      supported: ['US', 'EU', 'CA', 'AU']
    },
    {
      id: 'amex',
      name: 'American Express',
      type: 'card',
      icon: CreditCard,
      enabled: false,
      processingFee: '3.5% + $0.30',
      description: 'Accept American Express cards',
      supported: ['US', 'EU', 'CA']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'wallet',
      icon: Globe,
      enabled: true,
      processingFee: '3.49% + $0.49',
      description: 'PayPal digital wallet payments',
      supported: ['US', 'EU', 'CA', 'AU', 'Global']
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      type: 'mobile',
      icon: Smartphone,
      enabled: true,
      processingFee: '2.9% + $0.30',
      description: 'Accept payments via Apple Pay',
      supported: ['US', 'EU', 'CA', 'AU']
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      type: 'mobile',
      icon: Smartphone,
      enabled: true,
      processingFee: '2.9% + $0.30',
      description: 'Accept payments via Google Pay',
      supported: ['US', 'EU', 'CA', 'AU']
    },
    {
      id: 'banktransfer',
      name: 'Bank Transfer',
      type: 'bank',
      icon: Globe,
      enabled: false,
      processingFee: '0.8%',
      description: 'Direct bank transfers (ACH)',
      supported: ['US', 'EU']
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      type: 'crypto',
      icon: Globe,
      enabled: false,
      processingFee: '1.5%',
      description: 'Accept Bitcoin, Ethereum and other cryptocurrencies',
      supported: ['Global']
    }
  ]);

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'card': return 'bg-blue-100 text-blue-800';
      case 'wallet': return 'bg-purple-100 text-purple-800';
      case 'mobile': return 'bg-green-100 text-green-800';
      case 'bank': return 'bg-orange-100 text-orange-800';
      case 'crypto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-gray-600 mt-1">Configure which payment methods your customers can use</p>
        </div>
        <Button className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Global Settings
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {paymentMethods.filter(m => m.enabled).length}
              </p>
              <p className="text-sm text-gray-600">Active Methods</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {paymentMethods.filter(m => m.type === 'card' && m.enabled).length}
              </p>
              <p className="text-sm text-gray-600">Card Types</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {paymentMethods.filter(m => m.type === 'wallet' && m.enabled).length}
              </p>
              <p className="text-sm text-gray-600">Digital Wallets</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">2.9%</p>
              <p className="text-sm text-gray-600">Avg. Processing Fee</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id} className={`border-l-4 ${method.enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${method.enabled ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <Icon className={`h-5 w-5 ${method.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <Badge variant="secondary" className={getTypeColor(method.type)}>
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={() => togglePaymentMethod(method.id)}
                  />
                </div>

                <p className="text-sm text-gray-600 mb-3">{method.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Processing Fee:</span>
                    <span className="text-sm text-gray-900 font-mono">{method.processingFee}</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">Supported Regions:</span>
                    <div className="flex flex-wrap gap-1">
                      {method.supported.map((region) => (
                        <Badge key={region} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm">
                    Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Checkout Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Checkout Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Display Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Show payment method logos</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Enable express checkout</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Save customer payment methods</label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">3D Secure authentication</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">CVV verification</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Address verification</label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
