
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Eye, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RevenueWidget from './widgets/RevenueWidget';
import TransactionVolumeWidget from './widgets/TransactionVolumeWidget';
import ActiveUsersWidget from './widgets/ActiveUsersWidget';
import PerformanceWidget from './widgets/PerformanceWidget';

const DashboardOverview = () => {
  const recentTransactions = [
    { 
      id: 'TXN-001', 
      customer: 'Alice Johnson', 
      email: 'alice.j@email.com',
      amount: '$159.99', 
      productName: 'Premium Subscription',
      status: 'Success', 
      time: '2 mins ago',
      paymentMethod: 'Visa ****1234'
    },
    { 
      id: 'TXN-002', 
      customer: 'Bob Smith', 
      email: 'bob.smith@email.com',
      amount: '$89.50', 
      productName: 'Digital Course',
      status: 'Pending', 
      time: '5 mins ago',
      paymentMethod: 'PayPal'
    },
    { 
      id: 'TXN-003', 
      customer: 'Carol Davis', 
      email: 'carol.d@email.com',
      amount: '$299.99', 
      productName: 'Software License',
      status: 'Success', 
      time: '12 mins ago',
      paymentMethod: 'Mastercard ****5678'
    },
    { 
      id: 'TXN-004', 
      customer: 'David Wilson', 
      email: 'david.w@email.com',
      amount: '$45.00', 
      productName: 'Monthly Plan',
      status: 'Failed', 
      time: '18 mins ago',
      paymentMethod: 'Visa ****9012'
    },
    { 
      id: 'TXN-005', 
      customer: 'Eva Brown', 
      email: 'eva.brown@email.com',
      amount: '$199.99', 
      productName: 'Annual Membership',
      status: 'Success', 
      time: '25 mins ago',
      paymentMethod: 'American Express ****3456'
    }
  ];

  const handleViewTransaction = (transactionId: string) => {
    console.log('Viewing transaction:', transactionId);
    // This would open the transaction details modal
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Grid with New Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueWidget />
        <TransactionVolumeWidget />
        <ActiveUsersWidget />
        <PerformanceWidget />
      </div>

      {/* Enhanced Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewTransaction(transaction.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{transaction.customer}</p>
                      <span className="text-xs text-gray-500">({transaction.id})</span>
                    </div>
                    <p className="text-sm text-gray-600">{transaction.email}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{transaction.productName}</span>
                      <span>•</span>
                      <span>{transaction.paymentMethod}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Success' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleViewTransaction(transaction.id);
                  }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
