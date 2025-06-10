
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Building2,
  Check,
  Clock,
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TransactionSettings from '../transactions/TransactionSettings';

interface CompanyAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
  currency: string;
  country: string;
  status: 'approved' | 'pending' | 'rejected';
  isDefault: boolean;
  createdAt: string;
  approvedAt?: string;
}

const CompanyAccountManagement = () => {
  const [companyAccounts] = useState<CompanyAccount[]>([
    {
      id: '1',
      accountName: 'MerchantPay Ltd - Main Account',
      accountNumber: 'GB29 NWBK 6016 1331 9268 19',
      bankName: 'NatWest Bank',
      swiftCode: 'NWBKGB2L',
      currency: 'GBP',
      country: 'United Kingdom',
      status: 'approved',
      isDefault: true,
      createdAt: '2025-01-15T10:00:00Z',
      approvedAt: '2025-01-16T14:30:00Z'
    },
    {
      id: '2',
      accountName: 'MerchantPay Ltd - USD Account',
      accountNumber: 'US64 SVBK US6S 1234 5678 9012',
      bankName: 'Silicon Valley Bank',
      swiftCode: 'SVBKUS6S',
      currency: 'USD',
      country: 'United States',
      status: 'approved',
      isDefault: false,
      createdAt: '2025-02-01T09:15:00Z',
      approvedAt: '2025-02-03T11:20:00Z'
    },
    {
      id: '3',
      accountName: 'MerchantPay Ltd - EUR Account',
      accountNumber: 'DE89 3704 0044 0532 0130 00',
      bankName: 'Commerzbank',
      swiftCode: 'COBADEFF',
      currency: 'EUR',
      country: 'Germany',
      status: 'pending',
      isDefault: false,
      createdAt: '2025-06-05T16:45:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return Check;
      case 'pending': return Clock;
      case 'rejected': return AlertCircle;
      default: return Clock;
    }
  };
  const [tableColumns, setTableColumns] = useState([
    { key: 'accountName', label: 'Account Name', visible: true, order: 0 },
    { key: 'accountNumber', label: 'Account Number', visible: true, order: 1 },
    { key: 'bankName', label: 'Bank Name', visible: true, order: 2 },
    { key: 'swiftCode', label: 'Swift Code', visible: false, order: 3 },
    { key: 'currency', label: 'Currency', visible: true, order: 4 },
    { key: 'country', label: 'Country', visible: false, order: 5 },
    { key: 'status', label: 'Status', visible: true, order: 6 },
    { key: 'isDefault', label: 'Deafult', visible: true, order: 7 },

  ]);
  const handleColumnsChange = (columns: typeof tableColumns) => {
    setTableColumns(columns);
  };
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Company Bank Accounts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage company bank accounts for fee-free payouts
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Company Account
        </Button>
      </div>

      {/* Info Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Company Account Benefits
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Company bank accounts require admin approval but allow fee-free payouts.
                All transfers to verified company accounts are processed without additional charges.
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
              {companyAccounts.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {companyAccounts.filter(acc => acc.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {companyAccounts.filter(acc => acc.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Approval</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {new Set(companyAccounts.map(acc => acc.currency)).size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Currencies</div>
          </CardContent>
        </Card>
      </div>

      {/* Company Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base lg:text-lg font-semibold">
            <div className="flex items-center justify-between">
              <span>Company Bank Accounts</span>
              <TransactionSettings
                columns={tableColumns}
                onColumnsChange={handleColumnsChange}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns
                  .filter(col => col.visible)
                  .sort((a, b) => a.order - b.order)
                  .map(col => (
                    <TableHead key={col.key}>{col.label}</TableHead>
                  ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {companyAccounts.map((account) => (
                <TableRow key={account.id}>
                  {tableColumns
                    .filter(col => col.visible)
                    .sort((a, b) => a.order - b.order)
                    .map(col => {
                      const key = col.key;
                      switch (key) {
                        case 'accountName':
                          return <TableCell key={key} className="font-medium">{account.accountName}</TableCell>;
                        case 'accountNumber':
                          return (
                            <TableCell key={key}>
                              <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {account.accountNumber}
                              </span>
                            </TableCell>
                          );
                        case 'bankName':
                          return (
                            <TableCell key={key}>
                              <div>
                                <div className="font-medium">{account.bankName}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {account.swiftCode} • {account.country}
                                </div>
                              </div>
                            </TableCell>
                          );
                        case 'swiftCode':
                          return null; // already included above, skip
                        case 'currency':
                          return (
                            <TableCell key={key}>
                              <Badge variant="outline">{account.currency}</Badge>
                            </TableCell>
                          );
                        case 'country':
                          return null; // already shown with swiftCode
                        case 'status':
                          const StatusIcon = getStatusIcon(account.status);
                          return (
                            <TableCell key={key}>
                              <div className="flex items-center gap-2">
                                <StatusIcon className="h-4 w-4" />
                                <Badge className={getStatusColor(account.status)}>
                                  {account.status}
                                </Badge>
                              </div>
                            </TableCell>
                          );
                        case 'isDefault':
                          return (
                            <TableCell key={key}>
                              {account.isDefault && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                  Default
                                </Badge>
                              )}
                            </TableCell>
                          );

                      }
                    })}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!account.isDefault && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
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

export default CompanyAccountManagement;
