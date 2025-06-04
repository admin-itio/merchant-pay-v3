
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  MoreHorizontal,
  Eye,
  RotateCcw,
  AlertTriangle,
  FileText,
  Calendar,
  CreditCard,
  Globe,
  Shield
} from 'lucide-react';

const TransactionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock transaction data
  const transactions = [
    {
      id: 'TXN001',
      amount: 1250.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'Card',
      customer: 'john.doe@email.com',
      merchantRef: 'ORD-2024-001',
      timestamp: '2024-01-15 14:30:25',
      fraudScore: 15,
      gateway: 'Stripe',
      country: 'US',
      category: 'E-commerce'
    },
    {
      id: 'TXN002',
      amount: 89.99,
      currency: 'EUR',
      status: 'refunded',
      paymentMethod: 'PayPal',
      customer: 'mary.smith@email.com',
      merchantRef: 'ORD-2024-002',
      timestamp: '2024-01-15 13:15:10',
      fraudScore: 8,
      gateway: 'PayPal',
      country: 'DE',
      category: 'Digital'
    },
    {
      id: 'TXN003',
      amount: 2100.00,
      currency: 'USD',
      status: 'chargeback',
      paymentMethod: 'Card',
      customer: 'suspicious@email.com',
      merchantRef: 'ORD-2024-003',
      timestamp: '2024-01-15 12:45:33',
      fraudScore: 85,
      gateway: 'Stripe',
      country: 'Unknown',
      category: 'High-value'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      case 'chargeback': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Monitor, analyze, and manage all your transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">$45,231</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+12.5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+2.1% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chargebacks</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-1">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Fraud Score</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">-5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by transaction ID, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-100">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
          <TabsTrigger value="chargeback">Chargebacks</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history with advanced filtering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">Transaction ID</th>
                      <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-3 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-3 font-medium text-gray-600">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600">Fraud Score</th>
                      <th className="text-left p-3 font-medium text-gray-600">Gateway</th>
                      <th className="text-left p-3 font-medium text-gray-600">Country</th>
                      <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.id}</p>
                            <p className="text-sm text-gray-500">{transaction.merchantRef}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {transaction.currency} {transaction.amount.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">{transaction.paymentMethod}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.customer}</p>
                            <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${getFraudScoreColor(transaction.fraudScore)}`}>
                            {transaction.fraudScore}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-900">{transaction.gateway}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-900">{transaction.country}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {transaction.status === 'completed' && (
                              <Button variant="ghost" size="sm">
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            )}
                            {transaction.status === 'chargeback' && (
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chargeback" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Chargeback Management</CardTitle>
              <CardDescription>Handle chargebacks and upload dispute documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Chargeback - TXN003</h3>
                    <p className="text-sm text-gray-600">Amount: $2,100.00 • Reason: Fraud</p>
                    <p className="text-sm text-gray-500">Deadline: 7 days remaining</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Evidence
                    </Button>
                    <Button size="sm">
                      Accept Liability
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
              <CardDescription>Manage payment disputes and representment cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Disputes</h3>
                <p className="text-gray-600">Your disputes will appear here when they arise</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionsList;
