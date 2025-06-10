
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  Download, 
  Upload, 
  Plus, 
  Building2, 
  Users, 
  CreditCard,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import BeneficiaryManagement from './BeneficiaryManagement';
import TransferManagement from './TransferManagement';
import CompanyAccountManagement from './CompanyAccountManagement';

const PayoutManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for statistics
  const stats = {
    totalPayouts: 1250000,
    pendingPayouts: 45000,
    completedPayouts: 1205000,
    totalBeneficiaries: 156,
    companyAccounts: 3,
    monthlyVolume: 2800000
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'PAYOUT',
      beneficiary: 'ABC Corp Ltd',
      amount: 15000,
      currency: 'USD',
      status: 'completed',
      method: 'Bank Transfer',
      date: '2025-06-07T10:30:00Z',
      fee: 25
    },
    {
      id: 'TXN002', 
      type: 'PAYOUT',
      beneficiary: 'Crypto Wallet - 0x1234...abcd',
      amount: 5000,
      currency: 'USDT',
      status: 'pending',
      method: 'Crypto',
      date: '2025-06-07T09:15:00Z',
      fee: 15
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Payout Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage outgoing transfers, beneficiaries, and company accounts
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="company">Company Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Payouts</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatAmount(stats.totalPayouts)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatAmount(stats.pendingPayouts)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatAmount(stats.completedPayouts)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Beneficiaries</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {stats.totalBeneficiaries}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-indigo-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Company Accounts</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {stats.companyAccounts}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Monthly Volume</div>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatAmount(stats.monthlyVolume)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Notice */}
          <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                    Payout Fee Information
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    <strong>Free payouts:</strong> Transfers to your verified company bank accounts<br />
                    <strong>Fee-based payouts:</strong> Transfers to external beneficiaries (2.5% + $5 fixed fee)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payout Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(txn.status)}`} />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {txn.beneficiary}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {txn.id} • {txn.method} • {new Date(txn.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        -{formatAmount(txn.amount)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Fee: {formatAmount(txn.fee)}
                      </div>
                    </div>
                    <Badge className={`${txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {txn.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beneficiaries">
          <BeneficiaryManagement />
        </TabsContent>

        <TabsContent value="transfers">
          <TransferManagement />
        </TabsContent>

        <TabsContent value="company">
          <CompanyAccountManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayoutManagement;
