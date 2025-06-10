
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Edit,
  Trash2,
  Activity,
  FileText,
  Shield
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalTransactions: number;
  totalSpent: number;
  currency: string;
  joinDate: string;
  lastTransaction: string;
  country: string;
  city: string;
  riskLevel: string;
  preferredPayment: string;
  tags: string[];
}

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerDetailsModal = ({ customer, isOpen, onClose }: CustomerDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) return null;

  // Mock transaction history
  const transactionHistory = [
    {
      id: 'TXN001',
      amount: 125.00,
      status: 'completed',
      date: '2024-06-05',
      paymentMethod: 'Visa ****1234'
    },
    {
      id: 'TXN002',
      amount: 89.99,
      status: 'completed',
      date: '2024-05-28',
      paymentMethod: 'PayPal'
    },
    {
      id: 'TXN003',
      amount: 299.50,
      status: 'refunded',
      date: '2024-05-15',
      paymentMethod: 'Visa ****1234'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Profile - {customer.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Customer ID</label>
                        <p className="text-gray-900">{customer.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <div className="mt-1">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{customer.email}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{customer.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{customer.city}, {customer.country}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Join Date</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{customer.joinDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Preferred Payment Method</label>
                      <div className="flex items-center gap-2 mt-1">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{customer.preferredPayment}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Tags</label>
                      <div className="flex gap-2 mt-1">
                        {customer.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{customer.totalTransactions}</p>
                        <p className="text-sm text-gray-600">Total Transactions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(customer.totalSpent, customer.currency)}
                        </p>
                        <p className="text-sm text-gray-600">Total Spent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(customer.totalSpent / customer.totalTransactions, customer.currency)}
                        </p>
                        <p className="text-sm text-gray-600">Average Order</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-lg font-bold ${getRiskLevelColor(customer.riskLevel)}`}>
                        {customer.riskLevel.toUpperCase()}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Risk Level</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Customer
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    {customer.riskLevel === 'high' && (
                      <Button className="w-full" variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Flag Account
                      </Button>
                    )}
                    <Button className="w-full" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Customer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="font-medium">{transaction.id}</p>
                          <p className="text-sm text-gray-500">{transaction.paymentMethod}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(transaction.amount, customer.currency)}
                        </p>
                        <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Customer Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-px h-8 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Payment Completed</p>
                      <p className="text-sm text-gray-600">Transaction TXN001 for $125.00 completed successfully</p>
                      <p className="text-xs text-gray-500">2024-06-05 14:30:25</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-px h-8 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Profile Updated</p>
                      <p className="text-sm text-gray-600">Customer updated phone number</p>
                      <p className="text-xs text-gray-500">2024-05-30 10:15:00</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-gray-600">Customer account was created</p>
                      <p className="text-xs text-gray-500">{customer.joinDate} 09:00:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;
