import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  Filter,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Transfer {
  id: string;
  beneficiaryName: string;
  amount: number;
  currency: string;
  type: 'PAYIN' | 'PAYOUT' | 'Invoice';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'Web' | 'API' | 'Upload';
  fee: number;
  createdAt: string;
  completedAt?: string;
}

const TransferManagement = () => {
  const [transfers] = useState<Transfer[]>([
    {
      id: 'TXN001',
      beneficiaryName: 'ABC Corp Ltd',
      amount: 15000,
      currency: 'USD',
      type: 'PAYOUT',
      status: 'completed',
      method: 'Web',
      fee: 25,
      createdAt: '2025-06-07T10:30:00Z',
      completedAt: '2025-06-07T10:35:00Z'
    },
    {
      id: 'TXN002',
      beneficiaryName: 'Crypto Payments',
      amount: 5000,
      currency: 'USDT',
      type: 'PAYOUT',
      status: 'processing',
      method: 'API',
      fee: 15,
      createdAt: '2025-06-07T09:15:00Z'
    },
    {
      id: 'TXN003',
      beneficiaryName: 'Supplier XYZ',
      amount: 8500,
      currency: 'EUR',
      type: 'Invoice',
      status: 'pending',
      method: 'Upload',
      fee: 30,
      createdAt: '2025-06-07T08:45:00Z'
    }
  ]);

  const formatAmount = (amount: number, currency: string) => {
    // List of known cryptocurrencies and other non-ISO currencies
    const cryptoCurrencies = ['USDT', 'BTC', 'ETH', 'USDC', 'BNB', 'ADA', 'DOT', 'MATIC'];
    
    if (cryptoCurrencies.includes(currency.toUpperCase())) {
      // For cryptocurrencies, use a simple format with the currency symbol
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
    
    // For standard ISO currencies, use the Intl.NumberFormat
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch (error) {
      // Fallback for any unrecognized currency codes
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PAYIN': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'PAYOUT': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Invoice': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const downloadSampleFile = () => {
    const csvContent = `Beneficiary Name,Amount,Currency,Type,Reference
ABC Corp Ltd,15000,USD,PAYOUT,Payment for services
Crypto Payments,5000,USDT,PAYOUT,Crypto transfer
Supplier XYZ,8500,EUR,Invoice,Invoice payment`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transfer_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = transfers.reduce((sum, transfer) => sum + transfer.amount, 0);
  const totalFees = transfers.reduce((sum, transfer) => sum + transfer.fee, 0);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Transfer Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage payout transfers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadSampleFile}>
            <Download className="h-4 w-4 mr-2" />
            Sample File
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Excel
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Quick Transfer
          </Button>
        </div>
      </div>

      {/* Fee Notice */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Transfer Fee Structure
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Company Bank Accounts:</strong> No fees applied<br />
                <strong>External Beneficiaries:</strong> 2.5% + $5 fixed transaction fee
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {transfers.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {transfers.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              ${totalFees.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Fees</div>
          </CardContent>
        </Card>
      </div>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transfer History</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-mono">{transfer.id}</TableCell>
                  <TableCell className="font-medium">{transfer.beneficiaryName}</TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      {formatAmount(transfer.amount, transfer.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(transfer.type)}>
                      {transfer.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transfer.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ${transfer.fee}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(transfer.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-500">
                        {new Date(transfer.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferManagement;
