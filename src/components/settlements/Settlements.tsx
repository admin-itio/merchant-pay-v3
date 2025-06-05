
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
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center lg:gap-0">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Settlements</h2>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Manage and track your payment settlements</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 lg:p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color}`} />
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
          <CardTitle className="text-base lg:text-lg font-semibold">Settlement Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm lg:text-base">Primary Bank Account</h4>
              <div className="p-3 lg:p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-sm lg:text-base">Chase Business Account</p>
                <p className="text-xs lg:text-sm text-gray-600">Account ending in 1234</p>
                <p className="text-xs lg:text-sm text-gray-600">Routing: 021000021</p>
              </div>
              <Button variant="outline" className="mt-2 w-full lg:w-auto text-sm">Change Account</Button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm lg:text-base">Settlement Schedule</h4>
              <div className="p-3 lg:p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-sm lg:text-base">Daily settlements</p>
                <p className="text-xs lg:text-sm text-gray-600">Initiated at 6:00 PM EST</p>
                <p className="text-xs lg:text-sm text-gray-600">Typically arrives in 1-2 business days</p>
              </div>
              <Button variant="outline" className="mt-2 w-full lg:w-auto text-sm">Update Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settlements History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base lg:text-lg font-semibold">Settlement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Settlement ID</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Amount</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Transactions</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Fees</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Bank Account</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Status</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Date</th>
                  <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-medium text-gray-600 text-xs lg:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((settlement) => (
                  <tr key={settlement.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="font-mono text-xs lg:text-sm text-blue-600">{settlement.id}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="font-semibold text-gray-900 text-xs lg:text-sm">{settlement.amount}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="text-gray-700 text-xs lg:text-sm">{settlement.transactions}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="text-gray-700 text-xs lg:text-sm">{settlement.fees}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="text-gray-700 text-xs lg:text-sm">{settlement.bankAccount}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        settlement.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : settlement.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {settlement.status}
                      </span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <span className="text-xs lg:text-sm text-gray-600">{settlement.date}</span>
                    </td>
                    <td className="py-3 lg:py-4 px-2 lg:px-4">
                      <Button variant="ghost" size="sm" className="text-xs lg:text-sm">
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
