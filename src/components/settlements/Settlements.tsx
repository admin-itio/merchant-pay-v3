
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, Wallet, Clock, DollarSign } from 'lucide-react';

const Settlements = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const settlements = [
    {
      id: 'SETT-001',
      amount: '$12,456.78',
      currency: 'USD',
      status: 'Completed',
      date: '2024-01-15',
      bankAccount: '****1234',
      transactions: 145,
      fees: '$87.23'
    },
    {
      id: 'SETT-002',
      amount: '$8,923.45',
      currency: 'USD',
      status: 'Pending',
      date: '2024-01-14',
      bankAccount: '****1234',
      transactions: 98,
      fees: '$62.14'
    },
    {
      id: 'SETT-003',
      amount: '$15,678.90',
      currency: 'USD',
      status: 'Completed',
      date: '2024-01-13',
      bankAccount: '****1234',
      transactions: 187,
      fees: '$109.56'
    },
    {
      id: 'SETT-004',
      amount: '$6,543.21',
      currency: 'USD',
      status: 'Processing',
      date: '2024-01-12',
      bankAccount: '****1234',
      transactions: 76,
      fees: '$45.78'
    }
  ];

  const summaryStats = [
    {
      title: 'Pending Amount',
      value: '$18,456.78',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Available Balance',
      value: '$42,123.45',
      icon: Wallet,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Settled',
      value: '$156,789.12',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settlements</h2>
          <p className="text-gray-600 mt-1">Manage and track your payment settlements</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bank Account Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Settlement Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Primary Bank Account</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium">Chase Business Account</p>
                <p className="text-sm text-gray-600">Account ending in 1234</p>
                <p className="text-sm text-gray-600">Routing: 021000021</p>
              </div>
              <Button variant="outline" className="mt-2">Change Account</Button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Settlement Schedule</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium">Daily settlements</p>
                <p className="text-sm text-gray-600">Initiated at 6:00 PM EST</p>
                <p className="text-sm text-gray-600">Typically arrives in 1-2 business days</p>
              </div>
              <Button variant="outline" className="mt-2">Update Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settlements History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Settlement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Settlement ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Transactions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fees</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Bank Account</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((settlement) => (
                  <tr key={settlement.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600">{settlement.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{settlement.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{settlement.transactions}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{settlement.fees}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{settlement.bankAccount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        settlement.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : settlement.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {settlement.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{settlement.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
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

export default Settlements;
