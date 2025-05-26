
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter } from 'lucide-react';

const TransactionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-001',
      customer: 'Alice Johnson',
      email: 'alice@example.com',
      amount: '$159.99',
      status: 'Success',
      paymentMethod: 'Visa ****4532',
      date: '2024-01-15 14:30',
      gateway: 'Stripe'
    },
    {
      id: 'TXN-002',
      customer: 'Bob Smith',
      email: 'bob@example.com',
      amount: '$89.50',
      status: 'Pending',
      paymentMethod: 'PayPal',
      date: '2024-01-15 14:25',
      gateway: 'PayPal'
    },
    {
      id: 'TXN-003',
      customer: 'Carol Davis',
      email: 'carol@example.com',
      amount: '$299.99',
      status: 'Success',
      paymentMethod: 'Mastercard ****8765',
      date: '2024-01-15 14:18',
      gateway: 'Adyen'
    },
    {
      id: 'TXN-004',
      customer: 'David Wilson',
      email: 'david@example.com',
      amount: '$45.00',
      status: 'Failed',
      paymentMethod: 'Visa ****1234',
      date: '2024-01-15 14:12',
      gateway: 'Stripe'
    },
    {
      id: 'TXN-005',
      customer: 'Eva Brown',
      email: 'eva@example.com',
      amount: '$199.99',
      status: 'Success',
      paymentMethod: 'Apple Pay',
      date: '2024-01-15 14:05',
      gateway: 'Square'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Payment Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Gateway</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600">{transaction.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.customer}</p>
                        <p className="text-sm text-gray-500">{transaction.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{transaction.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{transaction.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {transaction.gateway}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === 'Success' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{transaction.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsList;
