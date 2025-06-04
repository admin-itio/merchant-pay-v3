
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ProfileBilling = () => {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 2999,
    currency: '₹',
    billingCycle: 'Monthly',
    features: [
      'Up to 10,000 transactions/month',
      'Advanced fraud protection',
      'Real-time analytics',
      'API access',
      'Priority support',
      'Custom webhooks'
    ],
    nextBilling: '2024-02-15',
    status: 'active'
  });

  const billingHistory = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 2999,
      description: 'Professional Plan - January 2024',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 2999,
      description: 'Professional Plan - December 2023',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 2999,
      description: 'Professional Plan - November 2023',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-15',
      amount: 2999,
      description: 'Professional Plan - October 2023',
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  const usageStats = {
    currentMonth: {
      transactions: 7850,
      limit: 10000,
      apiCalls: 45680,
      apiLimit: 100000,
      storage: '2.3 GB',
      storageLimit: '10 GB'
    }
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'bank',
      accountNumber: '****1234',
      bankName: 'HDFC Bank',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <Badge className={currentPlan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {currentPlan.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold">{currentPlan.currency}{currentPlan.price}</span>
                <span className="text-gray-600">/ {currentPlan.billingCycle.toLowerCase()}</span>
              </div>
              <div className="space-y-2 mb-4">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Next billing: {currentPlan.nextBilling}
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline" className="w-full">Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Current Usage
          </CardTitle>
          <p className="text-sm text-gray-600">Your usage for the current billing period</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Transactions</span>
                <span className="text-sm text-gray-600">
                  {usageStats.currentMonth.transactions.toLocaleString()} / {usageStats.currentMonth.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${getUsagePercentage(usageStats.currentMonth.transactions, usageStats.currentMonth.limit)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getUsagePercentage(usageStats.currentMonth.transactions, usageStats.currentMonth.limit)}% used
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">API Calls</span>
                <span className="text-sm text-gray-600">
                  {usageStats.currentMonth.apiCalls.toLocaleString()} / {usageStats.currentMonth.apiLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${getUsagePercentage(usageStats.currentMonth.apiCalls, usageStats.currentMonth.apiLimit)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getUsagePercentage(usageStats.currentMonth.apiCalls, usageStats.currentMonth.apiLimit)}% used
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-600">
                  {usageStats.currentMonth.storage} / {usageStats.currentMonth.storageLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">23% used</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Payment Methods</CardTitle>
            <Button variant="outline">Add Payment Method</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    {method.type === 'card' ? (
                      <>
                        <p className="font-medium">{method.brand} •••• {method.last4}</p>
                        <p className="text-sm text-gray-600">Expires {method.expiryMonth}/{method.expiryYear}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{method.bankName}</p>
                        <p className="text-sm text-gray-600">Account {method.accountNumber}</p>
                      </>
                    )}
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Billing History
            </CardTitle>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{invoice.id}</h4>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{invoice.description}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{invoice.amount.toLocaleString()}</p>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBilling;
