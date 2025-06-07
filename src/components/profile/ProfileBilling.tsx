
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Download, Calendar, DollarSign, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  downloadUrl?: string;
}

const ProfileBilling = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState('professional');
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      last4: '1234',
      bankName: 'Chase Bank',
      isDefault: false
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      date: '2024-06-01',
      amount: 299,
      status: 'paid',
      description: 'Professional Plan - June 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2024-05-01',
      amount: 299,
      status: 'paid',
      description: 'Professional Plan - May 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2024-04-01',
      amount: 199,
      status: 'paid',
      description: 'Starter Plan - April 2024',
      downloadUrl: '#'
    }
  ]);

  const plans = {
    starter: {
      name: 'Starter',
      price: 199,
      features: ['Up to 1,000 transactions/month', 'Basic analytics', 'Email support'],
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    professional: {
      name: 'Professional',
      price: 299,
      features: ['Up to 10,000 transactions/month', 'Advanced analytics', 'Priority support', 'API access'],
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    enterprise: {
      name: 'Enterprise',
      price: 599,
      features: ['Unlimited transactions', 'Custom analytics', '24/7 support', 'Dedicated account manager'],
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  };

  const handlePlanChange = (newPlan: string) => {
    setCurrentPlan(newPlan);
    toast({
      title: "Plan Updated",
      description: `Your plan has been changed to ${plans[newPlan as keyof typeof plans].name}`,
    });
  };

  const handleSetDefaultPayment = (methodId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    toast({
      title: "Default Payment Updated",
      description: "Your default payment method has been updated",
    });
  };

  const handleRemovePaymentMethod = (methodId: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== methodId));
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed from your account",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    if (method.type === 'card') {
      switch (method.brand) {
        case 'visa':
          return '💳';
        case 'mastercard':
          return '💳';
        case 'amex':
          return '💳';
        default:
          return '💳';
      }
    } else {
      return '🏦';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>Manage your subscription and billing preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Badge className={plans[currentPlan as keyof typeof plans].color}>
                {plans[currentPlan as keyof typeof plans].name}
              </Badge>
              <span className="text-2xl font-bold">
                ${plans[currentPlan as keyof typeof plans].price}/month
              </span>
            </div>
            <Button variant="outline">
              Change Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`p-4 border rounded-lg ${
                  currentPlan === key ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{plan.name}</h3>
                  <span className="text-lg font-bold">${plan.price}/mo</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {currentPlan !== key && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => handlePlanChange(key)}
                  >
                    Select Plan
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods and billing information</CardDescription>
            </div>
            <Button onClick={() => setShowAddPaymentMethod(!showAddPaymentMethod)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddPaymentMethod && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-4">Add New Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <Select defaultValue="card">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="bank">Bank Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="123" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Add Payment Method</Button>
                <Button variant="outline" onClick={() => setShowAddPaymentMethod(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPaymentMethodIcon(method)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {method.type === 'card' 
                          ? `${method.brand?.toUpperCase()} •••• ${method.last4}`
                          : `${method.bankName} •••• ${method.last4}`
                        }
                      </span>
                      {method.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    {method.type === 'card' && (
                      <p className="text-sm text-gray-500">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefaultPayment(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    {getStatusBadge(invoice.status)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Update your billing address and tax information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Acme Corporation" />
            </div>
            <div className="space-y-2">
              <Label>Tax ID</Label>
              <Input defaultValue="XX-XXXXXXX" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Billing Address</Label>
            <Input defaultValue="123 Business Ave" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input defaultValue="NY" />
            </div>
            <div className="space-y-2">
              <Label>ZIP Code</Label>
              <Input defaultValue="10001" />
            </div>
          </div>
          <Button>Update Billing Information</Button>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Usage & Limits
          </CardTitle>
          <CardDescription>Current usage against your plan limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Transactions</span>
                <span className="text-sm text-gray-500">7,234 / 10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">API Requests</span>
                <span className="text-sm text-gray-500">145,000 / 500,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '29%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-500">2.3 GB / 10 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBilling;
